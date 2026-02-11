const QRCode = require('qrcode');
const { Jimp } = require('jimp');
const path = require('path');

async function generateQRWithLogo() {
    const url = 'https://mivn.online/';
    const logoPath = path.join(__dirname, 'public', 'logo_mivn.png');
    const outputPath = path.join(__dirname, 'public', 'qr_code_mivn.png');

    console.log('Generating QR code...');

    // 1. Generate QR Code to a buffer
    // errorCorrectionLevel: 'H' (High) is required because we are putting a logo in the middle
    const qrBuffer = await QRCode.toBuffer(url, {
        width: 1000,
        margin: 1,
        color: {
            dark: '#0f172a', // Deep blue/slate
            light: '#ffffff'
        },
        errorCorrectionLevel: 'H'
    });

    console.log('Loading images into Jimp...');

    // 2. Load QR and Logo into Jimp
    const qrImage = await Jimp.read(qrBuffer);
    const logoImage = await Jimp.read(logoPath);

    console.log('Resizing logo...');

    // 3. Resize logo (usually 1/5th of the QR code size is safe for 'H' error correction)
    const logoSize = Math.floor(qrImage.width * 0.2);
    logoImage.resize({ w: logoSize, h: logoSize });

    console.log('Compositing...');

    // 4. Calculate center position
    const x = (qrImage.width - logoImage.width) / 2;
    const y = (qrImage.height - logoImage.height) / 2;

    // 5. Create a white background for the logo to improve scannability
    const margin = 10;
    const whiteBox = new Jimp({
        width: logoImage.width + margin * 2,
        height: logoImage.height + margin * 2,
        color: 0xffffffff
    });

    // Composite everything
    qrImage.composite(whiteBox, x - margin, y - margin);
    qrImage.composite(logoImage, x, y);

    console.log('Saving final image...');

    // 6. Save final image
    await qrImage.write(outputPath);

    console.log(`Success! saved to ${outputPath}`);
}

generateQRWithLogo().catch(err => {
    console.error('Error generating QR code:', err);
    process.exit(1);
});
