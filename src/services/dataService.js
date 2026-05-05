/**
 * Data Service
 * Handles fetching data (News, Projects, Provinces) from Local Cache (Server-generated)
 * Fallback to GAS if cache fails is optional but cache is preferred for speed.
 */

const CACHE_URL = '/data/cache.json';
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

// Simple memory cache for the session to avoid repeated requests if needed, 
// but browser cache on the json file should handle this.

/**
 * Fetch all data from the static cache file
 */
const fetchAllFromCache = async () => {
    try {
        // Add timestamp to prevent browser aggressive caching for the meta-request
        // but typically nginx handles this with ETags.
        // For simplicity, we just fetch.
        const response = await fetch(CACHE_URL);
        if (!response.ok) throw new Error('Cache missing');
        const data = await response.json();
        return data; // { news, projects, provinces, timestamp }
    } catch (error) {
        console.warn('Cache fetch failed, falling back to direct GAS:', error);
        return null;
    }
};

/**
 * Generic fetch function for GAS (Legacy/Fallback)
 */
const fetchFromGAS = async (action) => {
    if (!GOOGLE_APPS_SCRIPT_URL) return [];
    try {
        const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=${action}`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'text/plain' }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result.success ? result.data : [];
    } catch (error) {
        console.error(`Error fetching ${action} from GAS:`, error);
        return [];
    }
};

// We will cache the promise to avoid multiple simultaneous requests
let globalCachePromise = null;

const getCachedData = async () => {
    if (globalCachePromise) return globalCachePromise;

    globalCachePromise = fetchAllFromCache();
    const data = await globalCachePromise;

    // If cache failed, clear promise so we retry next time
    if (!data) {
        globalCachePromise = null;
    }
    return data;
};

export const fetchNews = async () => {
    const data = await getCachedData();
    if (data && data.news) return data.news;
    return fetchFromGAS('getNews');
};

export const fetchProjects = async () => {
    const data = await getCachedData();
    if (data && data.projects) return data.projects;
    return fetchFromGAS('getProjects');
};

export const fetchProvinces = async () => {
    const data = await getCachedData();
    if (data && data.provinces) return data.provinces;
    return fetchFromGAS('getProvinces');
};


