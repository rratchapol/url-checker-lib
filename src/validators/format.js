/**
 * URL Validation Functions
 * 
 * Functions for validating different types of URLs.
 */

import { normalizeURL } from '../utils/normalize.js';

/**
 * Validates if a string is a valid website URL
 * 
 * Supports:
 * - With or without protocol (http://, https://)
 * - Domain names with TLD (example.com, www.example.co.th)
 * - Localhost (for development)
 * - Port numbers (example.com:8080)
 * - Paths and query strings
 * 
 * @param url - The URL string to validate
 * @returns true if valid, false otherwise
 */
export const isValidWebsiteURL = (url) => {
    if (!url || typeof url !== 'string') return false;

    // ลบช่องว่างหน้าหลัง
    url = url.trim();

    try {
        // เพิ่ม https:// ถ้าไม่มี protocol
        const urlToTest = url.match(/^https?:\/\//)
            ? url
            : `https://${url}`;

        const urlObj = new URL(urlToTest);

        // 1. ตรวจสอบ protocol ต้องเป็น http หรือ https เท่านั้น
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
            return false;
        }

        // 2. ตรวจสอบ hostname
        const hostname = urlObj.hostname;
        if (!hostname) return false;

        // 3. ตรวจสอบว่าไม่มีช่องว่าง
        if (hostname.includes(' ')) return false;

        // 4. ตรวจสอบว่ามี TLD (Top Level Domain) หรือเป็น localhost
        const hasTLD = hostname.includes('.') || hostname === 'localhost';
        if (!hasTLD) return false;

        // 5. ตรวจสอบว่า TLD มีความยาวอย่างน้อย 2 ตัวอักษร
        if (hostname.includes('.')) {
            const parts = hostname.split('.');
            const tld = parts[parts.length - 1];
            if (tld.length < 2) return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Validates if a string is a valid HTTPS URL only
 * 
 * @param url - The URL string to validate
 * @returns true if valid HTTPS URL, false otherwise
 */
export const isValidHTTPSURL = (url) => {
    if (!url || typeof url !== 'string') return false;

    try {
        const urlToTest = url.match(/^https?:\/\//)
            ? url
            : `https://${url}`;

        const urlObj = new URL(urlToTest);

        // ต้องเป็น HTTPS เท่านั้น
        return urlObj.protocol === 'https:';
    } catch (error) {
        return false;
    }
};

/**
 * Validates if a string is a valid social media URL (strict mode)
 * Requires FULL URL with protocol and path
 * 
 * This is stricter than isValidWebsiteURL - it requires:
 * - Protocol (http:// or https://) to be present
 * - A valid domain
 * - A path component (e.g., /username, /page/123)
 * 
 * @param url - The URL string to validate
 * @returns true if valid full URL with path, false otherwise
 */
export const isValidSocialMediaURL = (url) => {
    if (!url || typeof url !== 'string') return false;

    url = url.trim();

    // 1. ต้องมี protocol (http:// หรือ https://)
    if (!url.match(/^https?:\/\//)) {
        return false;
    }

    try {
        const urlObj = new URL(url);

        // 2. ตรวจสอบ protocol ต้องเป็น http หรือ https
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
            return false;
        }

        // 3. ต้องมี hostname
        if (!urlObj.hostname) {
            return false;
        }

        // 4. ต้องมี path และต้องมากกว่า '/' (ต้องมี content)
        if (!urlObj.pathname || urlObj.pathname === '/' || urlObj.pathname.length <= 1) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Validates if a string is a valid Facebook URL
 * 
 * Checks that:
 * - URL has protocol (http:// or https://)
 * - Domain is facebook.com or www.facebook.com or m.facebook.com
 * - Has a valid path (username, page, etc.)
 * 
 * @param url - The URL string to validate
 * @returns true if valid Facebook URL, false otherwise
 */
export const isValidFacebookURL = (url) => {
    if (!isValidSocialMediaURL(url)) {
        return false;
    }

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();

        // ต้องเป็น facebook.com, www.facebook.com หรือ m.facebook.com
        const facebookDomains = ['facebook.com', 'www.facebook.com', 'm.facebook.com', 'fb.com', 'www.fb.com'];
        return facebookDomains.includes(hostname);
    } catch (error) {
        return false;
    }
};

/**
 * Validates if a string is a valid Instagram URL
 * 
 * Checks that:
 * - URL has protocol (http:// or https://)
 * - Domain is instagram.com or www.instagram.com
 * - Has a valid path (username, profile, etc.)
 * 
 * @param url - The URL string to validate
 * @returns true if valid Instagram URL, false otherwise
 */
export const isValidInstagramURL = (url) => {
    if (!isValidSocialMediaURL(url)) {
        return false;
    }

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();

        // ต้องเป็น instagram.com หรือ www.instagram.com
        const instagramDomains = ['instagram.com', 'www.instagram.com'];
        return instagramDomains.includes(hostname);
    } catch (error) {
        return false;
    }
};

/**
 * Validates if a string is a valid LinkedIn URL
 * 
 * Checks that:
 * - URL has protocol (http:// or https://)
 * - Domain is linkedin.com or www.linkedin.com
 * - Has a valid path (/in/, /company/, etc.)
 * 
 * @param url - The URL string to validate
 * @returns true if valid LinkedIn URL, false otherwise
 */
export const isValidLinkedInURL = (url) => {
    if (!isValidSocialMediaURL(url)) {
        return false;
    }

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();

        // ต้องเป็น linkedin.com หรือ www.linkedin.com
        const linkedinDomains = ['linkedin.com', 'www.linkedin.com'];
        return linkedinDomains.includes(hostname);
    } catch (error) {
        return false;
    }
};

/**
 * Validates if a string is a valid X.com URL
 * 
 * Checks that:
 * - URL has protocol (http:// or https://)
 * - Domain is x.com or www.x.com
 * - Has a valid path (username, profile, etc.)
 * 
 * @param url - The URL string to validate
 * @returns true if valid X.com URL, false otherwise
 */
export const isValidXURL = (url) => {
    if (!isValidSocialMediaURL(url)) {
        return false;
    }

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();

        // ต้องเป็น x.com หรือ www.x.com
        const xDomains = ['x.com', 'www.x.com'];
        return xDomains.includes(hostname);
    } catch (error) {
        return false;
    }
};

/**
 * Unified URL validation function
 * 
 * Validates URLs based on the specified type.
 * - 'website': Basic website URL (with or without protocol)
 * - 'facebook': Must be a Facebook URL with protocol and path
 * - 'instagram': Must be an Instagram URL with protocol and path
 * - 'linkedin': Must be a LinkedIn URL with protocol and path
 * - 'x': Must be a X.com URL with protocol and path
 * 
 * @param url - The URL string to validate
 * @param type - The type of URL validation to perform (default: 'website')
 * @returns true if valid according to the type, false otherwise
 */
export const isValidURL = (url, type = 'website') => {
    if (!url || typeof url !== 'string') return false;

    switch (type) {
        case 'website':
            return isValidWebsiteURL(url);
        case 'facebook':
            return isValidFacebookURL(url);
        case 'instagram':
            return isValidInstagramURL(url);
        case 'linkedin':
            return isValidLinkedInURL(url);
        case 'x':
            return isValidXURL(url);
        default:
            return false;
    }
};
