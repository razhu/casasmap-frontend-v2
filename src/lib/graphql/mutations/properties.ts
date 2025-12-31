import { gql } from "@apollo/client";

export const GENERATE_PROPERTY_FLYER = gql`
  mutation GeneratePropertyFlyer($propertyId: String!) {
    generatePropertyFlyer(propertyId: $propertyId)
  }
`;
