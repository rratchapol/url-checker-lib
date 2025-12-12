/**
 * Network Status Utilities
 * 
 * Functions for checking the availability and status of URLs.
 */

/**
 * Checks if a URL is reachable and returns its status code.
 * 
 * @param {string} url - The URL to check
 * @param {number} timeout - Timeout in milliseconds (default: 5000)
 * @returns {Promise<{isReachable: boolean, status: number|null, error: string|null}>}
 */
export const checkUrlStatus = async (url, timeout = 5000) => {
    if (!url) {
        return {
            isReachable: false,
            status: null,
            error: 'URL is required'
        };
    }

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            method: 'HEAD', // Use HEAD to minimize data transfer
            signal: controller.signal
        });

        clearTimeout(id);

        return {
            isReachable: response.ok, // true if status is 200-299
            status: response.status,
            error: null
        };
    } catch (error) {
        clearTimeout(id);

        let errorMessage = error.message;
        if (error.name === 'AbortError') {
            errorMessage = 'Request timed out';
        }

        return {
            isReachable: false,
            status: null,
            error: errorMessage
        };
    }
};
