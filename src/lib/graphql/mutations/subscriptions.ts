import { gql } from "@apollo/client";

export const CANCEL_SUBSCRIPTION = gql`
  mutation CancelSubscription($id: String!) {
    cancelSubscription(id: $id) {
      id
      userId
      plan
      status
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
`;

export const START_FREE_TRIAL = gql`
  mutation StartFreeTrial($durationDays: Float) {
    startFreeTrial(durationDays: $durationDays) {
      id
      userId
      plan
      status
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
`;
