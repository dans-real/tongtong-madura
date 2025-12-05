const sharp = require('sharp');
const fs = require('fs');

// Read the SVG
const svgBuffer = fs.readFileSync('./public/logo-tt.svg');

// Create multiple sizes for the ICO file
async function createFavicon() {
    try {
        // Generate PNG at 192x192
        await sharp(svgBuffer)
            .resize(192, 192)
            .png()
            .toFile('./public/favicon-192.png');

        console.log('✅ Created favicon-192.png');

        // Generate smaller sizes for ICO
        await sharp(svgBuffer)
            .resize(48, 48)
            .png()
            .toFile('./public/favicon-48.png');

        console.log('✅ Created favicon-48.png');

        // Generate 32x32 for ICO
        await sharp(svgBuffer)
            .resize(32, 32)
            .png()
            .toFile('./public/favicon-32.png');

        console.log('✅ Created favicon-32.png');

        // Generate 16x16 for ICO  
        await sharp(svgBuffer)
            .resize(16, 16)
            .png()
            .toFile('./public/favicon-16.png');

        console.log('✅ Created favicon-16.png');

        console.log('\n📝 Langkah selanjutnya:');
        console.log('1. Buka https://cloudconvert.com/png-to-ico');
        console.log('2. Upload public/favicon-192.png');
        console.log('3. Convert dan download sebagai favicon.ico');
        console.log('4. Letakkan di src/app/favicon.ico');
        console.log('\nAtau langsung copy favicon-192.png ke public/ untuk dipakai sebagai logo.');

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

createFavicon();
