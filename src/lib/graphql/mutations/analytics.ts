import { gql } from "@apollo/client";

export const TRACK_PROPERTY_VIEW = gql`
  mutation TrackPropertyView($propertyId: String!, $sessionId: String) {
    trackPropertyView(propertyId: $propertyId, sessionId: $sessionId)
  }
`;

export const TRACK_PROPERTY_CLICK = gql`
  mutation TrackPropertyClick($propertyId: String!) {
    trackPropertyClick(propertyId: $propertyId)
  }
`;

export const TRACK_PHONE_CLICK = gql`
  mutation TrackPhoneClick($propertyId: String!, $sessionId: String) {
    trackPhoneClick(propertyId: $propertyId, sessionId: $sessionId)
  }
`;

export const TRACK_EMAIL_CLICK = gql`
  mutation TrackEmailClick($propertyId: String!, $sessionId: String) {
    trackEmailClick(propertyId: $propertyId, sessionId: $sessionId)
  }
`;

export const TRACK_WHATSAPP_CLICK = gql`
  mutation TrackWhatsAppClick($propertyId: String!, $userId: String) {
    trackWhatsAppClick(propertyId: $propertyId, userId: $userId)
  }
`;

export const TRACK_SEARCH = gql`
  mutation TrackSearch($query: String!, $userId: String) {
    trackSearch(query: $query, userId: $userId)
  }
`;
