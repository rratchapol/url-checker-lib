import {
    isValidWebsiteURL,
    isValidHTTPSURL,
    isValidSocialMediaURL,
    isValidFacebookURL,
    isValidInstagramURL,
    isValidLinkedInURL,
    isValidXURL,
    isValidURL,
    normalizeURL,
    extractDomain,
    isCheckUrl
} from './src/index.js';

console.log('--- URL Validation & Normalization Tests ---');

console.log('\n1. Website Validation:');
console.log("isValidWebsiteURL('https://example.com'):", isValidWebsiteURL('https://example.com')); // true
console.log("isValidWebsiteURL('example.com'):", isValidWebsiteURL('example.com')); // true
console.log("isValidWebsiteURL('not a url'):", isValidWebsiteURL('not a url')); // false

console.log('\n2. HTTPS Validation:');
console.log("isValidHTTPSURL('https://example.com'):", isValidHTTPSURL('https://example.com')); // true
console.log("isValidHTTPSURL('http://example.com'):", isValidHTTPSURL('http://example.com')); // false

console.log('\n3. Social Media Validation:');
console.log("isValidFacebookURL('https://www.facebook.com/username'):", isValidFacebookURL('https://www.facebook.com/username')); // true
console.log("isValidInstagramURL('https://instagram.com/user'):", isValidInstagramURL('https://instagram.com/user')); // true
console.log("isValidLinkedInURL('https://linkedin.com/in/user'):", isValidLinkedInURL('https://linkedin.com/in/user')); // true
console.log("isValidXURL('https://x.com/user'):", isValidXURL('https://x.com/user')); // true

console.log('\n4. Unified Validation:');
console.log("isValidURL('https://example.com', 'website'):", isValidURL('https://example.com', 'website')); // true
console.log("isValidURL('https://facebook.com/user', 'facebook'):", isValidURL('https://facebook.com/user', 'facebook')); // true

console.log('\n5. Normalization:');
console.log("normalizeURL('example.com'):", normalizeURL('example.com')); // https://example.com
console.log("extractDomain('https://www.example.com/path'):", extractDomain('https://www.example.com/path')); // www.example.com
console.log("isCheckUrl('example.com'):", isCheckUrl('example.com')); // https://example.com

console.log('\n--- End Tests ---');
