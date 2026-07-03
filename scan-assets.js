import fs from 'fs';
import path from 'path';

const srcFolder = path.join(process.cwd(), 'Assets');
const targetFolder = path.join(process.cwd(), 'public', 'assets');
const outputFilePath = path.join(process.cwd(), 'src', 'assets-list.json');

// Reusable recursive copy function
function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach(element => {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        if (fs.lstatSync(fromPath).isDirectory()) {
            copyFolderSync(fromPath, toPath);
        } else {
            fs.copyFileSync(fromPath, toPath);
        }
    });
}

try {
    if (!fs.existsSync(srcFolder)) {
        console.warn(`Source Assets directory does not exist: ${srcFolder}. Skipping scan (relying on pre-scanned assets).`);
        process.exit(0);
    }

    console.log(`Cleaning old public/assets...`);
    fs.rmSync(targetFolder, { recursive: true, force: true });
    fs.mkdirSync(targetFolder, { recursive: true });

    console.log(`Copying Assets directory to public/assets recursively...`);
    copyFolderSync(srcFolder, targetFolder);

    const images = [];
    const videos = [];
    let logo = '';
    let logoSymbol = '';

    function scanFolderRecursive(dir, relativeDir = '') {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const relPath = relativeDir ? path.join(relativeDir, file) : file;
            const ext = path.extname(file).toLowerCase();

            if (fs.lstatSync(fullPath).isDirectory()) {
                scanFolderRecursive(fullPath, relPath);
            } else {
                // Construct standard web path for react consumption
                const cleanRelPath = relPath.replace(/\\/g, '/');
                const webPath = `/assets/${cleanRelPath}`;

                if (file.toLowerCase().includes('logo') && ['.png', '.jpg', '.jpeg', '.svg', '.webp'].includes(ext)) {
                    if (file.toLowerCase().includes('symbol')) {
                        logoSymbol = webPath;
                    } else {
                        // Prefer PNG/transparent logo over other files
                        if (!logo || ext === '.png') {
                            logo = webPath;
                        }
                    }
                } else if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext)) {
                    const category = relativeDir || 'Canvas painting';
                    images.push({
                        src: webPath,
                        category,
                        name: file
                    });
                } else if (['.mp4', '.webm', '.ogg'].includes(ext)) {
                    const category = relativeDir || 'General Reel';
                    videos.push({
                        src: webPath,
                        category,
                        name: file
                    });
                }
            }
        });
    }

    console.log(`Scanning public/assets dynamically...`);
    scanFolderRecursive(targetFolder);

    // Sort outputs for compile stability
    images.sort((a, b) => a.src.localeCompare(b.src));
    videos.sort((a, b) => a.src.localeCompare(b.src));

    const registry = {
        logo: logo || (images.length > 0 ? images[0].src : ''),
        logoSymbol: logoSymbol || logo || '',
        images,
        videos
    };

    // Ensure src directory exists
    const srcDir = path.dirname(outputFilePath);
    if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir, { recursive: true });
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(registry, null, 2));
    console.log(`Successfully scanned and registry written to ${outputFilePath}`);
    console.log(`Totals: ${images.length} images, ${videos.length} videos.`);
} catch (error) {
    console.error('Error in asset scanning pipeline:', error);
    process.exit(1);
}
