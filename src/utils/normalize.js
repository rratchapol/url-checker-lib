/**
 * URL Normalization Utilities
 * 
 * Functions for normalizing and manipulating URL strings.
 */

/**
 * Normalizes a URL by adding https:// if no protocol is present
 * 
 * @param url - The URL string to normalize
 * @returns Normalized URL string or empty string if invalid
 * 
 * @example
 * normalizeURL('example.com') // 'https://example.com'
 * normalizeURL('http://example.com') // 'http://example.com'
 */
export const normalizeURL = (url) => {
    if (!url || typeof url !== 'string') return '';

    url = url.trim();

    // ถ้ามี protocol อยู่แล้ว return เลย
    if (url.match(/^https?:\/\//)) {
        return url;
    }

    // เพิ่ม https://
    return `https://${url}`;
};

/**
 * Extracts the domain from a URL
 * 
 * @param url - The URL string
 * @returns Domain name or empty string if invalid
 * 
 * @example
 * extractDomain('https://www.example.com/path') // 'www.example.com'
 * extractDomain('example.com') // 'example.com'
 */
export const extractDomain = (url) => {
    if (!url || typeof url !== 'string') return '';

    try {
        const urlToTest = url.match(/^https?:\/\//)
            ? url
            : `https://${url}`;

        const urlObj = new URL(urlToTest);
        return urlObj.hostname;
    } catch (error) {
        return '';
    }
};

/**
 * Ensures URL has protocol (http:// or https://)
 * If the URL already has a protocol, returns it as is.
 * Otherwise, adds https:// prefix.
 * 
 * @param url - The URL string to check and normalize
 * @returns URL with protocol
 * 
 * @example
 * ensureUrlProtocol('example.com') // 'https://example.com'
 * ensureUrlProtocol('http://example.com') // 'http://example.com'
 * ensureUrlProtocol('https://example.com') // 'https://example.com'
 */
export const isCheckUrl = (url) => {
    if (!url || typeof url !== 'string') return '';

    url = url.trim();

    // ถ้ามี protocol อยู่แล้ว return เลย
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // เพิ่ม https://
    return `https://${url}`;
};
