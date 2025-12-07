const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');

async function createFaviconIco() {
    try {
        console.log('🎨 Generating favicon from logo-tt.svg...\n');

        // Read SVG
        const svgBuffer = fs.readFileSync('./public/logo-tt.svg');

        // Create multiple sizes
        const sizes = [16, 32, 48];
        const pngBuffers = [];

        for (const size of sizes) {
            const buffer = await sharp(svgBuffer)
                .resize(size, size)
                .png()
                .toBuffer();
            pngBuffers.push(buffer);
            console.log(`✅ Generated ${size}x${size} PNG`);
        }

        // Create ICO file
        console.log('\n🔨 Creating favicon.ico...');
        const icoBuffer = await toIco(pngBuffers);
        fs.writeFileSync('./src/app/favicon.ico', icoBuffer);

        console.log('✅ Created src/app/favicon.ico');

        // Also create a 192x192 PNG for web app manifest
        await sharp(svgBuffer)
            .resize(192, 192)
            .png()
            .toFile('./public/icon-192.png');

        console.log('✅ Created public/icon-192.png');

        // Create 512x512 for PWA
        await sharp(svgBuffer)
            .resize(512, 512)
            .png()
            .toFile('./public/icon-512.png');

        console.log('✅ Created public/icon-512.png');

        console.log('\n🎉 Favicon berhasil dibuat!');
        console.log('📦 File yang dibuat:');
        console.log('   - src/app/favicon.ico (untuk browser)');
        console.log('   - public/icon-192.png (untuk manifest)');
        console.log('   - public/icon-512.png (untuk PWA)');

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

createFaviconIco();
