import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      id
      conversationId
      senderId
      receiverId
      content
      status
      readAt
      createdAt
    }
  }
`;

export const MARK_CONVERSATION_AS_READ = gql`
  mutation MarkConversationAsRead($conversationId: String!) {
    markConversationAsRead(conversationId: $conversationId)
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($messageId: String!) {
    deleteMessage(messageId: $messageId)
  }
`;

export const BLOCK_USER = gql`
  mutation BlockUser($blockedId: String!, $reason: String) {
    blockUser(blockedId: $blockedId, reason: $reason) {
      id
      blockerId
      blockedId
      reason
      createdAt
    }
  }
`;

export const UNBLOCK_USER = gql`
  mutation UnblockUser($blockedId: String!) {
    unblockUser(blockedId: $blockedId)
  }
`;

export const REPORT_MESSAGE = gql`
  mutation ReportMessage(
    $messageId: String!
    $reason: String!
    $details: String
  ) {
    reportMessage(messageId: $messageId, reason: $reason, details: $details) {
      id
      messageId
      reporterId
      reason
      details
      status
      createdAt
    }
  }
`;
