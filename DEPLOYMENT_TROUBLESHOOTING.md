# Deployment Troubleshooting Guide

## Lỗi: Slug chồng nhau / Không load được trang dự án

### Nguyên nhân có thể:

1. **HashRouter URL encoding issues**
   - Hash URLs có thể bị encode khác nhau trên các servers
   - Solution: Normalize slugs trong code

2. **Duplicate slugs từ Google Sheets**
   - Data từ GAS có thể có slugs trùng nhau
   - Solution: Deduplication logic đã được thêm

3. **Nginx caching issues**
   - Old version của site bị cache
   - Solution: Clear cache và hard refresh

4. **Base path issues**
   - Server config không match với app routing
   - Solution: Đảm bảo HashRouter hoạt động đúng

---

## ✅ Fixes đã áp dụng:

### 1. Slug Normalization
```javascript
// Tất cả slugs được normalize: lowercase + trim
const normalizedSlug = slug?.toLowerCase().trim();
```

### 2. Duplicate Detection
```javascript
// Auto remove duplicate slugs từ API
deduplicateBySlug(projects)
```

### 3. Better Error Messages
```javascript
// Show actual slug trong error page để debug
<p>Slug: {slug}</p>
```

### 4. Console Debugging
```javascript
// Log ra available slugs khi không tìm thấy
console.log('Available slugs:', projects.map(p => p.slug))
```

---

## 🧪 Testing Steps:

### Local Testing:
```bash
# 1. Build
npm run build

# 2. Preview locally
npm run preview

# 3. Test URLs
http://localhost:4173/#/
http://localhost:4173/#/du-an/noxh-nhs-trung-van-ha-noi
http://localhost:4173/#/tinh/ha-noi

# 4. Debug slugs
./debug-slugs.sh
```

### Production Testing:
```bash
# 1. Deploy
# (upload dist folder hoặc docker build)

# 2. Clear browser cache
Ctrl+Shift+R (hard refresh)

# 3. Check browser console
F12 -> Console tab
# Look for slug-related warnings/errors

# 4. Test with incognito
# Để loại trừ cache issues
```

---

## 🔧 Server Configuration

### Nginx (đã optimize):
```nginx
# SPA routing
location / {
    try_files $uri $uri/ /index.html;
}

# Cache HTML = 0
location ~* \.html$ {
    add_header Cache-Control "no-cache, must-revalidate";
    expires -1;
}
```

### Apache (.htaccess đã thêm):
```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## 🐛 Common Issues & Solutions:

### Issue 1: "Không tìm thấy dự án" 
**Symptoms:** Trang detail show not found
**Solution:**
1. Check browser console for slug value
2. Compare với slugs trong mockData.js
3. Verify Google Sheets không có duplicate/typo

### Issue 2: Blank page sau deploy
**Symptoms:** Trang trắng, không error
**Solution:**
1. Check browser console errors
2. Verify dist/index.html exists
3. Check nginx error logs: `tail -f /var/log/nginx/error.log`

### Issue 3: 404 khi refresh trang
**Symptoms:** F5 bị 404
**Solution:**
1. HashRouter should handle this (URLs có #)
2. If using BrowserRouter, need server rewrite
3. Check nginx try_files directive

### Issue 4: Slugs từ API bị lỗi
**Symptoms:** Static projects OK, dynamic projects fail
**Solution:**
1. Check Google Sheets data format
2. Verify slug column không có spaces/special chars
3. Enable console logging để see raw API data

---

## 📝 Debug Checklist:

- [ ] Build successful: `npm run build`
- [ ] Preview works locally: `npm run preview`
- [ ] All routes accessible với #
- [ ] Browser console clean (no errors)
- [ ] Network tab shows 200 for all assets
- [ ] Hard refresh tested (Ctrl+Shift+R)
- [ ] Incognito mode tested
- [ ] Multiple browsers tested
- [ ] Mobile responsive tested

---

## 🚨 Emergency Rollback:

Nếu vẫn lỗi sau fixes:

```bash
# 1. Revert to BrowserRouter (nếu cần)
# src/App.jsx: HashRouter -> BrowserRouter

# 2. Simplify routing
# Remove lazy loading temporarily

# 3. Use static data only
# Comment out Google Sheets fetch

# 4. Check production logs
ssh user@server
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

---

## 📞 Support Commands:

```bash
# Check nginx config
nginx -t

# Reload nginx
sudo systemctl reload nginx

# View logs
journalctl -u nginx -f

# Clear nginx cache
sudo rm -rf /var/cache/nginx/*

# Check disk space
df -h

# Check permissions
ls -la /var/www/noxh/dist/
```

---

## ✅ Validation Script:

Run after deployment:
```bash
./test-performance.sh https://yourdomain.com
./debug-slugs.sh
```

Look for:
- ✓ All assets loading (200)
- ✓ No duplicate slugs
- ✓ Console clean
- ✓ Routes working

---

*Last updated: After Phase 2 optimization*
