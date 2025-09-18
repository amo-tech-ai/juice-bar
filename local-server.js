const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 9090;

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Helper function to read theme files
function readThemeFile(filePath) {
  try {
    return fs.readFileSync(path.join(__dirname, filePath), 'utf8');
  } catch (err) {
    return null;
  }
}

// Basic Liquid template processing (very simplified)
function processLiquidTemplate(content, data = {}) {
  if (!content) return '';
  
  // Replace simple liquid variables
  let processed = content.replace(/{{\s*([^}]+)\s*}}/g, (match, variable) => {
    const key = variable.trim().replace(/['"]/g, '');
    return data[key] || match;
  });
  
  // Remove liquid tags for preview
  processed = processed.replace(/{%[^%]*%}/g, '');
  
  return processed;
}

// Routes
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🥤 Juice Bar Theme - Local Preview</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0; 
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .header h1 {
            font-size: 2.5rem;
            margin: 0 0 10px 0;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .status-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .status-card {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            transform: translateY(0);
            transition: transform 0.3s ease;
        }
        .status-card:hover {
            transform: translateY(-5px);
        }
        .status-card h3 {
            margin: 0 0 10px 0;
            font-size: 1.2rem;
        }
        .status-card p {
            margin: 0;
            font-size: 1.8rem;
            font-weight: bold;
        }
        .theme-preview {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .preview-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            border-left: 4px solid #667eea;
        }
        .preview-card h4 {
            color: #333;
            margin: 0 0 15px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .file-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .file-list li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            color: #666;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .file-list li:last-child {
            border-bottom: none;
        }
        .next-steps {
            margin-top: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            border-radius: 12px;
            color: #333;
        }
        .next-steps h3 {
            margin: 0 0 20px 0;
            font-size: 1.5rem;
        }
        .action-buttons {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        .btn {
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.3s ease;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .btn-primary {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }
        .btn-success {
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🥤 Juice Bar Shopify Theme</h1>
            <p>Local Development Environment - Ready for Development!</p>
        </div>
        
        <div class="status-cards">
            <div class="status-card">
                <h3>📁 Theme Files</h3>
                <p>${getFileCount()}</p>
            </div>
            <div class="status-card">
                <h3>🏪 Store</h3>
                <p>Connected</p>
            </div>
            <div class="status-card">
                <h3>🚀 Server</h3>
                <p>Running</p>
            </div>
            <div class="status-card">
                <h3>⚡ Status</h3>
                <p>Ready</p>
            </div>
        </div>
        
        <div class="theme-preview">
            ${generateAdvancedFilePreview()}
        </div>
        
        <div class="next-steps">
            <h3>🎯 Development Options</h3>
            <p>Your theme is loaded and ready for development. Choose your preferred workflow:</p>
            <div class="action-buttons">
                <a href="/preview" class="btn btn-primary">🎨 Preview Theme</a>
                <a href="/files" class="btn btn-success">📁 Browse Files</a>
                <a href="https://healthfood-juicebar100.myshopify.com/admin/themes" target="_blank" class="btn btn-primary">🏪 Shopify Admin</a>
            </div>
            <div style="margin-top: 20px; font-size: 14px; color: #666;">
                <strong>Quick Commands:</strong><br>
                • <code>npm run dev</code> - This server<br>
                • <code>npm run shopify:dev</code> - Shopify theme dev (needs store password)<br>
                • <code>npm run shopify:push</code> - Push to development theme
            </div>
        </div>
    </div>
</body>
</html>`);
});

// Preview route - shows actual theme content
app.get('/preview', (req, res) => {
  const themeLayout = readThemeFile('layout/theme.liquid');
  const indexTemplate = readThemeFile('templates/index.json');
  
  let content = '';
  
  if (themeLayout) {
    // Process basic liquid template
    content = processLiquidTemplate(themeLayout, {
      'shop.name': 'Juice Bar Preview',
      'page_title': 'Home - Juice Bar',
      'content_for_header': '<meta name="preview" content="local">',
      'content_for_layout': '<h1>Welcome to Juice Bar!</h1><p>This is a preview of your theme.</p>'
    });
  } else {
    content = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Juice Bar - Theme Preview</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/assets/base.css">
    </head>
    <body>
        <div style="padding: 40px; text-align: center;">
            <h1>🥤 Juice Bar Theme Preview</h1>
            <p>Theme files loaded successfully!</p>
            <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <h3>Available Assets:</h3>
                <ul style="list-style: none; padding: 0;">
                    <li>✅ CSS Files: ${getAssetCount('css')} files</li>
                    <li>✅ JS Files: ${getAssetCount('js')} files</li>
                    <li>✅ Image Files: ${getAssetCount('jpg|jpeg|png|gif|svg|webp')} files</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
    `;
  }
  
  res.send(content);
});

// Files browser
app.get('/files', (req, res) => {
  const fileStructure = getDetailedFileStructure();
  res.json(fileStructure);
});

// Helper functions
function getFileCount() {
  let count = 0;
  const folders = ['assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];
  
  folders.forEach(folder => {
    try {
      const files = fs.readdirSync(path.join(__dirname, folder));
      count += files.length;
    } catch (err) {
      // Folder doesn't exist, skip
    }
  });
  
  return count;
}

function getAssetCount(extension) {
  try {
    const files = fs.readdirSync(path.join(__dirname, 'assets'));
    const regex = new RegExp(`\\.(${extension})$`, 'i');
    return files.filter(file => regex.test(file)).length;
  } catch (err) {
    return 0;
  }
}

function generateAdvancedFilePreview() {
  const folders = [
    { name: 'Assets', folder: 'assets', desc: 'CSS, JS, Images, Fonts', icon: '🎨' },
    { name: 'Templates', folder: 'templates', desc: 'Page templates', icon: '📄' },
    { name: 'Sections', folder: 'sections', desc: 'Theme sections', icon: '🧩' },
    { name: 'Snippets', folder: 'snippets', desc: 'Reusable code', icon: '✂️' },
    { name: 'Layout', folder: 'layout', desc: 'Main layouts', icon: '🏗️' },
    { name: 'Locales', folder: 'locales', desc: 'Translations', icon: '🌐' }
  ];

  return folders.map(({ name, folder, desc, icon }) => {
    try {
      const files = fs.readdirSync(path.join(__dirname, folder));
      const fileList = files.slice(0, 8).map(file => {
        const size = getFileSize(path.join(__dirname, folder, file));
        return `<li><span>${file}</span><span>${size}</span></li>`;
      }).join('');
      const moreCount = files.length > 8 ? `<li><em>... and ${files.length - 8} more files</em></li>` : '';
      
      return `
        <div class="preview-card">
          <h4>${icon} ${name} <span style="color: #999; font-weight: normal;">(${files.length})</span></h4>
          <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">${desc}</p>
          <ul class="file-list">
            ${fileList}
            ${moreCount}
          </ul>
        </div>
      `;
    } catch (err) {
      return `
        <div class="preview-card">
          <h4>${icon} ${name}</h4>
          <p style="color: #999;">${desc} - No files found</p>
        </div>
      `;
    }
  }).join('');
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const bytes = stats.size;
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  } catch (err) {
    return '--';
  }
}

function getDetailedFileStructure() {
  const structure = {};
  const folders = ['assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];
  
  folders.forEach(folder => {
    try {
      const files = fs.readdirSync(path.join(__dirname, folder));
      structure[folder] = files.map(file => ({
        name: file,
        size: getFileSize(path.join(__dirname, folder, file)),
        path: `${folder}/${file}`
      }));
    } catch (err) {
      structure[folder] = [];
    }
  });
  
  return structure;
}

app.listen(PORT, () => {
  console.log(`🚀 Juice Bar Theme Preview Server`);
  console.log(`📱 Local Preview: http://localhost:${PORT}`);
  console.log(`🎨 Theme Preview: http://localhost:${PORT}/preview`);
  console.log(`📁 Files Browser: http://localhost:${PORT}/files`);
  console.log(`📂 Theme Directory: ${__dirname}`);
  console.log(`⚡ Server started successfully!`);
  console.log(`\n🔧 Development Commands:`);
  console.log(`   npm run dev              - Start this local server`);
  console.log(`   npm run shopify:dev      - Start Shopify theme dev`);
  console.log(`   npm run shopify:push     - Push to development theme`);
});
