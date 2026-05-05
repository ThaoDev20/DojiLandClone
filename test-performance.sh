#!/bin/bash
# Performance Testing Script
# Test các metrics performance sau khi optimize

echo "🔍 PERFORMANCE TESTING SCRIPT"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if URL is provided
URL=${1:-"http://localhost:4173"}

echo "Testing URL: $URL"
echo ""

# 1. Test Gzip Compression
echo -e "${YELLOW}1. Testing Gzip Compression...${NC}"
GZIP_RESULT=$(curl -s -I -H "Accept-Encoding: gzip" "$URL" | grep -i "content-encoding: gzip")
if [ -n "$GZIP_RESULT" ]; then
    echo -e "${GREEN}✓ Gzip enabled${NC}"
else
    echo -e "${RED}✗ Gzip not enabled${NC}"
fi
echo ""

# 2. Test Brotli Compression
echo -e "${YELLOW}2. Testing Brotli Compression...${NC}"
BROTLI_RESULT=$(curl -s -I -H "Accept-Encoding: br" "$URL" | grep -i "content-encoding: br")
if [ -n "$BROTLI_RESULT" ]; then
    echo -e "${GREEN}✓ Brotli enabled${NC}"
else
    echo -e "${RED}✗ Brotli not enabled (normal if not using nginx-brotli)${NC}"
fi
echo ""

# 3. Test Cache Headers
echo -e "${YELLOW}3. Testing Cache Headers...${NC}"

# Test HTML (should be no-cache)
HTML_CACHE=$(curl -s -I "$URL" | grep -i "cache-control")
echo "HTML: $HTML_CACHE"

# Test JS file (should have long cache)
JS_URL=$(curl -s "$URL" | grep -oP '(?<=src=")[^"]*\.js' | head -1)
if [ -n "$JS_URL" ]; then
    if [[ ! "$JS_URL" =~ ^http ]]; then
        JS_URL="$URL/$JS_URL"
    fi
    JS_CACHE=$(curl -s -I "$JS_URL" | grep -i "cache-control")
    echo "JavaScript: $JS_CACHE"
fi
echo ""

# 4. Test Security Headers
echo -e "${YELLOW}4. Testing Security Headers...${NC}"
HEADERS=$(curl -s -I "$URL")

echo "$HEADERS" | grep -i "x-frame-options" && echo -e "${GREEN}✓ X-Frame-Options set${NC}" || echo -e "${RED}✗ X-Frame-Options missing${NC}"
echo "$HEADERS" | grep -i "x-content-type-options" && echo -e "${GREEN}✓ X-Content-Type-Options set${NC}" || echo -e "${RED}✗ X-Content-Type-Options missing${NC}"
echo "$HEADERS" | grep -i "x-xss-protection" && echo -e "${GREEN}✓ X-XSS-Protection set${NC}" || echo -e "${RED}✗ X-XSS-Protection missing${NC}"
echo ""

# 5. Test File Sizes
echo -e "${YELLOW}5. File Sizes (before compression)...${NC}"
if [ -d "dist" ]; then
    echo "JavaScript bundles:"
    find dist -name "*.js" -type f -exec du -h {} \; | sort -rh | head -5
    echo ""
    echo "CSS files:"
    find dist -name "*.css" -type f -exec du -h {} \;
    echo ""
    echo "Total dist size:"
    du -sh dist
else
    echo "dist folder not found. Run 'npm run build' first."
fi
echo ""

# 6. Lighthouse Check (if lighthouse is installed)
echo -e "${YELLOW}6. Lighthouse Score (optional)...${NC}"
if command -v lighthouse &> /dev/null; then
    echo "Running Lighthouse... (this may take a minute)"
    lighthouse "$URL" --only-categories=performance --chrome-flags="--headless" --output=json --quiet | jq '.categories.performance.score * 100'
else
    echo "Lighthouse CLI not installed. Install with: npm install -g lighthouse"
fi
echo ""

echo "================================"
echo -e "${GREEN}✓ Performance testing complete!${NC}"
echo ""
echo "Recommendations:"
echo "- All assets should use compression (Gzip/Brotli)"
echo "- HTML: no-cache"
echo "- JS/CSS: immutable, 1 year cache"
echo "- Images: 1 year cache"
echo "- All security headers should be present"
