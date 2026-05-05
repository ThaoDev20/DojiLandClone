import React, { createContext, useState, useEffect, useContext } from 'react';
import { projects as initialProjects, provinces } from '../data/mockData';
import { fetchNews, fetchProjects, fetchProvinces } from '../services/dataService';
import { submitRegistration } from '../services/formSubmission';

const DataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext);

// Helper: Normalize slug
const normalizeSlug = (slug) => {
    if (!slug) return '';
    return slug.toLowerCase().trim().replace(/\s+/g, '-');
};

// Helper: Validate slugs in projects
const validateSlugs = (projects) => {
    return projects.map(project => ({
        ...project,
        slug: project.slug ? normalizeSlug(project.slug) : `project-${project.id}`,
        province: project.province ? normalizeSlug(project.province) : ''
    }));
};

// Helper: Parse JSON fields that might be strings from Google Sheets
const parseProjectData = (project) => {
    const parsed = { ...project };

    // Parse projectImages if it's a string
    if (typeof parsed.projectImages === 'string') {
        try {
            parsed.projectImages = JSON.parse(parsed.projectImages);
        } catch {
            // If not JSON, try splitting by comma
            parsed.projectImages = parsed.projectImages.split(',').map(s => s.trim()).filter(Boolean);
        }
    }

    // Ensure it's an array
    if (!Array.isArray(parsed.projectImages)) {
        parsed.projectImages = [];
    }

    // Parse amenities if it's a string
    if (typeof parsed.amenities === 'string') {
        try {
            parsed.amenities = JSON.parse(parsed.amenities);
        } catch {
            // If not JSON, split by comma or newline
            parsed.amenities = parsed.amenities.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
        }
    }

    // Ensure it's an array
    if (!Array.isArray(parsed.amenities)) {
        parsed.amenities = [];
    }

    // Parse locationAnalysis if it's a string
    if (typeof parsed.locationAnalysis === 'string') {
        try {
            parsed.locationAnalysis = JSON.parse(parsed.locationAnalysis);
        } catch {
            parsed.locationAnalysis = {};
        }
    }

    return parsed;
};

// Helper: Remove duplicate slugs (keep first occurrence)
const deduplicateBySlug = (projects) => {
    const seen = new Set();
    const unique = [];

    for (const project of projects) {
        if (!seen.has(project.slug)) {
            seen.add(project.slug);
            unique.push(project);
        } else {
            console.warn(`Duplicate slug detected and removed: ${project.slug}`, project.name);
        }
    }

    return unique;
};

const defaultSettings = {
    homeBanner: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&fm=webp&q=80',
    provinceBanners: {
        'ha-noi': 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200&fm=webp&q=80',
        'bac-ninh': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&fm=webp&q=80',
        'bac-giang': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&fm=webp&q=80',
        'quang-ninh': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&fm=webp&q=80',
        'hung-yen': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&fm=webp&q=80',
        'hai-duong': 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&fm=webp&q=80'
    },
    defaultProvinceBanner:
    "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200&fm=webp&q=80",
};

export const DataProvider = ({ children }) => {

    const [data, setData] = useState({
        projects: initialProjects, // Start with mock data immediately
        provinces: provinces,
        news: [],
        settings: defaultSettings
    });

    const [isLoading, setIsLoading] = useState(false); // Start with false to show mock data immediately

    // Load data on mount
    useEffect(() => {
        const loadAllData = async () => {
            // Only fetch if explicitly enabled
            const ENABLE_DYNAMIC_FETCH = import.meta.env.VITE_ENABLE_DYNAMIC_FETCH === 'true';

            if (!ENABLE_DYNAMIC_FETCH) {
                console.log('📦 Using static data (fast mode)');
                console.log('💡 To update data: run "npm run sync-data"');
                setIsLoading(false);
                return;
            }

            // Only fetch if URL is configured
            if (!import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL) {
                console.log('Google Apps Script URL not configured, using mock data only');
                setIsLoading(false);
                return;
            }

            // Check cache first
            const CACHE_DURATION = parseInt(import.meta.env.VITE_CACHE_DURATION || '5') * 60 * 1000; // minutes to ms
            const cachedData = localStorage.getItem('noxh_data_cache');
            const cacheTimestamp = localStorage.getItem('noxh_data_timestamp');

            if (cachedData && cacheTimestamp) {
                const age = Date.now() - parseInt(cacheTimestamp);
                if (age < CACHE_DURATION) {
                    console.log('⚡ Loading from cache (age: ' + Math.round(age / 1000) + 's)');
                    const cached = JSON.parse(cachedData);
                    setData(prev => ({
                        ...prev,
                        projects: cached.projects?.length > 0 ? deduplicateBySlug(cached.projects.map(parseProjectData)) : prev.projects,
                        provinces: cached.provinces?.length > 0 ? cached.provinces : prev.provinces,
                        news: cached.news || []
                    }));
                    setIsLoading(false);

                    // Fetch in background to update cache
                    console.log('🔄 Updating cache in background...');
                    fetchAndCache();
                    return;
                }
            }

            // No cache or expired - fetch now
            console.log('📡 Fetching fresh data...');
            await fetchAndCache();
        };

        const fetchAndCache = async () => {

            try {
                // Fetch in parallel
                const [newsData, projectsData, provincesData] = await Promise.all([
                    fetchNews(),
                    fetchProjects(),
                    fetchProvinces()
                ]);

                console.log('Fetched data:', {
                    news: newsData.length,
                    projects: projectsData.length,
                    provinces: provincesData.length
                });

                // IMPORTANT: Only update if we got actual data
                // Don't override mock data with empty arrays
                const newData = {};

                if (newsData.length > 0) {
                    newData.news = newsData;
                }

                if (projectsData.length > 0) {
                    // Validate and deduplicate projects by slug
                    // Also parse JSON fields from Google Sheets
                    const parsedProjects = projectsData.map(parseProjectData);
                    newData.projects = deduplicateBySlug(validateSlugs(parsedProjects));
                }

                if (provincesData.length > 0) {
                    newData.provinces = provincesData;
                }

                setData(prev => ({
                    ...prev,
                    ...newData
                }));

                // Cache the fresh data
                if (Object.keys(newData).length > 0) {
                    const cacheData = {
                        projects: newData.projects || data.projects,
                        provinces: newData.provinces || data.provinces,
                        news: newData.news || data.news
                    };
                    localStorage.setItem('noxh_data_cache', JSON.stringify(cacheData));
                    localStorage.setItem('noxh_data_timestamp', Date.now().toString());
                    console.log('✅ Data cached successfully');
                }
            } catch (error) {
                console.error("Error loading dynamic data:", error);
                // Keep using initial/mock data on error
            } finally {
                setIsLoading(false);
            }
        };

        loadAllData();

        // Refresh every 5 minutes
        const refreshInterval = setInterval(loadAllData, 5 * 60 * 1000);

        return () => {
            clearInterval(refreshInterval);
        };
    }, []);

    // Helper to get only visible items
    const getVisibleProjects = () => data.projects.filter(p => p.isVisible !== false);
    const getVisibleNews = () => data.news.filter(n => n.isVisible !== false);

    // Submit registration via service
    const addRegistration = async (formData) => {
        try {
            await submitRegistration(formData);
            return true;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    return (
        <DataContext.Provider value={{
            projects: data.projects,
            visibleProjects: getVisibleProjects(),
            provinces: data.provinces,
            news: data.news,
            visibleNews: getVisibleNews(),
            settings: data.settings,
            isLoading,
            addRegistration
        }}>
            {children}
        </DataContext.Provider>
    );
};
