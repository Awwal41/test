// Custom hook for fetching resource data with backend integration
// Provides consistent data fetching logic across all resource pages

import { useState, useEffect, useCallback } from 'react';
import { fetchResourceData, validateResourceData, getCurrentConfig } from '@/config/api';

export const useResourceData = (resourceType, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState({});
  
  const config = getCurrentConfig();
  
  // Default options
  const defaultOptions = {
    autoFetch: true,
    fallbackData: [],
    queryParams: {},
    onSuccess: null,
    onError: null,
    enableCache: config.cacheTimeout > 0
  };
  
  const finalOptions = { ...defaultOptions, ...options };

  // Cache key for this resource type and params
  const cacheKey = `${resourceType}_${JSON.stringify(finalOptions.queryParams)}`;

  // Fetch function
  const fetchData = useCallback(async (queryParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Check cache first (if enabled)
      if (finalOptions.enableCache && typeof window !== 'undefined') {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data: cachedData, timestamp } = JSON.parse(cached);
          const age = Date.now() - timestamp;
          
          if (age < config.cacheTimeout) {
            console.log(`Using cached ${resourceType} data`);
            const validated = validateResourceData(cachedData, resourceType);
            setData(validated.items);
            setMetadata(validated.metadata);
            setLoading(false);
            return validated.items;
          }
        }
      }

      // Merge query parameters
      const mergedParams = { ...finalOptions.queryParams, ...queryParams };
      
      // Fetch fresh data
      console.log(`Fetching fresh ${resourceType} data...`);
      const rawData = await fetchResourceData(resourceType, mergedParams);
      
      // Validate and process data
      const validated = validateResourceData(rawData, resourceType);
      
      // Cache the data (if enabled)
      if (finalOptions.enableCache && typeof window !== 'undefined') {
        localStorage.setItem(cacheKey, JSON.stringify({
          data: rawData,
          timestamp: Date.now()
        }));
      }

      setData(validated.items);
      setMetadata(validated.metadata);
      setError(null);

      // Success callback
      if (finalOptions.onSuccess) {
        finalOptions.onSuccess(validated.items, validated.metadata);
      }

      return validated.items;

    } catch (err) {
      console.error(`Error fetching ${resourceType}:`, err);
      setError(err.message);

      // Use fallback data if available
      if (finalOptions.fallbackData && finalOptions.fallbackData.length > 0) {
        console.log(`Using fallback ${resourceType} data`);
        setData(finalOptions.fallbackData);
      }

      // Error callback
      if (finalOptions.onError) {
        finalOptions.onError(err);
      }

      return finalOptions.fallbackData || [];

    } finally {
      setLoading(false);
    }
  }, [resourceType, cacheKey, finalOptions, config.cacheTimeout]);

  // Refresh function
  const refresh = useCallback((queryParams = {}) => {
    // Clear cache
    if (typeof window !== 'undefined') {
      localStorage.removeItem(cacheKey);
    }
    return fetchData(queryParams);
  }, [fetchData, cacheKey]);

  // Search function
  const search = useCallback((searchTerm, additionalParams = {}) => {
    return fetchData({
      ...additionalParams,
      search: searchTerm
    });
  }, [fetchData]);

  // Filter function
  const filter = useCallback((filters) => {
    return fetchData(filters);
  }, [fetchData]);

  // Sort function
  const sort = useCallback((sortBy, additionalParams = {}) => {
    return fetchData({
      ...additionalParams,
      sort: sortBy
    });
  }, [fetchData]);

  // Auto-fetch on mount
  useEffect(() => {
    if (finalOptions.autoFetch) {
      fetchData();
    }
  }, [fetchData, finalOptions.autoFetch]);

  // Clear cache on unmount (optional)
  useEffect(() => {
    return () => {
      if (!finalOptions.enableCache && typeof window !== 'undefined') {
        localStorage.removeItem(cacheKey);
      }
    };
  }, [cacheKey, finalOptions.enableCache]);

  return {
    data,
    loading,
    error,
    metadata,
    // Actions
    fetchData,
    refresh,
    search,
    filter,
    sort,
    // Utilities
    isLoading: loading,
    hasError: !!error,
    hasData: data.length > 0,
    isEmpty: !loading && data.length === 0,
    // Cache utilities
    clearCache: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(cacheKey);
      }
    }
  };
};

// Specialized hooks for each resource type
export const useTranscripts = (options = {}) => {
  return useResourceData('transcripts', options);
};

export const useAudioMessages = (options = {}) => {
  return useResourceData('audio', options);
};

export const useArticles = (options = {}) => {
  return useResourceData('articles', options);
};

export const useGallery = (options = {}) => {
  return useResourceData('gallery', options);
};

// Hook for getting featured/latest items
export const useFeaturedResource = (resourceType, options = {}) => {
  const { data, loading, error, ...rest } = useResourceData(resourceType, {
    ...options,
    queryParams: {
      ...options.queryParams,
      featured: true,
      limit: 1
    }
  });

  return {
    featured: data[0] || null,
    loading,
    error,
    ...rest
  };
};

// Hook for resource statistics
export const useResourceStats = (resourceType) => {
  const [stats, setStats] = useState({
    total: 0,
    categories: [],
    speakers: [],
    recent: 0
  });

  const { data, loading } = useResourceData(resourceType, {
    queryParams: { stats: true }
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const categories = [...new Set(data.map(item => item.category))];
      const speakers = [...new Set(data.map(item => item.speaker))];
      const recent = data.filter(item => {
        const itemDate = new Date(item.date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return itemDate >= thirtyDaysAgo;
      }).length;

      setStats({
        total: data.length,
        categories,
        speakers,
        recent
      });
    }
  }, [data]);

  return { stats, loading };
};

export default useResourceData;