

const CACHE_URL = '/data/cache.json';
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;


const fetchAllFromCache = async () => {
    try {
        const response = await fetch(CACHE_URL);
        if (!response.ok) throw new Error('Cache missing');
        const data = await response.json();
        return data; 
    } catch (error) {
        console.warn('Cache fetch failed, falling back to direct GAS:', error);
        return null;
    }
};


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

let globalCachePromise = null;

const getCachedData = async () => {
    if (globalCachePromise) return globalCachePromise;

    globalCachePromise = fetchAllFromCache();
    const data = await globalCachePromise;

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


