const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const chokidar = require('chokidar');

let config = require('./config');
let configVersion = Date.now();

const app = express();
const startPort = 3000;
const maxPort = 3010;

app.use(express.static('public'));

// Watch for changes in the config file
chokidar.watch('./config.js').on('change', (path) => {
    console.log('Config file changed. Reloading...');
    delete require.cache[require.resolve('./config')];
    config = require('./config');
    configVersion = Date.now();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/config', (req, res) => {
    res.json(config);
});

app.get('/api/config-version', (req, res) => {
    res.json({ version: configVersion });
});

app.get('/dynamic-styles.css', (req, res) => {
    const css = `
        :root {
            --color-background: ${config.colorScheme.background};
            --color-surface: ${config.colorScheme.surface};
            --color-primary: ${config.colorScheme.primary};
            --color-text: ${config.colorScheme.text};
            --color-text-secondary: ${config.colorScheme.textSecondary};
        }
    `;
    res.type('text/css').send(css);
});

app.get('/api/images', async (req, res) => {
    try {
        const designsPath = path.join(__dirname, 'public', 'designs');
        const files = await fs.readdir(designsPath);

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        const images = imageFiles.map(file => ({
            src: `designs/${file}`,
            alt: '' // Keep alt empty as per requirement to not display names
        }));

        res.json(images);
    } catch (error) {
        console.error('Error reading designs directory:', error);
        res.status(500).json({ error: 'Failed to read images directory' });
    }
});

function startServer(port) {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying next port...`);
            if (port < maxPort) {
                startServer(port + 1);
            } else {
                console.error('No available ports found. Please close other applications and try again.');
            }
        } else {
            console.error('Server error:', err);
        }
    });
}

startServer(startPort);