// API Configuration for Backend Integration
// Centralized configuration for all data sources and API endpoints

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Base URLs for different environments
const API_BASE_URLS = {
  development: process.env.NEXT_PUBLIC_DEV_API_URL || 'http://localhost:3000',
  production: process.env.NEXT_PUBLIC_PROD_API_URL || 'https://egfmusa.org',
  cdn: process.env.NEXT_PUBLIC_CDN_URL || 'https://egfmusa.b-cdn.net'
};

// Get current base URL
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return isProduction ? API_BASE_URLS.production : API_BASE_URLS.development;
};

// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Transcripts
  transcripts: {
    list: '/api/transcripts',
    create: '/api/transcripts',
    update: (id) => `/api/transcripts/${id}`,
    delete: (id) => `/api/transcripts/${id}`,
    download: (id) => `/api/transcripts/${id}/download`,
    // External sources
    cdn: `${API_BASE_URLS.cdn}/transcripts/transcripts.json`,
    local: '/data/transcripts.json'
  },
  
  // Audio Messages
  audio: {
    list: '/api/audio',
    create: '/api/audio',
    update: (id) => `/api/audio/${id}`,
    delete: (id) => `/api/audio/${id}`,
    // External sources
    cdn: `${API_BASE_URLS.cdn}/audios/audios.json`,
    local: '/data/audios.json'
  },
  
  // Articles
  articles: {
    list: '/api/articles',
    create: '/api/articles',
    update: (id) => `/api/articles/${id}`,
    delete: (id) => `/api/articles/${id}`,
    // External sources
    cdn: `${API_BASE_URLS.cdn}/articles/articles.json`,
    local: '/data/articles.json'
  },
  
  // Gallery
  gallery: {
    list: '/api/gallery',
    create: '/api/gallery',
    update: (id) => `/api/gallery/${id}`,
    delete: (id) => `/api/gallery/${id}`,
    // External sources
    cdn: `${API_BASE_URLS.cdn}/gallery/gallery.json`,
    local: '/data/gallery.json'
  }
};

// Data fetching configuration
export const FETCH_CONFIG = {
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
};

// Data source priority (will try in this order)
export const getDataSources = (type) => {
  const endpoints = API_ENDPOINTS[type];
  if (!endpoints) return [];

  // In development, prioritize local API endpoint
  if (isDevelopment) {
    return [
      `${getBaseUrl()}${endpoints.list}`, // Local API endpoint (highest priority in dev)
      `${getBaseUrl()}${endpoints.local}`, // Local JSON file (second priority in dev)
      endpoints.cdn // CDN source (fallback in dev)
    ];
  }

  // In production, prioritize CDN
  return [
    endpoints.cdn, // CDN source (highest priority in production)
    `${getBaseUrl()}${endpoints.list}`, // API endpoint (fallback)
    `${getBaseUrl()}${endpoints.local}` // Local JSON file (last resort)
  ];
};

// Generic fetch function with retry logic
export const fetchWithRetry = async (url, options = {}) => {
  const config = { ...FETCH_CONFIG, ...options };
  let lastError;

  for (let attempt = 1; attempt <= config.retries; attempt++) {
    try {
      console.log(`Fetch attempt ${attempt}/${config.retries} for: ${url}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
        headers: {
          ...config.headers,
          ...(options.headers || {})
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`Successfully fetched data from: ${url}`);
      return data;

    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed for ${url}:`, error.message);
      
      if (attempt < config.retries) {
        console.log(`Retrying in ${config.retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, config.retryDelay));
      }
    }
  }

  throw lastError;
};

// Generic data fetcher for any resource type
export const fetchResourceData = async (resourceType, queryParams = {}) => {
  const dataSources = getDataSources(resourceType);
  let data = null;
  let lastError = null;

  // Build query string if parameters provided
  const queryString = Object.keys(queryParams).length > 0 
    ? '?' + new URLSearchParams(queryParams).toString()
    : '';

  for (const source of dataSources) {
    try {
      const url = source + queryString;
      data = await fetchWithRetry(url);
      break;
    } catch (error) {
      console.warn(`Failed to fetch ${resourceType} from ${source}:`, error.message);
      lastError = error;
      continue;
    }
  }

  if (!data) {
    throw new Error(`Failed to fetch ${resourceType} from all sources: ${lastError?.message}`);
  }

  return data;
};

// Validation functions
export const validateResourceData = (data, resourceType) => {
  if (!data) {
    throw new Error(`No ${resourceType} data received`);
  }

  // Handle API response format
  let items = Array.isArray(data) ? data : data[resourceType] || data.items || [];

  if (!Array.isArray(items)) {
    throw new Error(`Invalid ${resourceType} data format: expected array`);
  }

  if (items.length === 0) {
    console.warn(`No ${resourceType} items found`);
  }

  return {
    items,
    metadata: data.pagination || data.meta || {},
    filters: data.filters || {},
    timestamp: data.timestamp || new Date().toISOString()
  };
};

// Environment-specific configurations
export const ENV_CONFIG = {
  development: {
    enableLogging: true,
    enableFallbacks: true,
    cacheTimeout: 0 // No caching in development
  },
  production: {
    enableLogging: false,
    enableFallbacks: true,
    cacheTimeout: 300000 // 5 minutes cache
  }
};

export const getCurrentConfig = () => {
  return ENV_CONFIG[process.env.NODE_ENV] || ENV_CONFIG.development;
};

// Export default configuration
export default {
  API_ENDPOINTS,
  FETCH_CONFIG,
  getDataSources,
  fetchWithRetry,
  fetchResourceData,
  validateResourceData,
  getCurrentConfig
};