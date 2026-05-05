import { projects, provinces } from './src/data/mockData.js';
import fs from 'fs';

// Helper to escape CSV fields
const escape = (field) => {
    if (field === undefined || field === null) return '';
    const stringField = String(field);
    if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
};

// Flatten object for CSV (handling arrays and objects like locationAnalysis)
const flattenProject = (p) => {
    return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        province: p.province,
        location: p.location,
        price: p.price,
        area: p.area,
        status: p.status,
        statusLabel: p.statusLabel,
        isVisible: p.isVisible,
        image: p.image,
        mapEmbedUrl: p.mapEmbedUrl,
        investor: p.investor,
        scale: p.scale,
        designUnit: p.designUnit,
        constructionUnit: p.constructionUnit,
        legal: p.legal,
        handover: p.handover,
        description: p.description,
        amenities: p.amenities ? p.amenities.join(', ') : '',
        projectImages: p.projectImages ? p.projectImages.join(', ') : '',
        // Flatten locationAnalysis into a single string or keep separate if preferred. 
        // For simplicity in sheet, let's keep it simple or user can expand.
        locationAnalysis_east: p.locationAnalysis?.east || '',
        locationAnalysis_west: p.locationAnalysis?.west || '',
        locationAnalysis_south: p.locationAnalysis?.south || '',
        locationAnalysis_north: p.locationAnalysis?.north || '',
        locationAnalysis_connection: p.locationAnalysis?.connection || ''
    };
};

/* 1. Export Provinces */
const provinceHeaders = Object.keys(provinces[0]);
const provinceCSV = [
    provinceHeaders.join(','), // Header row
    ...provinces.map(row => provinceHeaders.map(fieldName => escape(row[fieldName])).join(','))
].join('\n');

fs.writeFileSync('data_provinces.csv', provinceCSV);
console.log('Provinces exported to data_provinces.csv');

/* 2. Export Projects */
const flatProjects = projects.map(flattenProject);
// Get all unique keys from all projects to ensure we have all columns
const projectHeaders = [...new Set(flatProjects.flatMap(Object.keys))];

const projectCSV = [
    projectHeaders.join(','),
    ...flatProjects.map(row => projectHeaders.map(fieldName => escape(row[fieldName])).join(','))
].join('\n');

fs.writeFileSync('data_projects.csv', projectCSV);
console.log('Projects exported to data_projects.csv');
