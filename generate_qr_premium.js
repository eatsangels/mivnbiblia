const QRCode = require('qrcode');
const { Jimp } = require('jimp');
const path = require('path');

async function generatePremiumQR() {
    const url = 'https://mivn.online/';
    const logoPath = path.join(__dirname, 'public', 'logo_mivn.png');
    const outputPath = path.join(__dirname, 'public', 'qr_code_mivn_premium.png');

    console.log('--- MIVN Premium QR Generator ---');

    // 1. Generate QR Data (as bit matrix)
    const qrData = QRCode.create(url, { errorCorrectionLevel: 'H' });
    const { modules } = qrData;
    const moduleCount = modules.size;
    const margin = 2;
    const canvasSize = 1000;
    const moduleSize = Math.floor(canvasSize / (moduleCount + margin * 2));
    const actualCanvasSize = moduleSize * (moduleCount + margin * 2);

    console.log(`Generating matrix: ${moduleCount}x${moduleCount} modules...`);

    // 2. Create high-res canvas
    const image = new Jimp({ width: actualCanvasSize, height: actualCanvasSize, color: 0xffffffff });

    // Colors
    const colorDark = { r: 15, g: 23, b: 42 }; // #0f172a (Deep Blue)
    const colorAccent = { r: 30, g: 58, b: 138 }; // #1e3a8a (Primary Blue)

    // 3. Draw modules with rounded aesthetics
    for (let y = 0; y < moduleCount; y++) {
        for (let x = 0; x < moduleCount; x++) {
            if (modules.get(x, y)) {
                const posX = (x + margin) * moduleSize;
                const posY = (y + margin) * moduleSize;

                // Simple gradient logic
                const t = (x + y) / (moduleCount * 2);
                const r = Math.floor(colorDark.r + (colorAccent.r - colorDark.r) * t);
                const g = Math.floor(colorDark.g + (colorAccent.g - colorDark.g) * t);
                const b = Math.floor(colorDark.b + (colorAccent.b - colorDark.b) * t);
                const colorHex = (r << 24) | (g << 16) | (b << 8) | 0xff;

                // Draw a rounded module (circle-like)
                // We draw a smaller circle within the module space to give it a modern dot-grid look
                const circleRadius = moduleSize * 0.45;
                const centerX = posX + moduleSize / 2;
                const centerY = posY + moduleSize / 2;

                for (let dy = 0; dy < moduleSize; dy++) {
                    for (let dx = 0; dx < moduleSize; dx++) {
                        const dist = Math.sqrt(Math.pow(dx - moduleSize / 2, 2) + Math.pow(dy - moduleSize / 2, 2));
                        if (dist <= circleRadius) {
                            image.setPixelColor(colorHex, posX + dx, posY + dy);
                        }
                    }
                }
            }
        }
    }

    console.log('Integrating logo...');

    // 4. Load and prepare logo
    const logo = await Jimp.read(logoPath);
    const logoSize = Math.floor(actualCanvasSize * 0.22);
    logo.resize({ w: logoSize, h: logoSize });

    // 5. Create circular mask for logo
    const mask = new Jimp({ width: logoSize, height: logoSize, color: 0x00000000 });
    const radius = logoSize / 2;
    for (let y = 0; y < logoSize; y++) {
        for (let x = 0; x < logoSize; x++) {
            const dist = Math.sqrt(Math.pow(x - radius, 2) + Math.pow(y - radius, 2));
            if (dist <= radius) {
                mask.setPixelColor(0xffffffff, x, y);
            }
        }
    }
    // Note: In newer Jimp, mask might work differently, let's just do a manual crop/circle
    // Actually, let's just draw a white circle behind it first.

    const centerX = actualCanvasSize / 2;
    const centerY = actualCanvasSize / 2;

    // Draw white circle background for logo (higher contrast)
    const bgRadius = radius + 15;
    for (let y = -bgRadius; y <= bgRadius; y++) {
        for (let x = -bgRadius; x <= bgRadius; x++) {
            const dist = Math.sqrt(x * x + y * y);
            if (dist <= bgRadius) {
                image.setPixelColor(0xffffffff, centerX + x, centerY + y);
            }
        }
    }

    // Place logo
    image.composite(logo, centerX - radius, centerY - radius);

    console.log('Applying final touches...');
    await image.write(outputPath);

    console.log(`Success! Premium QR saved to ${outputPath}`);
}

generatePremiumQR().catch(err => {
    console.error('Failed to generate premium QR:', err);
    process.exit(1);
});
