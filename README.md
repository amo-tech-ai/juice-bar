# 🥤 Juice Bar - Shopify Theme

## 📋 Overview
This repository contains the Shopify theme for **healthfood-juicebar100.myshopify.com**. The theme is automatically synchronized between Shopify and GitHub for version control and collaborative development.

## 🌐 Store Links
- **Live Store**: [https://healthfood-juicebar100.myshopify.com](https://healthfood-juicebar100.myshopify.com)
- **Theme Preview**: [Preview Link](https://healthfood-juicebar100.myshopify.com/?preview_theme_id=149629829317)
- **Theme Editor**: [Admin Editor](https://healthfood-juicebar100.myshopify.com/admin/themes/149629829317/editor)
- **GitHub Repository**: [https://github.com/amo-tech-ai/juice-bar](https://github.com/amo-tech-ai/juice-bar)

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ and npm
- Shopify CLI (`npm install -g @shopify/cli`)
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/amo-tech-ai/juice-bar.git
cd juice-bar

# Install dependencies
npm install

# Start development server
shopify theme dev --store healthfood-juicebar100
```

## 📁 Theme Structure
```
juice-bar/
├── assets/          # CSS, JS, images, and other static files
├── config/          # Theme settings configuration
├── layout/          # Theme layouts (theme.liquid, password.liquid)
├── locales/         # Translation files for multiple languages
├── sections/        # Reusable sections for the theme
├── snippets/        # Reusable code snippets
├── templates/       # Page templates
└── preview.html     # Theme preview file
```

## 🛠️ Development Commands

```bash
# Pull latest theme from Shopify
shopify theme pull --live --store healthfood-juicebar100

# Push changes to Shopify (development theme)
shopify theme push --development --store healthfood-juicebar100

# Push to live theme (be careful!)
shopify theme push --live --store healthfood-juicebar100

# Start local development server
shopify theme dev --store healthfood-juicebar100

# Check theme for errors
shopify theme check

# List all themes
shopify theme list --store healthfood-juicebar100
```

## 📤 Git Workflow

```bash
# Create a new feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push to GitHub
git push origin feature/new-feature

# Create a pull request on GitHub
```

## 🔄 Synchronization

### Manual Sync from Shopify to GitHub
```bash
# Pull theme from Shopify
shopify theme pull --live --store healthfood-juicebar100

# Commit and push to GitHub
git add .
git commit -m "sync: update theme from Shopify"
git push origin main
```

### Manual Deploy from GitHub to Shopify
```bash
# Pull latest from GitHub
git pull origin main

# Push to Shopify
shopify theme push --live --store healthfood-juicebar100
```

## 🏪 Store Information
- **Store Name**: Health Food Juice Bar 100
- **Store URL**: healthfood-juicebar100.myshopify.com
- **Theme**: Taste (ID: 149629829317)
- **Theme Version**: Dawn-based custom theme

## 🔑 Environment Variables

Create a `.env` file in the project root (never commit this file):

```bash
# Store domain
SHOPIFY_STORE_DOMAIN=healthfood-juicebar100.myshopify.com

# Add your API tokens here (get from Shopify Admin)
SHOPIFY_ADMIN_API_TOKEN=your_token_here
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
```

⚠️ **Important**: 
- Never commit API tokens to the repository
- Use environment variables or `.env` files (which are gitignored)
- Store credentials securely in a password manager
- Rotate tokens regularly for security

## 📝 Theme Components

### Key Sections
- **Header**: Navigation and branding
- **Footer**: Store information and links
- **Product Grid**: Collection display
- **Cart**: Shopping cart functionality
- **Slideshow**: Homepage hero slider

### Main Templates
- `index.json` - Homepage
- `product.json` - Product pages
- `collection.json` - Collection pages
- `cart.json` - Cart page
- `page.json` - Standard pages
- `blog.json` - Blog listing
- `article.json` - Blog posts

## 🎨 Customization

### Through Shopify Admin
1. Go to **Online Store → Themes**
2. Click **Customize** on the Taste theme
3. Use the theme editor to modify sections and settings
4. Changes are saved automatically to Shopify

### Through Code
1. Edit files locally
2. Test with `shopify theme dev`
3. Push changes with `shopify theme push`
4. Commit to GitHub for version control

## 🐛 Troubleshooting

### Common Issues

**Authentication Failed**
```bash
shopify auth logout
shopify auth login --store healthfood-juicebar100
```

**Theme Not Syncing**
```bash
# Force pull from Shopify
shopify theme pull --live --force

# Force push to Shopify
shopify theme push --live --force
```

**Port Already in Use**
```bash
# Use a different port
shopify theme dev --port 9293
```

## 📊 Performance Tips

1. **Optimize Images**: Use Shopify's image transformation API
2. **Minify Assets**: CSS and JS are automatically minified
3. **Lazy Loading**: Implement for below-fold content
4. **Caching**: Leverage Shopify's CDN

## 🔒 Security Best Practices

1. Never commit API keys or passwords
2. Use environment variables for sensitive data
3. Regularly rotate API tokens
4. Keep dependencies updated
5. Use branch protection for the main branch

## 📞 Support & Resources

- **Shopify Partner Dashboard**: [partners.shopify.com](https://partners.shopify.com)
- **Theme Documentation**: [shopify.dev/themes](https://shopify.dev/themes)
- **Liquid Reference**: [shopify.dev/docs/themes/liquid](https://shopify.dev/docs/themes/liquid)
- **Dawn Theme Docs**: [github.com/Shopify/dawn](https://github.com/Shopify/dawn)

## 👥 Team

- Repository: [github.com/amo-tech-ai/juice-bar](https://github.com/amo-tech-ai/juice-bar)
- Organization: AMO Tech AI

---

**Last Updated**: December 2024
**Theme Version**: Taste (based on Dawn)
**Shopify CLI Version**: 3.84.1