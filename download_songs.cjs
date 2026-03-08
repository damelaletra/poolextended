const https = require('https');
const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, 'public', 'audio');

// Crear la carpeta si no existe
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

const urls = [];
for (let i = 1; i <= 10; i++) {
    urls.push(`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${i}.mp3`);
}

console.log('Descargando 10 canciones de prueba...');

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function downloadAll() {
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const dest = path.join(audioDir, `cancion_prueba_${i + 1}.mp3`);
        try {
            console.log(`[${i + 1}/10] Descargando ${url}...`);
            await downloadFile(url, dest);
            console.log(`  -> Guardado en ${dest}`);
        } catch (error) {
            console.error(`  -> Error descargando ${url}:`, error.message);
        }
    }
    console.log('¡Descarga completada!');
}

downloadAll();
