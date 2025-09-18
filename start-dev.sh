#!/bin/bash

# Complete Shopify Theme Development Setup
echo "==========================================="
echo "🥤 Juice Bar Shopify Development Setup"
echo "==========================================="
echo ""

# Navigate to project directory
cd /home/sk/shopify/juice-bar

# Store credentials
export SHOPIFY_FLAG_STORE="healthfood-juicebar100.myshopify.com"
export SHOPIFY_CLI_THEME_TOKEN="${SHOPIFY_ADMIN_API_TOKEN:-YOUR_ADMIN_TOKEN_HERE}"

echo "📋 Current Setup:"
echo "Store: healthfood-juicebar100.myshopify.com"
echo "Theme files: $(find . -name "*.liquid" | wc -l) Liquid files"
echo "Assets: $(ls assets | wc -l) files"
echo ""

echo "🚀 Starting Development Options:"
echo ""
echo "1️⃣ OPTION 1: Use Shopify Theme Serve (No password needed)"
echo "============================================"
echo "This serves your local theme files without authentication"
echo ""
echo "Running: npx shopify theme serve"
echo ""

# Try theme serve which doesn't require password
npx shopify theme serve --store healthfood-juicebar100.myshopify.com --port 9294 2>&1 | head -n 20 &

sleep 3

echo ""
echo "2️⃣ OPTION 2: Push to Development Theme"
echo "========================================"
echo "Pushing current theme to development..."
echo ""

# Push theme to development
npx shopify theme push --development --store healthfood-juicebar100.myshopify.com --allow-live 2>&1 | head -n 15

echo ""
echo "🌐 Access Your Theme:"
echo "===================="
echo "Local Preview: http://localhost:9294"
echo "Store Admin: https://healthfood-juicebar100.myshopify.com/admin/themes"
echo ""
echo "📝 Development Commands:"
echo "npx shopify theme serve    # Serve locally"
echo "npx shopify theme push     # Push to store"
echo "npx shopify theme pull     # Pull from store"
echo ""
