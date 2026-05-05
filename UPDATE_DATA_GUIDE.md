# Hướng Dẫn Cập Nhật Dữ Liệu

## 📚 Tổng Quan

Website sử dụng **static data** (dữ liệu tĩnh) từ file `src/data/mockData.js` để tải nhanh.

Data được đồng bộ từ Google Sheets **thủ công** khi cần, không tự động fetch mỗi lần load trang.

---

## 🔄 Cách Cập Nhật Dữ Liệu

### Bước 1: Chỉnh sửa Google Sheets
1. Mở Google Sheets của bạn
2. Cập nhật dữ liệu (thêm/sửa/xóa projects, provinces, news)
3. Lưu thay đổi

### Bước 2: Đồng bộ dữ liệu
```bash
# Chạy script đồng bộ
npm run sync-data
```

Script sẽ:
- ✅ Fetch data từ Google Sheets
- ✅ Backup file cũ (`mockData.backup.js`)
- ✅ Tạo file mới `mockData.js`
- ✅ Format code đẹp

### Bước 3: Kiểm tra thay đổi
```bash
# Xem file đã thay đổi
git diff src/data/mockData.js

# Hoặc mở file
code src/data/mockData.js
```

### Bước 4: Build & Deploy
```bash
# Build production
npm run build

# Test local
npm run preview

# Deploy (tùy theo hệ thống)
# - Upload dist folder
# - Docker build & push
# - Git push to hosting
```

---

## ⚙️ Cấu Hình

### File `.env`

**Chế độ hiện tại (khuyến nghị):**
```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/.../exec
VITE_ENABLE_DYNAMIC_FETCH=false  # Static data (FAST)
```

**Chế độ dynamic (chậm, không khuyến nghị):**
```env
VITE_ENABLE_DYNAMIC_FETCH=true  # Fetch mỗi lần load (SLOW)
```

---

## 📊 So Sánh Modes

| Feature | Static Mode (Default) | Dynamic Mode |
|---------|----------------------|--------------|
| **Load Speed** | ⚡ Instant (<100ms) | 🐌 Slow (1-3s) |
| **Server Load** | ✅ Zero | ❌ High |
| **Data Fresh** | Manual update | Auto update |
| **Offline** | ✅ Works | ❌ Fails |
| **Best for** | Production | Development/Testing |

---

## 🛠️ Troubleshooting

### ❌ Error: "VITE_GOOGLE_APPS_SCRIPT_URL not found"
**Fix:** Thêm URL vào file `.env`
```bash
cp .env.example .env
# Edit .env và thêm URL
```

### ❌ Error: "No data fetched"
**Kiểm tra:**
1. Google Apps Script có deploy đúng không?
2. URL có đúng không?
3. Script có permission?

**Test URL:**
```bash
curl "YOUR_GOOGLE_APPS_SCRIPT_URL?action=getProjects"
```

### ⚠️ Data không update
**Nguyên nhân:** Browser cache
**Fix:**
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)

# Hoặc xóa cache
# Chrome: Settings > Clear browsing data
```

---

## 📁 File Structure

```
src/data/
├── mockData.js          # Current data (auto-generated)
└── mockData.backup.js   # Backup (before sync)

scripts/
└── sync-from-sheets.js  # Sync script

.env                     # Environment config
```

---

## 🔐 Security

### API Key Safety
```env
# ❌ DON'T: Commit .env to git
.env

# ✅ DO: Use .env.example as template
.env.example
```

### Read-Only Access
- Google Apps Script chỉ READ
- Không có write permission
- Public data only

---

## ⏰ Update Schedule (Khuyến nghị)

### Tần suất cập nhật:
- **Daily:** Nếu có dự án mới thường xuyên
- **Weekly:** Cho data ổn định
- **On-demand:** Khi có thay đổi quan trọng

### Automation (Optional):
```bash
# Cron job (Linux/Mac)
# Chạy sync-data mỗi ngày 2 AM
0 2 * * * cd /path/to/project && npm run sync-data && npm run build && ./deploy.sh

# GitHub Actions (auto deploy)
# .github/workflows/sync-data.yml
```

---

## 📝 Best Practices

### 1. **Always backup before sync**
Script tự động backup, nhưng nên:
```bash
git commit -am "Before data sync"
npm run sync-data
git diff  # Review changes
```

### 2. **Test locally before deploy**
```bash
npm run sync-data
npm run build
npm run preview
# Test các pages
# Check console errors
```

### 3. **Monitor file size**
```bash
# Check mockData.js size
ls -lh src/data/mockData.js

# Should be < 100KB
# If > 500KB, consider optimization
```

### 4. **Version control**
```bash
# Commit data changes separately
git add src/data/mockData.js
git commit -m "chore: update data from Google Sheets"

git add [other files]
git commit -m "feat: add new feature"
```

---

## 🚀 Quick Reference

```bash
# Update data from Google Sheets
npm run sync-data

# Build production
npm run build

# Test local
npm run preview

# Check data file
cat src/data/mockData.js | head -50
```

---

## 💡 Tips

1. **Schedule regular syncs** để data luôn fresh
2. **Monitor Google Sheets** để biết khi nào cần update
3. **Use version control** để track data changes
4. **Test thoroughly** sau mỗi lần sync
5. **Keep backup** của mockData.js quan trọng

---

*Last updated: After performance optimization*
