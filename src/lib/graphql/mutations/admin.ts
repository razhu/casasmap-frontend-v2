import { gql } from "@apollo/client";

export const APPROVE_PROPERTY = gql`
  mutation ApproveProperty($id: String!) {
    approveProperty(id: $id) {
      id
      status
    }
  }
`;

export const REJECT_PROPERTY = gql`
  mutation RejectProperty($id: String!, $reason: String!) {
    rejectProperty(id: $id, reason: $reason) {
      id
      status
    }
  }
`;

export const APPROVE_PAYMENT = gql`
  mutation ApprovePayment($input: ApprovePaymentInput!) {
    approvePayment(input: $input) {
      id
      status
      approvedAt
    }
  }
`;

export const REJECT_PAYMENT = gql`
  mutation RejectPayment($input: RejectPaymentInput!) {
    rejectPayment(input: $input) {
      id
      status
      rejectedReason
    }
  }
`;

export const UPDATE_SETTING = gql`
  mutation UpdateSetting($updateSettingInput: UpdateSettingInput!) {
    updateSetting(updateSettingInput: $updateSettingInput) {
      id
      key
      value
      updatedAt
    }
  }
`;

export const CREATE_SETTING = gql`
  mutation CreateSetting($createSettingInput: CreateSettingInput!) {
    createSetting(createSettingInput: $createSettingInput) {
      id
      key
      value
      dataType
      category
      description
      isPublic
      isEditable
      createdAt
    }
  }
`;

export const DELETE_SETTING = gql`
  mutation DeleteSetting($key: String!) {
    deleteSetting(key: $key) {
      id
      key
    }
  }
`;
