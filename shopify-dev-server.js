const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 9293;

// Shopify configuration from environment
const STORE_URL = 'healthfood-juicebar100.myshopify.com';
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN || 'YOUR_ADMIN_TOKEN_HERE';

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Parse Liquid-like templates (simplified)
function parseLiquid(content, data = {}) {
  // Simple variable replacement
  return content.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const trimmedKey = key.trim();
    return data[trimmedKey] || '';
  });
}

// Home page route
app.get('/', async (req, res) => {
  try {
    // Read the main layout
    const layoutPath = path.join(__dirname, 'layout', 'theme.liquid');
    const indexPath = path.join(__dirname, 'templates', 'index.json');
    
    let layoutContent = '';
    let indexData = {};
    
    if (fs.existsSync(layoutPath)) {
      layoutContent = fs.readFileSync(layoutPath, 'utf8');
    }
    
    if (fs.existsSync(indexPath)) {
      indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    }
    
    // Fetch products from Shopify Admin API
    let products = [];
    try {
      const response = await axios.get(
        `https://${STORE_URL}/admin/api/2025-01/products.json`,
        {
          headers: {
            'X-Shopify-Access-Token': ADMIN_TOKEN,
            'Content-Type': 'application/json'
          }
        }
      );
      products = response.data.products || [];
    } catch (error) {
      console.log('Could not fetch products:', error.message);
    }
    
    // Create HTML with theme structure
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Health Food Juice Bar</title>
  <link rel="stylesheet" href="/assets/base.css">
  <link rel="stylesheet" href="/assets/section-main-product.css">
  <style>
    body { font-family: system-ui; margin: 0; padding: 0; }
    .header { background: #333; color: white; padding: 1rem; }
    .container { max-width: 1200px; margin: 0 auto; padding: 1rem; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 2rem; margin: 2rem 0; }
    .product-card { border: 1px solid #ddd; padding: 1rem; text-align: center; }
    .product-card img { width: 100%; height: 200px; object-fit: cover; }
    .price { font-size: 1.2em; color: #2a7f62; font-weight: bold; }
    .hero { background: linear-gradient(135deg, #2a7f62, #40bf80); color: white; padding: 4rem 2rem; text-align: center; }
  </style>
</head>
<body>
  <header class="header">
    <div class="container">
      <h1>🥤 Health Food Juice Bar 100</h1>
      <nav>
        <a href="/" style="color: white; margin-right: 1rem;">Home</a>
        <a href="/products" style="color: white; margin-right: 1rem;">Products</a>
        <a href="/cart" style="color: white;">Cart</a>
      </nav>
    </div>
  </header>
  
  <section class="hero">
    <div class="container">
      <h2>Welcome to our store</h2>
      <p>Fresh, healthy juices made with love</p>
    </div>
  </section>
  
  <main class="container">
    <h2>Featured Products (${products.length} total)</h2>
    
    <div class="products-grid">
      ${products.slice(0, 8).map(product => `
        <div class="product-card">
          ${product.image ? `<img src="${product.image.src}" alt="${product.title}">` : '<div style="height: 200px; background: #f0f0f0;"></div>'}
          <h3>${product.title}</h3>
          <p>${product.body_html ? product.body_html.substring(0, 100) + '...' : ''}</p>
          <p class="price">$${product.variants[0]?.price || '0.00'} COP</p>
          <button onclick="alert('Add to cart: ${product.title}')">Add to Cart</button>
        </div>
      `).join('')}
    </div>
    
    ${products.length === 0 ? '<p>No products found. Check Admin API connection.</p>' : ''}
  </main>
  
  <footer style="background: #333; color: white; padding: 2rem; margin-top: 3rem;">
    <div class="container">
      <p>&copy; 2025 Health Food Juice Bar. Development Environment.</p>
    </div>
  </footer>
  
  <script src="/assets/cart.js"></script>
</body>
</html>
    `;
    
    res.send(html);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error loading theme');
  }
});

// Products page
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get(
      `https://${STORE_URL}/admin/api/2025-01/products.json`,
      {
        headers: {
          'X-Shopify-Access-Token': ADMIN_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`
    ✅ Shopify Theme Development Server Running!
    
    🌐 Local: http://localhost:${PORT}
    🏪 Store: ${STORE_URL}
    📁 Theme files loaded from: ${__dirname}
    
    Features:
    - Browse products from your Shopify store
    - View theme structure
    - Test local changes
    
    Press Ctrl+C to stop the server.
  `);
});