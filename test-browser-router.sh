#!/bin/bash
# Quick test script for BrowserRouter URLs

echo "🧪 TESTING BROWSERROUTER (No # in URLs)"
echo "========================================"
echo ""

BASE_URL="http://localhost:4173"

echo "Testing URLs without hash (#):"
echo ""

# Test home
echo "✓ Home page:"
echo "  $BASE_URL/"
echo ""

# Test project detail
echo "✓ Project Detail:"
echo "  $BASE_URL/du-an/noxh-nhs-trung-van-ha-noi"
echo "  $BASE_URL/du-an/noxh-rice-city-to-huu-ha-noi"
echo "  $BASE_URL/du-an/golden-park-que-vo-bac-ninh"
echo ""

# Test province
echo "✓ Province Page:"
echo "  $BASE_URL/tinh/ha-noi"
echo "  $BASE_URL/tinh/bac-ninh"
echo ""

# Test other pages
echo "✓ Other Pages:"
echo "  $BASE_URL/danh-sach-du-an"
echo "  $BASE_URL/dieu-kien-mua"
echo "  $BASE_URL/lien-he"
echo ""

echo "========================================"
echo ""
echo "📝 Test checklist:"
echo "  [ ] Click links từ trang chủ → hiện data ngay"
echo "  [ ] Refresh trang (F5) → vẫn hiện data"
echo "  [ ] Data không biến mất sau vài giây"
echo "  [ ] URLs không có # (hash)"
echo "  [ ] Browser back/forward hoạt động OK"
echo ""

if command -v open &> /dev/null; then
    echo "🌐 Opening browser..."
    open "$BASE_URL/"
elif command -v xdg-open &> /dev/null; then
    echo "🌐 Opening browser..."
    xdg-open "$BASE_URL/"
else
    echo "💡 Manually open: $BASE_URL/"
fi
