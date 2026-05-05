#!/usr/bin/env node
/**
 * Sync Data from Google Sheets to Mock Data
 * 
 * Usage:
 *   node scripts/sync-from-sheets.js
 *   npm run sync-data
 * 
 * This script fetches data from Google Sheets and updates src/data/mockData.js
 * Run this manually when you want to update data, not on every page load
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const GOOGLE_APPS_SCRIPT_URL = process.env.VITE_GOOGLE_APPS_SCRIPT_URL;

if (!GOOGLE_APPS_SCRIPT_URL) {
    console.error('❌ VITE_GOOGLE_APPS_SCRIPT_URL not found in environment');
    console.log('Please set it in .env file');
    process.exit(1);
}

/**
 * Fetch data from Google Apps Script
 */
const fetchData = async (action) => {
    try {
        console.log(`📡 Fetching ${action}...`);
        const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=${action}`, {
            method: 'GET',
            headers: { 'Content-Type': 'text/plain' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            console.log(`✅ Fetched ${result.data.length} ${action}`);
            return result.data;
        } else {
            console.warn(`⚠️  No data for ${action}`);
            return [];
        }
    } catch (error) {
        console.error(`❌ Error fetching ${action}:`, error.message);
        return [];
    }
};

/**
 * Format JavaScript code with proper indentation
 */
const formatObject = (obj, indent = 0) => {
    const indentStr = '    '.repeat(indent);
    const nextIndentStr = '    '.repeat(indent + 1);
    
    if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';
        
        const items = obj.map(item => {
            if (typeof item === 'string') {
                return `${nextIndentStr}"${item.replace(/"/g, '\\"')}"`;
            } else if (typeof item === 'object') {
                return formatObject(item, indent + 1);
            }
            return `${nextIndentStr}${JSON.stringify(item)}`;
        });
        
        return `[\n${items.join(',\n')}\n${indentStr}]`;
    }
    
    if (typeof obj === 'object' && obj !== null) {
        const entries = Object.entries(obj);
        if (entries.length === 0) return '{}';
        
        const props = entries.map(([key, value]) => {
            let formattedValue;
            
            if (typeof value === 'string') {
                formattedValue = `"${value.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
            } else if (Array.isArray(value)) {
                formattedValue = formatObject(value, indent + 1);
            } else if (typeof value === 'object' && value !== null) {
                formattedValue = formatObject(value, indent + 1);
            } else {
                formattedValue = JSON.stringify(value);
            }
            
            return `${nextIndentStr}${key}: ${formattedValue}`;
        });
        
        return `{\n${props.join(',\n')}\n${indentStr}}`;
    }
    
    return JSON.stringify(obj);
};

/**
 * Generate mockData.js content
 */
const generateMockDataFile = (provinces, projects) => {
    return `// This file is auto-generated from Google Sheets
// Last updated: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY - Run 'npm run sync-data' to update

export const provinces = ${formatObject(provinces, 0)};

export const projects = ${formatObject(projects, 0)};

export const overviewData = [
    {
        id: 'noxh-la-gi',
        title: 'Nhà ở xã hội là gì?',
        content: 'Nhà ở xã hội là nhà ở có sự hỗ trợ của Nhà nước cho các đối tượng được hưởng chính sách hỗ trợ về nhà ở theo quy định của Luật Nhà ở.',
    },
    {
        id: 'doi-tuong',
        title: 'Đối tượng được mua NOXH',
        content: '1. Người có công với cách mạng.\\n2. Hộ gia đình nghèo và cận nghèo tại khu vực nông thôn.\\n3. Hộ gia đình tại khu vực nông thôn thuộc vùng thường xuyên bị ảnh hưởng bởi thiên tai, biến đổi khí hậu.\\n4. Người thu nhập thấp, hộ nghèo, cận nghèo tại khu vực đô thị.\\n5. Người lao động đang làm việc tại các doanh nghiệp trong và ngoài khu công nghiệp.\\n6. Sĩ quan, hạ sĩ quan nghiệp vụ, hạ sĩ quan chuyên môn kỹ thuật, quân nhân chuyên nghiệp, công nhân trong cơ quan, đơn vị thuộc công an nhân dân và quân đội nhân dân.\\n7. Cán bộ, công chức, viên chức theo quy định của pháp luật về cán bộ, công chức, viên chức.',
    },
    {
        id: 'dieu-kien',
        title: 'Điều kiện được mua NOXH',
        content: '1. Điều kiện về nhà ở: Chưa có nhà ở thuộc sở hữu của mình, chưa được mua, thuê hoặc thuê mua nhà ở xã hội, chưa được hưởng chính sách hỗ trợ nhà ở, đất ở dưới mọi hình thức tại nơi sinh sống, học tập hoặc có nhà ở thuộc sở hữu của mình nhưng diện tích nhà ở bình quân đầu người trong hộ gia đình thấp hơn mức diện tích nhà ở tối thiểu.\\n2. Điều kiện về cư trú: Phải có đăng ký thường trú tại tỉnh, thành phố trực thuộc trung ương nơi có nhà ở xã hội; trường hợp không có đăng ký thường trú thì phải có đăng ký tạm trú từ 01 năm trở lên tại tỉnh, thành phố này.\\n3. Điều kiện về thu nhập: Phải thuộc diện không phải nộp thuế thu nhập thường xuyên theo quy định của pháp luật về thuế thu nhập cá nhân.',
    },
];
`;
};

/**
 * Main sync function
 */
async function main() {
    console.log('🚀 Starting data sync from Google Sheets...\n');
    
    try {
        // Fetch all data
        const [projects, provinces, news] = await Promise.all([
            fetchData('getProjects'),
            fetchData('getProvinces'),
            fetchData('getNews')
        ]);
        
        console.log('\n📊 Summary:');
        console.log(`  - Projects: ${projects.length}`);
        console.log(`  - Provinces: ${provinces.length}`);
        console.log(`  - News: ${news.length}`);
        
        if (projects.length === 0 && provinces.length === 0) {
            console.warn('\n⚠️  No data fetched. Keeping existing mockData.js');
            process.exit(0);
        }
        
        // Backup current mockData.js
        const mockDataPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
        const backupPath = path.join(__dirname, '..', 'src', 'data', 'mockData.backup.js');
        
        if (fs.existsSync(mockDataPath)) {
            fs.copyFileSync(mockDataPath, backupPath);
            console.log(`\n💾 Backed up to: src/data/mockData.backup.js`);
        }
        
        // Use fetched provinces if available, otherwise use default
        const provincesToUse = provinces.length > 0 ? provinces : [
            {
                id: 'ha-noi',
                name: 'Hà Nội',
                activeProjects: projects.filter(p => p.province === 'ha-noi').length,
                title: 'Thủ đô Hà Nội',
                description: 'Thị trường NOXH sôi động nhất miền Bắc với nhiều dự án tại các quận huyện ngoại thành.',
                marketInfo: 'Hà Nội đang tập trung phát triển NOXH tại các khu vực Đông Anh, Gia Lâm, Nam Từ Liêm...',
            },
            {
                id: 'bac-ninh',
                name: 'Bắc Ninh',
                activeProjects: projects.filter(p => p.province === 'bac-ninh').length,
                title: 'Tỉnh Bắc Ninh',
                description: 'Thủ phủ công nghiệp với nhu cầu nhà ở cho công nhân rất lớn.',
                marketInfo: 'Bắc Ninh đẩy mạnh NOXH gần các KCN Yên Phong, Quế Võ...',
            },
            {
                id: 'bac-giang',
                name: 'Bắc Giang',
                activeProjects: projects.filter(p => p.province === 'bac-giang').length,
                title: 'Tỉnh Bắc Giang',
                description: 'Điểm sáng mới về thu hút FDI và phát triển NOXH.',
                marketInfo: 'Tập trung phát triển nhà ở công nhân tại Việt Yên, Yên Dũng.',
            },
            {
                id: 'quang-ninh',
                name: 'Quảng Ninh',
                activeProjects: projects.filter(p => p.province === 'quang-ninh').length,
                title: 'Tỉnh Quảng Ninh',
                description: 'Phát triển NOXH gắn liền với đô thị hóa ven biển.',
                marketInfo: 'Các dự án tập trung tại Hạ Long, Cẩm Phả.',
            },
            {
                id: 'hung-yen',
                name: 'Hưng Yên',
                activeProjects: projects.filter(p => p.province === 'hung-yen').length,
                title: 'Tỉnh Hưng Yên',
                description: 'Vị trí giáp ranh Hà Nội, thuận tiện giao thông.',
                marketInfo: 'Phát triển NOXH tại Văn Giang, Mỹ Hào.',
            },
            {
                id: 'hai-duong',
                name: 'Hải Dương',
                activeProjects: projects.filter(p => p.province === 'hai-duong').length,
                title: 'Tỉnh Hải Dương',
                description: 'Nhu cầu NOXH tăng cao tại các khu vực đô thị.',
                marketInfo: 'Dự án tập trung tại TP Hải Dương và các KCN.',
            },
        ];
        
        // Generate new mockData.js
        const newContent = generateMockDataFile(provincesToUse, projects);
        fs.writeFileSync(mockDataPath, newContent, 'utf-8');
        
        console.log(`✅ Updated: src/data/mockData.js`);
        console.log('\n✨ Sync completed successfully!');
        console.log('\n📝 Next steps:');
        console.log('  1. Review the changes: src/data/mockData.js');
        console.log('  2. Rebuild: npm run build');
        console.log('  3. Deploy the new build');
        
    } catch (error) {
        console.error('\n❌ Sync failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Run
main();
