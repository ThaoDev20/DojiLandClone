import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchProjects, fetchNews, fetchProvinces } from './dataService';

describe('dataService', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        global.fetch = vi.fn();
    });

    it('fetches projects successfully', async () => {
        const mockData = [{ id: 1, name: 'Test Project' }];
        const mockResponse = { success: true, data: mockData };

        // Mock first call (cache) to fail (return 404 or invalid json that doesn't match cache structure)
        global.fetch.mockResolvedValueOnce({
            ok: false
        });

        // Mock second call (GAS) to succeed
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const projects = await fetchProjects();
        expect(projects).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('action=getProjects'), expect.any(Object));
    });

    it('handles empty response gracefully', async () => {
        // Mock cache miss
        global.fetch.mockResolvedValueOnce({ ok: false });

        // Mock GAS response
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: false })
        });

        const projects = await fetchProjects();
        expect(projects).toEqual([]);
    });

    it('handles fetch errors gracefully', async () => {
        // Mock cache miss
        global.fetch.mockResolvedValueOnce({ ok: false });

        // Mock GAS error
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        const projects = await fetchProjects();
        expect(projects).toEqual([]);
    });

    it('fetches news successfully', async () => {
        const mockData = [{ id: 1, title: 'Test News' }];
        // Mock cache miss
        global.fetch.mockResolvedValueOnce({ ok: false });

        // Mock GAS response
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true, data: mockData })
        });

        const news = await fetchNews();
        expect(news).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('action=getNews'), expect.any(Object));
    });
});
