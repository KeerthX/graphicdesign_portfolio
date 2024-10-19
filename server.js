const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const config = require('./config');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Dynamic CSS
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

// API routes
app.get('/api/config', (req, res) => {
    res.json(config);
});

app.get('/api/images', async (req, res) => {
    try {
        const designsPath = path.join(__dirname, 'public', 'designs');
        const files = await fs.readdir(designsPath);
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        const images = imageFiles.map(file => ({
            src: `designs/${file}`,
            alt: file.split('.')[0].replace(/-/g, ' ')
        }));
        res.json(images);
    } catch (error) {
        console.error('Error reading designs directory:', error);
        res.status(500).json({ error: 'Failed to read images directory' });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});