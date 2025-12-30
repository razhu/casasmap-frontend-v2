import { gql } from "@apollo/client";

export const ADD_FAVORITE = gql`
  mutation AddFavorite($input: AddFavoriteInput!) {
    addFavorite(input: $input) {
      id
      propertyId
      priceAlertEnabled
      notes
      createdAt
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($propertyId: String!) {
    removeFavorite(propertyId: $propertyId)
  }
`;

export const UPDATE_FAVORITE = gql`
  mutation UpdateFavorite(
    $propertyId: String!
    $priceAlertEnabled: Boolean
    $notes: String
  ) {
    updateFavorite(
      propertyId: $propertyId
      priceAlertEnabled: $priceAlertEnabled
      notes: $notes
    ) {
      id
      propertyId
      priceAlertEnabled
      notes
      updatedAt
    }
  }
`;
