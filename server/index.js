import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const GAS_URL = process.env.VITE_GOOGLE_APPS_SCRIPT_URL;
// Target is the dist folder in production, or public in dev
// We'll write to public/data so it's copied to dist on build, OR
// if running in prod, we might want to write directly to dist/data if it exists.
// Let's optimize for the "production runtime" case where dist is served.
const CACHE_DIR = path.resolve(__dirname, '../dist/data');
const CACHE_FILE = path.join(CACHE_DIR, 'cache.json');

// Ensure directory exists
if (!fs.existsSync(CACHE_DIR)) {
    try {
        fs.mkdirSync(CACHE_DIR, { recursive: true });
    } catch (e) {
        console.error("Could not create cache directory:", e);
    }
}

let lastDataHash = '';

const fetchData = async (action) => {
    if (!GAS_URL) {
        console.error("VITE_GOOGLE_APPS_SCRIPT_URL is not set!");
        return [];
    }
    try {
        const response = await fetch(`${GAS_URL}?action=${action}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result.success ? result.data : [];
    } catch (error) {
        console.error(`Error fetching ${action}:`, error);
        return [];
    }
};

const updateCache = async () => {
    console.log(`[${new Date().toISOString()}] Starting cache update...`);

    try {
        const [news, projects, provinces] = await Promise.all([
            fetchData('getNews'),
            fetchData('getProjects'),
            fetchData('getProvinces')
        ]);

        const cacheData = {
            timestamp: Date.now(),
            news,
            projects,
            provinces
        };

        const currentHash = JSON.stringify(cacheData);

        if (currentHash !== lastDataHash) {
            fs.writeFileSync(CACHE_FILE, currentHash);
            lastDataHash = currentHash;
            console.log(`[${new Date().toISOString()}] Cache updated successfully to ${CACHE_FILE}`);
        } else {
            console.log(`[${new Date().toISOString()}] Data unchanged. Skipping write.`);
        }

    } catch (error) {
        console.error("Critical error updating cache:", error);
    }
};

// Initial run
updateCache();

// Periodic run
setInterval(updateCache, REFRESH_INTERVAL_MS);

console.log(`Cache server started. Refreshing every ${REFRESH_INTERVAL_MS / 1000} seconds.`);
