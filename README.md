# URL Validation Library

A comprehensive utility library for validating, normalizing, and checking the status of URLs.
This library provides robust tools for handling website URLs and social media profiles (Facebook, Instagram, LinkedIn, X).

## Features

- **URL Validation**: Verify standard website URLs and specific social media profiles.
- **URL Normalization**: Clean up and standardize URL strings.
- **Network Status**: Check if a URL is reachable and active (using `fetch`).
- **ES Modules**: Built with modern JavaScript standards.

## Installation

Since this is a local library, you can include it in your project by cloning the repository or copying the files.

```bash
git clone https://github.com/rratchapol/url-checker-lib.git
cd url-checker-lib
npm install
```

## Usage

Import the functions you need from the library:

```javascript
import { 
    isValidURL, 
    normalizeURL, 
    checkUrlStatus 
} from './src/index.js';
```

### 1. URL Validation

Validate various types of URLs using specific functions or the unified `isValidURL` helper.

```javascript
import { isValidWebsiteURL, isValidFacebookURL, isValidURL } from './src/index.js';

// Basic Website Validation
console.log(isValidWebsiteURL('example.com')); // true
console.log(isValidWebsiteURL('https://example.com')); // true

// Social Media Validation
console.log(isValidFacebookURL('https://facebook.com/username')); // true
console.log(isValidFacebookURL('https://instagram.com/user')); // false (wrong domain)

// Unified Validation Helper
console.log(isValidURL('https://example.com', 'website')); // true
console.log(isValidURL('https://twitter.com/user', 'x')); // true
```

Supported types for `isValidURL`: `'website'`, `'facebook'`, `'instagram'`, `'linkedin'`, `'x'`.

### 2. URL Normalization

Clean up user input and extract useful information.

```javascript
import { normalizeURL, extractDomain, isCheckUrl } from './src/index.js';

// Add protocol if missing
console.log(normalizeURL('example.com')); 
// Output: "https://example.com"

// Extract domain name
console.log(extractDomain('https://www.example.com/path/to/page')); 
// Output: "www.example.com"

// Ensure protocol exists (alias for normalizeURL logic)
console.log(isCheckUrl('example.com')); 
// Output: "https://example.com"
```

### 3. Network Status Check

Verify if a website is actually online and reachable. This function is asynchronous.

```javascript
import { checkUrlStatus } from './src/index.js';

const check = async () => {
    const result = await checkUrlStatus('https://www.google.com');
    console.log(result);
};

check();
```

**Response Object:**
```javascript
{
    isReachable: true,  // true if status is 200-299
    status: 200,        // HTTP status code
    error: null         // Error message if request failed
}
```

## API Reference

### Validators (`src/validators/format.js`)
- `isValidWebsiteURL(url)`: Checks if string is a valid URL.
- `isValidHTTPSURL(url)`: Checks if URL uses HTTPS.
- `isValidSocialMediaURL(url)`: Strict check for social media URLs (requires protocol & path).
- `isValidFacebookURL(url)`: Validates Facebook profile URLs.
- `isValidInstagramURL(url)`: Validates Instagram profile URLs.
- `isValidLinkedInURL(url)`: Validates LinkedIn profile URLs.
- `isValidXURL(url)`: Validates X (Twitter) profile URLs.
- `isValidURL(url, type)`: Unified validator.

### Utilities (`src/utils/normalize.js`)
- `normalizeURL(url)`: Adds `https://` if missing.
- `extractDomain(url)`: Returns the hostname.
- `isCheckUrl(url)`: Ensures protocol presence.

### Network (`src/network/status.js`)
- `checkUrlStatus(url, timeout)`: Checks if URL is reachable (default timeout: 5000ms).

## Author
 rratchapol
