import { gql } from "@apollo/client";

export const CREATE_SAVED_SEARCH = gql`
  mutation CreateSavedSearch($input: CreateSavedSearchInput!) {
    createSavedSearch(input: $input) {
      id
      name
      query
      minPrice
      maxPrice
      bedrooms
      bathrooms
      propertyTypeId
      dealTypeId
      cityId
      zoneId
      alertsEnabled
      createdAt
    }
  }
`;

export const UPDATE_SAVED_SEARCH = gql`
  mutation UpdateSavedSearch($id: String!, $input: UpdateSavedSearchInput!) {
    updateSavedSearch(id: $id, input: $input) {
      id
      name
      alertsEnabled
      updatedAt
    }
  }
`;

export const DELETE_SAVED_SEARCH = gql`
  mutation DeleteSavedSearch($id: String!) {
    deleteSavedSearch(id: $id)
  }
`;

export const TOGGLE_SAVED_SEARCH_ALERTS = gql`
  mutation ToggleSavedSearchAlerts($id: String!, $enabled: Boolean!) {
    toggleSavedSearchAlerts(id: $id, enabled: $enabled) {
      id
      alertsEnabled
      updatedAt
    }
  }
`;
