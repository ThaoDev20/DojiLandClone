#!/bin/bash
# Debug script to check slug issues in production

echo "🔍 SLUG DEBUGGING SCRIPT"
echo "=========================="
echo ""

# Check if dist exists
if [ ! -d "dist" ]; then
    echo "❌ dist folder not found. Run 'npm run build' first."
    exit 1
fi

echo "✓ Found dist folder"
echo ""

# Check main JS bundle for slug references
echo "📦 Checking slug references in bundle..."
MAIN_JS=$(find dist/assets -name "index-*.js" | head -1)

if [ -n "$MAIN_JS" ]; then
    echo "Found bundle: $(basename $MAIN_JS)"
    echo ""
    
    # Extract slug patterns
    echo "Slug patterns found:"
    grep -o '"slug":"[^"]*"' "$MAIN_JS" | sort -u || echo "No slugs found in bundle"
    echo ""
    
    # Check for duplicate slugs
    DUPLICATES=$(grep -o '"slug":"[^"]*"' "$MAIN_JS" | sort | uniq -d)
    if [ -n "$DUPLICATES" ]; then
        echo "⚠️  DUPLICATE SLUGS DETECTED:"
        echo "$DUPLICATES"
    else
        echo "✓ No duplicate slugs in bundle"
    fi
else
    echo "❌ Could not find main JS bundle"
fi

echo ""
echo "=========================="
echo ""

# Check routes in index.html
echo "📄 Checking index.html..."
if [ -f "dist/index.html" ]; then
    echo "✓ index.html exists"
    
    # Check if base tag exists
    BASE_TAG=$(grep -i "<base" dist/index.html)
    if [ -n "$BASE_TAG" ]; then
        echo "Base tag: $BASE_TAG"
    else
        echo "ℹ️  No base tag (OK for HashRouter)"
    fi
else
    echo "❌ index.html not found in dist"
fi

echo ""
echo "=========================="
echo ""

# Test local preview
echo "🧪 Testing local preview..."
echo "Run: npm run preview"
echo "Then visit: http://localhost:4173"
echo ""
echo "Test these URLs:"
echo "  - http://localhost:4173/#/"
echo "  - http://localhost:4173/#/du-an/noxh-nhs-trung-van-ha-noi"
echo "  - http://localhost:4173/#/tinh/ha-noi"
echo ""

echo "=========================="
echo ""
echo "💡 If slugs still don't work on production:"
echo "1. Check browser console for errors"
echo "2. Check server nginx logs"
echo "3. Verify HashRouter is working (URL should have #)"
echo "4. Clear browser cache and try again"
echo "5. Check if Google Sheets data has duplicate slugs"
