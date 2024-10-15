const express = require('express');
const fs = require('fs').promises;
const path = require('path');

let config = require('./config');
let configVersion = Date.now();

const app = express();

app.use(express.static('public'));

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
            alt: ''
        }));

        res.json(images);
    } catch (error) {
        console.error('Error reading designs directory:', error);
        res.status(500).json({ error: 'Failed to read images directory' });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

// For Vercel
module.exports = app;