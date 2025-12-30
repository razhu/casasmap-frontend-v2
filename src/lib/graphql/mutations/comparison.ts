import { gql } from "@apollo/client";

export const SAVE_COMPARISON = gql`
  mutation SaveComparison($input: SaveComparisonInput!) {
    saveComparison(input: $input) {
      id
      propertyIds
      createdAt
    }
  }
`;

export const DELETE_COMPARISON = gql`
  mutation DeleteComparison($id: String!) {
    deleteComparison(id: $id)
  }
`;
