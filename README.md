# Graphic Design Portfolio Template

A free, customizable graphic design portfolio template to showcase your creative work.

## Features

- Easy to set up and customize
- Responsive design
- Express.js backend
- Configurable through `config.js`
- Drag-and-drop design uploads

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Git (optional, for cloning)

### Installation

1. Clone the repository or download the ZIP file:
   ```
   git clone https://github.com/KeerthX/graphicdesign_portfolio.git
   ```

2. Navigate to the project directory:
   ```
   cd graphicdesign_portfolio
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Configuration

1. Open `config.js` in your preferred text editor.
2. Modify the settings to personalize your portfolio:
   - Update personal information (name, job title, bio, etc.)
   - Customize color scheme
   - Add social media links
   - Set up CTA button

Alternatively, you can use the [Graphic Design Config Builder](https://graphicdesignconfigbuilder.vercel.app/) to generate your `config.js` file without coding.

### Adding Your Designs

1. Navigate to the `public/designs` folder.
2. Drag and drop your design files into this folder.

### Running the Server

Start the server using one of the following commands:

```
npm start
```
or
```
node server.js
```

**Note:** The server doesn't support real-time rendering. You may need to restart the server to view updated content.

## Deployment

You can deploy this portfolio template using Vercel. For detailed deployment instructions, please refer to the Vercel documentation.

## File Structure

```
public/
├── designs/
├── index.html
├── script.js
├── style.css
└── yourphoto.png
config.js
package.json
README.md
server.js
vercel.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Express.js for the backend server
- Vercel for easy deployment

For more information and a video tutorial, please visit [video link].
