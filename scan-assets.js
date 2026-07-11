import fs from 'fs';
import path from 'path';
import convert from 'heic-convert';

const srcFolder = path.join(process.cwd(), 'Assets');
const targetFolder = path.join(process.cwd(), 'public', 'assets');
const outputFilePath = path.join(process.cwd(), 'src', 'assets-list.json');

const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1' || process.argv.includes('--prod');

function isHeic(filePath) {
    try {
        const ext = path.extname(filePath).toLowerCase();
        if (ext === '.heic') return true;
        
        if (fs.lstatSync(filePath).isDirectory()) return false;
        
        const fd = fs.openSync(filePath, 'r');
        const buffer = Buffer.alloc(16);
        fs.readSync(fd, buffer, 0, 16, 0);
        fs.closeSync(fd);
        const hex = buffer.toString('hex').toLowerCase();
        if (hex.includes('66747970')) { // ftyp
            const brand = buffer.slice(8, 12).toString('ascii').trim();
            if (brand === 'heic') return true;
        }
    } catch {
        // ignore
    }
    return false;
}

// Reusable recursive copy and HEIC conversion function
async function copyFolderAsync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    const elements = fs.readdirSync(from);
    for (const element of elements) {
        const fromPath = path.join(from, element);
        if (fs.lstatSync(fromPath).isDirectory()) {
            const toPath = path.join(to, element);
            await copyFolderAsync(fromPath, toPath);
        } else {
            const ext = path.extname(element).toLowerCase();
            if (['.mp4', '.webm', '.ogg', '.mov'].includes(ext) && isProd) {
                continue;
            }
            if (isHeic(fromPath)) {
                const baseName = path.basename(element, path.extname(element));
                const toPath = path.join(to, baseName + '.jpg');
                console.log(`Converting HEIC: ${element} -> ${baseName}.jpg`);
                try {
                    const inputBuffer = fs.readFileSync(fromPath);
                    const outputBuffer = await convert({
                        buffer: inputBuffer,
                        format: 'JPEG',
                        quality: 0.85
                    });
                    fs.writeFileSync(toPath, outputBuffer);
                } catch (err) {
                    console.error(`Failed to convert HEIC file ${fromPath}:`, err);
                    const rawToPath = path.join(to, element);
                    try {
                        fs.copyFileSync(fromPath, rawToPath);
                    } catch (copyErr) {
                        console.warn(`Warning: Could not copy HEIC fallback file ${element}: ${copyErr.message}`);
                    }
                }
            } else {
                const toPath = path.join(to, element);
                try {
                    fs.copyFileSync(fromPath, toPath);
                } catch (copyErr) {
                    console.warn(`Warning: Could not copy file ${element} (it might be locked by another process): ${copyErr.message}`);
                }
            }
        }
    }
}

try {
    if (!fs.existsSync(srcFolder)) {
        console.warn(`Source Assets directory does not exist: ${srcFolder}. Skipping scan (relying on pre-scanned assets).`);
        process.exit(0);
    }

    console.log(`Cleaning old public/assets...`);
    try {
        fs.rmSync(targetFolder, { recursive: true, force: true });
    } catch (err) {
        console.warn(`Warning: Failed to clean target folder public/assets: ${err.message}. Overwriting files...`);
    }
    fs.mkdirSync(targetFolder, { recursive: true });

    console.log(`Copying and converting Assets directory to public/assets recursively...`);
    await copyFolderAsync(srcFolder, targetFolder);

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

            let isDir = false;
            try {
                isDir = fs.lstatSync(fullPath).isDirectory();
            } catch {
                isDir = false;
            }

            if (isDir) {
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
                } else if (['.mp4', '.webm', '.ogg', '.mov'].includes(ext)) {
                    if (isProd) {
                        return;
                    }
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
