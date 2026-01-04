import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  // Get token from zustand persist storage
  let token = null;
  if (typeof window !== "undefined") {
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const authData = JSON.parse(authStorage);
        token = authData?.state?.token;
      }
    } catch (e) {
      console.error("Error reading auth token:", e);
    }
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Cache configuration with TTL
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Properties cache (5 minutes)
        properties: {
          keyArgs: ["filters", "page", "limit"],
          merge(existing, incoming) {
            return incoming;
          },
        },
        property: {
          keyArgs: ["id"],
        },
        // User profiles cache (5 minutes)
        user: {
          keyArgs: ["id"],
        },
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        // Static data cache (1 hour)
        cities: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        zones: {
          keyArgs: ["cityId"],
          merge(existing, incoming) {
            return incoming;
          },
        },
        propertyTypes: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        // Search results cache (2 minutes)
        searchProperties: {
          keyArgs: ["query", "filters"],
          merge(existing, incoming) {
            return incoming;
          },
        },
        // Favorites cache (2 minutes)
        myFavorites: {
          keyArgs: ["page", "limit"],
          merge(existing, incoming) {
            return incoming;
          },
        },
        // Messages cache (30 seconds)
        myConversations: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        conversationMessages: {
          keyArgs: ["conversationId"],
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

// Cache persistence (optional - saves cache to localStorage)
if (typeof window !== "undefined") {
  // Restore cache from localStorage on load
  const cachedData = localStorage.getItem("apollo-cache");
  if (cachedData) {
    try {
      cache.restore(JSON.parse(cachedData));
    } catch (e) {
      console.error("Error restoring Apollo cache:", e);
    }
  }

  // Save cache to localStorage periodically (every 30 seconds)
  setInterval(() => {
    try {
      const data = cache.extract();
      localStorage.setItem("apollo-cache", JSON.stringify(data));
    } catch (e) {
      console.error("Error saving Apollo cache:", e);
    }
  }, 30000);
}
