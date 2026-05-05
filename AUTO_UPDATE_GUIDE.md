# Hướng Dẫn Tự Động Cập Nhật Data

## 🎯 Cách Hoạt Động

Website sử dụng **smart caching** để vừa nhanh, vừa luôn có data mới:

1. **Lần đầu load:** Hiển thị data từ cache ngay lập tức (< 100ms)
2. **Background:** Fetch data mới từ Google Sheets
3. **Update:** Cache tự động refresh khi có data mới

## ⚙️ Cấu Hình

### File `.env`

```env
# URL Google Apps Script
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/.../exec

# Bật dynamic fetch
VITE_ENABLE_DYNAMIC_FETCH=true

# Thời gian cache (phút) - Mặc định: 5 phút
VITE_CACHE_DURATION=5
```

### Điều chỉnh cache duration:

```env
# Rất nhanh - update mỗi 1 phút (tốn bandwidth)
VITE_CACHE_DURATION=1

# Cân bằng - update mỗi 5 phút (khuyến nghị)
VITE_CACHE_DURATION=5

# Tiết kiệm - update mỗi 30 phút
VITE_CACHE_DURATION=30

# Luôn fetch fresh (chậm)
VITE_CACHE_DURATION=0
```

## 📊 Luồng Dữ Liệu

```
Google Sheets (nguồn)
    ↓
Google Apps Script (API)
    ↓
Browser Cache (localStorage)
    ↓
Website (hiển thị)
```

## 🚀 Quy Trình Cập Nhật

### Khi bạn thêm/sửa data trong Google Sheets:

1. **Người dùng mở website:**
   - Nếu cache còn fresh (< 5 phút): Load từ cache ⚡ instant
   - Nếu cache hết hạn: Fetch mới từ Google Sheets

2. **Background update:**
   - Ngay cả khi hiển thị cache, vẫn fetch mới ở background
   - Data tự động update khi fetch xong
   - Cache refresh cho lần sau

3. **Không cần:**
   - ❌ Không cần run `npm run sync-data`
   - ❌ Không cần build lại
   - ❌ Không cần deploy lại

## ⚡ Hiệu Suất

### So sánh modes:

| Mode | First Load | Subsequent | Data Fresh | Bandwidth |
|------|-----------|------------|------------|-----------|
| **Static** | ⚡ 50ms | ⚡ 50ms | ❌ Cũ | ✅ Zero |
| **Smart Cache** (5min) | ⚡ 80ms | ⚡ 60ms | ✅ Fresh | ⚙️ Medium |
| **Always Fresh** | 🐌 1-3s | 🐌 1-3s | ✅ Fresh | ❌ High |

### Smart Cache (Khuyến nghị):
- ✅ Load nhanh như static
- ✅ Data luôn mới
- ✅ Giảm tải server
- ✅ Offline support

## 🔍 Debug

### Kiểm tra cache:

```javascript
// Mở Console (F12)

// Xem cache hiện tại
JSON.parse(localStorage.getItem('noxh_data_cache'))

// Xem thời gian cache
new Date(parseInt(localStorage.getItem('noxh_data_timestamp')))

// Xóa cache (force refresh)
localStorage.removeItem('noxh_data_cache')
localStorage.removeItem('noxh_data_timestamp')
```

### Log trong Console:

```
⚡ Loading from cache (age: 120s)  // Load từ cache
🔄 Updating cache in background... // Fetch mới
📡 Fetching fresh data...         // Không có cache
✅ Data cached successfully        // Cache đã update
```

## 🛠️ Troubleshooting

### ❌ Data không update

**Nguyên nhân:** Cache còn fresh
**Fix:** Đợi hết cache duration hoặc xóa cache:

```javascript
localStorage.clear()
location.reload()
```

### ❌ Load chậm

**Nguyên nhân:** Cache hết hạn
**Fix:** Tăng cache duration:

```env
# Từ 5 phút lên 15 phút
VITE_CACHE_DURATION=15
```

### ⚠️ Google Sheets không trả về data

**Kiểm tra:**

1. Apps Script có deploy đúng không?
2. Permission có đủ không?
3. Test trực tiếp URL:

```bash
curl "YOUR_GOOGLE_APPS_SCRIPT_URL?action=getProjects"
```

## 🔐 Cache Storage

### Dữ liệu lưu trong localStorage:

- **Key:** `noxh_data_cache`
- **Value:** JSON của projects, provinces, news
- **Timestamp:** `noxh_data_timestamp`
- **Size:** ~50-200KB (tùy số lượng dự án)

### Limits:

- localStorage: 5-10MB (đủ cho hàng ngàn dự án)
- Auto clear khi full
- Private mode: cache không persist

## 📱 Mobile & Offline

### Mobile:
- ✅ Cache hoạt động bình thường
- ✅ Tiết kiệm data 3G/4G
- ✅ Load nhanh hơn

### Offline:
- ✅ Hiển thị data từ cache
- ⚠️ Không update data mới
- ℹ️ Thông báo "Using cached data"

## 🎨 Best Practices

### 1. **Chọn cache duration hợp lý:**

```env
# Nội dung thay đổi thường xuyên
VITE_CACHE_DURATION=1

# Nội dung ổn định
VITE_CACHE_DURATION=30
```

### 2. **Monitor usage:**

```javascript
// Check cache hit rate
// High = good performance
// Low = cache duration too short
```

### 3. **Clear old cache sau khi deploy:**

Thêm version vào cache key:

```javascript
const CACHE_KEY = 'noxh_data_cache_v2'; // Bump version
```

## 📈 Analytics

### Metrics nên theo dõi:

- **Cache Hit Rate:** Tỷ lệ load từ cache
- **API Response Time:** Thời gian fetch từ Google
- **Data Freshness:** Thời gian data được update
- **Error Rate:** Tỷ lệ lỗi khi fetch

## 🚀 Next Steps

### Cải thiện thêm:

1. **Service Worker:** Offline-first strategy
2. **CDN Cache:** Cache ở edge locations
3. **Stale-While-Revalidate:** Hiển thị cache + fetch background
4. **Compression:** Giảm size data transfer

## ✅ Checklist Deploy

```bash
# 1. Check environment
cat .env
# VITE_ENABLE_DYNAMIC_FETCH=true
# VITE_CACHE_DURATION=5

# 2. Test locally
npm run dev

# 3. Build
npm run build

# 4. Test production build
npm run preview

# 5. Deploy
# Upload dist/ folder

# 6. Verify
# Open browser
# Check console logs
# Verify data updates
```

---

**Tóm lại:** Data tự động update từ Google Sheets, không cần build lại! 🎉
