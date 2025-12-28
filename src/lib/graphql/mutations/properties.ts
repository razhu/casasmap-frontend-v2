import { gql } from "@apollo/client";

export const CREATE_PROPERTY = gql`
  mutation CreateProperty($input: CreatePropertyInput!) {
    createProperty(createPropertyInput: $input) {
      id
      title
      titleEn
      description
      descriptionEn
      priceUS
      priceBS
      address
      bedrooms
      bathrooms
      totalArea
      coveredArea
      parkingSpaces
      latitude
      longitude
      status
      yearBuilt
      furnished
      pool
      balcony
      terrace
      security
      storage
      petsAllowed
      propertyTypeId
      dealTypeId
      cityId
      zoneId
      stateId
      countryId
      createdAt
    }
  }
`;
