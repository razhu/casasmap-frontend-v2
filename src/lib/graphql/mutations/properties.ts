import { gql } from "@apollo/client";

export const GENERATE_PROPERTY_FLYER = gql`
  mutation GeneratePropertyFlyer($propertyId: String!) {
    generatePropertyFlyer(propertyId: $propertyId)
  }
`;

export const DELETE_PROPERTY = gql`
  mutation DeleteProperty($id: String!) {
    deleteProperty(id: $id) {
      id
      title
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation UpdateProperty($id: String!, $input: UpdatePropertyInput!) {
    updateProperty(id: $id, updatePropertyInput: $input) {
      id
      title
      titleEn
      description
      descriptionEn
      priceUS
      priceBS
      address
      latitude
      longitude
      bedrooms
      bathrooms
      totalArea
      coveredArea
      parkingSpaces
      yearBuilt
      propertyTypeId
      dealTypeId
      cityId
      stateId
      countryId
      zoneId
      furnished
      pool
      balcony
      terrace
      storage
      security
      petsAllowed
      phoneNumber
    }
  }
`;
