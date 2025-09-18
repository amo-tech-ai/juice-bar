#!/bin/bash

# Shopify Theme Development Setup Script
# This script sets up proper authentication for theme development

echo "======================================"
echo "Shopify Theme Development Setup"
echo "======================================"
echo ""

# Store information
STORE_URL="healthfood-juicebar100.myshopify.com"
# Load admin token from environment
ADMIN_TOKEN="${SHOPIFY_ADMIN_API_TOKEN:-YOUR_ADMIN_TOKEN_HERE}"

echo "Store: $STORE_URL"
echo ""
echo "To run theme dev, you need a Theme Access app password."
echo ""
echo "OPTION 1: Create Theme Access App (Recommended)"
echo "================================================="
echo "1. Go to: https://$STORE_URL/admin/apps"
echo "2. Click 'Apps and sales channels'"
echo "3. Click 'Develop apps' at the top"
echo "4. Click 'Create app'"
echo "5. Name it: 'Theme Development Access'"
echo "6. Go to 'Configuration' → 'Admin API integration'"
echo "7. Enable these scopes:"
echo "   - Read and write themes"
echo "   - Read products"
echo "   - Read content"
echo "8. Click 'Save'"
echo "9. Go to 'API credentials' tab"
echo "10. Under 'Theme Access', click 'Install app'"
echo "11. Copy the Theme Access password"
echo ""
echo "OPTION 2: Use Admin API to Create Development Theme"
echo "===================================================="
echo "We can create a development theme using the Admin API:"
echo ""

# Create development theme using Admin API
echo "Creating development theme via Admin API..."
curl -X POST "https://$STORE_URL/admin/api/2025-01/themes.json" \
  -H "X-Shopify-Access-Token: $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "theme": {
      "name": "Development Theme - Juice Bar",
      "role": "unpublished"
    }
  }' 2>/dev/null | python3 -m json.tool

echo ""
echo "OPTION 3: Pull Existing Theme and Run Locally"
echo "==============================================="
echo "Pull the live theme and serve it locally:"
echo ""
echo "npx shopify theme pull --live"
echo "npx shopify theme serve"
echo ""
echo "======================================"
