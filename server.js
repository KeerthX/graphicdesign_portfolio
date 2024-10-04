const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('.')); // Serve static files from current directory

app.get('/api/images', async (req, res) => {
    try {
        const designsPath = path.join(__dirname, 'designs');
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});