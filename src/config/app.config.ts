/**
 * Application Configuration
 *
 * Centralized configuration for the entire application.
 * Use environment variables for sensitive data and deployment-specific values.
 */

export const APP_CONFIG = {
  /**
   * API Configuration
   */
  api: {
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3001/graphql",
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
    retries: 3,
  },

  /**
   * Polling Intervals (in milliseconds)
   */
  polling: {
    messages: Number(process.env.NEXT_PUBLIC_POLLING_MESSAGES) || 10000,
    inbox: Number(process.env.NEXT_PUBLIC_POLLING_INBOX) || 15000,
    notifications:
      Number(process.env.NEXT_PUBLIC_POLLING_NOTIFICATIONS) || 30000,
    properties: 60000, // 1 minute - property listings
  },

  /**
   * Pagination
   */
  pagination: {
    defaultLimit: Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE_LIMIT) || 20,
    maxLimit: 100,
    propertiesPerPage:
      Number(process.env.NEXT_PUBLIC_PROPERTIES_PER_PAGE) || 24,
    messagesPerPage: 50,
  },

  /**
   * File Uploads
   */
  uploads: {
    maxFileSize:
      Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 5 * 1024 * 1024,
    maxFiles: Number(process.env.NEXT_PUBLIC_MAX_FILES) || 10,
    allowedImageTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    allowedDocTypes: ["application/pdf"],
  },

  /**
   * Cache Configuration (Apollo Client)
   */
  cache: {
    properties: 5 * 60 * 1000, // 5 minutes
    userProfiles: 5 * 60 * 1000, // 5 minutes
    staticData: 60 * 60 * 1000, // 1 hour (cities, zones, types)
    searchResults: 2 * 60 * 1000, // 2 minutes
  },

  /**
   * Feature Flags
   */
  features: {
    enableWebSockets: process.env.NEXT_PUBLIC_ENABLE_WEBSOCKETS === "true",
    enableNotifications:
      process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS !== "false",
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false",
    enablePremiumFeatures: true,
    enableImageUpload: process.env.NEXT_PUBLIC_ENABLE_IMAGE_UPLOAD === "true",
    enableSocialLogin: true,
  },

  /**
   * Map Configuration
   */
  map: {
    defaultCenter: {
      lat: -16.5, // Bolivia center
      lng: -68.15,
    },
    defaultZoom: 6,
    maxZoom: 18,
    minZoom: 5,
  },

  /**
   * Search Configuration
   */
  search: {
    minQueryLength: 2,
    debounceDelay: 300, // milliseconds
    maxRecentSearches: 10,
  },

  /**
   * Messaging Configuration
   */
  messaging: {
    maxMessageLength: 2000,
    maxConversationsPerPage: 50,
    typingIndicatorTimeout: 3000, // 3 seconds
  },

  /**
   * UI Configuration
   */
  ui: {
    toastDuration: 3000, // 3 seconds
    animationDuration: 200, // milliseconds
    mobileBreakpoint: 768, // pixels
  },

  /**
   * External Services
   */
  services: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "es",
    mapbox: {
      token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "",
    },
    cloudinary: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
      uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
    },
    analytics: {
      googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "",
    },
  },

  /**
   * Business Rules
   */
  business: {
    premium: {
      features: {
        readReceipts: true,
        imageAttachments: true,
        priorityBadge: true,
        unlimitedProperties: true,
      },
    },
    free: {
      maxProperties: 3,
      maxImages: 5,
    },
  },
} as const;

/**
 * Type-safe config access
 */
export type AppConfig = typeof APP_CONFIG;

/**
 * Helper to check if a feature is enabled
 */
export const isFeatureEnabled = (
  feature: keyof typeof APP_CONFIG.features
): boolean => {
  return APP_CONFIG.features[feature];
};

/**
 * Helper to get polling interval
 */
export const getPollingInterval = (
  type: keyof typeof APP_CONFIG.polling
): number => {
  return APP_CONFIG.polling[type];
};
