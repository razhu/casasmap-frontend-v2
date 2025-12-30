import { gql } from "@apollo/client";

export const SEND_PROPERTY_INQUIRY = gql`
  mutation SendPropertyInquiry($input: CreateInquiryInput!) {
    sendPropertyInquiry(input: $input) {
      id
      propertyId
      name
      email
      phone
      message
      status
      createdAt
    }
  }
`;

export const UPDATE_INQUIRY_STATUS = gql`
  mutation UpdateInquiryStatus($inquiryId: String!, $status: InquiryStatus!) {
    updateInquiryStatus(inquiryId: $inquiryId, status: $status) {
      id
      status
      updatedAt
    }
  }
`;
