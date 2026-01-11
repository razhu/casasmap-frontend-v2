import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AddFavoriteInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  priceAlertEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  propertyId: Scalars['String']['input'];
};

export type Agency = {
  __typename?: 'Agency';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  members?: Maybe<Array<User>>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  ownerId: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  verifiedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type ApprovePaymentInput = {
  paymentId: Scalars['String']['input'];
};

export type AssignUserToAgencyInput = {
  agencyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  user: User;
};

export type BlockedUser = {
  __typename?: 'BlockedUser';
  blocked?: Maybe<User>;
  blockedId: Scalars['ID']['output'];
  blocker?: Maybe<User>;
  blockerId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type City = {
  __typename?: 'City';
  id: Scalars['Int']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  stateId: Scalars['Int']['output'];
  zones?: Maybe<Array<Zone>>;
};

export type ComparePropertiesInput = {
  propertyIds: Array<Scalars['ID']['input']>;
};

export type ComparisonFeature = {
  __typename?: 'ComparisonFeature';
  name: Scalars['String']['output'];
  values: Array<Scalars['String']['output']>;
};

export type ComparisonMatrix = {
  __typename?: 'ComparisonMatrix';
  features: Array<ComparisonFeature>;
};

export enum ConfigType {
  Boolean = 'BOOLEAN',
  Float = 'FLOAT',
  Int = 'INT',
  Json = 'JSON',
  String = 'STRING'
}

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastMessageAt?: Maybe<Scalars['DateTime']['output']>;
  messages?: Maybe<Array<Message>>;
  participant1?: Maybe<User>;
  participant1Id: Scalars['ID']['output'];
  participant2?: Maybe<User>;
  participant2Id: Scalars['ID']['output'];
  propertyId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['Int']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  states?: Maybe<Array<State>>;
};

export type CreateAgencyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEmailCampaignInput = {
  content: Scalars['String']['input'];
  name: Scalars['String']['input'];
  recipientTags?: InputMaybe<Array<Scalars['String']['input']>>;
  scheduledAt?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateEmailSubscriberInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  source: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateForumCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  order?: Scalars['Int']['input'];
};

export type CreateForumReplyInput = {
  content: Scalars['String']['input'];
  topicId: Scalars['String']['input'];
};

export type CreateForumTopicInput = {
  categoryId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreatePaymentInput = {
  method: PaymentMethod;
  plan: Scalars['String']['input'];
};

export type CreatePropertyInput = {
  address: Scalars['String']['input'];
  agencyId?: InputMaybe<Scalars['String']['input']>;
  balcony?: InputMaybe<Scalars['Boolean']['input']>;
  bathrooms?: InputMaybe<Scalars['Int']['input']>;
  bedrooms?: InputMaybe<Scalars['Int']['input']>;
  cityId: Scalars['Int']['input'];
  countryId: Scalars['Int']['input'];
  coveredArea?: InputMaybe<Scalars['Float']['input']>;
  dealTypeId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  descriptionEn?: InputMaybe<Scalars['String']['input']>;
  furnished?: InputMaybe<Scalars['Boolean']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  parkingSpaces?: InputMaybe<Scalars['Int']['input']>;
  petsAllowed?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['Boolean']['input']>;
  priceBS?: InputMaybe<Scalars['Float']['input']>;
  priceUS?: InputMaybe<Scalars['Float']['input']>;
  propertyTypeId: Scalars['Int']['input'];
  security?: InputMaybe<Scalars['Boolean']['input']>;
  sponsorshipTier?: InputMaybe<SponsorshipTier>;
  stateId: Scalars['Int']['input'];
  storage?: InputMaybe<Scalars['Boolean']['input']>;
  terrace?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
  titleEn?: InputMaybe<Scalars['String']['input']>;
  totalArea?: InputMaybe<Scalars['Float']['input']>;
  yearBuilt?: InputMaybe<Scalars['Int']['input']>;
  zoneId: Scalars['Int']['input'];
};

export type CreateSavedSearchInput = {
  bathrooms?: InputMaybe<Scalars['Int']['input']>;
  bedrooms?: InputMaybe<Scalars['Int']['input']>;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  dealTypeId?: InputMaybe<Scalars['Int']['input']>;
  emailAlertsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  propertyTypeId?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  zoneId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateSettingInput = {
  category: Scalars['String']['input'];
  dataType: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isEditable?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateSubscriptionInput = {
  endDate: Scalars['String']['input'];
  plan: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

export type CreateTagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  type?: Scalars['String']['input'];
};

export type EmailCampaign = {
  __typename?: 'EmailCampaign';
  clickCount: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  openCount: Scalars['Int']['output'];
  recipientCount: Scalars['Int']['output'];
  scheduledAt?: Maybe<Scalars['DateTime']['output']>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  sentCount: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EmailStats = {
  __typename?: 'EmailStats';
  activeSubscribers: Scalars['Int']['output'];
  averageClickRate: Scalars['Float']['output'];
  averageOpenRate: Scalars['Float']['output'];
  campaignsSent: Scalars['Int']['output'];
  totalCampaigns: Scalars['Int']['output'];
  totalSubscribers: Scalars['Int']['output'];
  unsubscribed: Scalars['Int']['output'];
};

export type EmailSubscriber = {
  __typename?: 'EmailSubscriber';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastEmailOpened?: Maybe<Scalars['DateTime']['output']>;
  lastEmailSent?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  source: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  unsubscribedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type EmailSubscriberMeta = {
  __typename?: 'EmailSubscriberMeta';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type EmailSubscriberResult = {
  __typename?: 'EmailSubscriberResult';
  data: Array<EmailSubscriber>;
  meta: EmailSubscriberMeta;
};

export type FacebookLoginInput = {
  accessToken: Scalars['String']['input'];
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastPrice?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  priceAlertEnabled: Scalars['Boolean']['output'];
  property?: Maybe<Property>;
  propertyId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type ForumCategory = {
  __typename?: 'ForumCategory';
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  modifiedBy?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  topics?: Maybe<Array<ForumTopic>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ForumReply = {
  __typename?: 'ForumReply';
  author: User;
  authorId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  modifiedBy?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  topicId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ForumTopic = {
  __typename?: 'ForumTopic';
  author: User;
  authorId: Scalars['String']['output'];
  categoryId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isLocked: Scalars['Boolean']['output'];
  isPinned: Scalars['Boolean']['output'];
  modifiedBy?: Maybe<Scalars['String']['output']>;
  replies?: Maybe<Array<ForumReply>>;
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  viewCount: Scalars['Int']['output'];
};

export type GeocodeResultType = {
  __typename?: 'GeocodeResultType';
  formattedAddress: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type GoogleLoginInput = {
  token: Scalars['String']['input'];
};

export type LocationSearchResult = {
  __typename?: 'LocationSearchResult';
  cities: Array<City>;
  countries: Array<Country>;
  states: Array<State>;
  zones: Array<Zone>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MarketAnalysisInput = {
  cityId: Scalars['Int']['input'];
  dealTypeId?: InputMaybe<Scalars['Int']['input']>;
  propertyTypeId?: InputMaybe<Scalars['Int']['input']>;
};

export type MarketAnalysisReport = {
  __typename?: 'MarketAnalysisReport';
  averageArea: Scalars['Float']['output'];
  averagePriceBS: Scalars['Float']['output'];
  averagePriceUS: Scalars['Float']['output'];
  cityId: Scalars['Int']['output'];
  cityName: Scalars['String']['output'];
  maxPriceUS: Scalars['Float']['output'];
  medianPriceBS: Scalars['Float']['output'];
  medianPriceUS: Scalars['Float']['output'];
  minPriceUS: Scalars['Float']['output'];
  priceDistribution: Array<PriceDistribution>;
  pricePerSqmUS: Scalars['Float']['output'];
  propertyTypeDistribution: Array<PropertyTypeDistribution>;
  propertyTypeId?: Maybe<Scalars['Int']['output']>;
  propertyTypeName?: Maybe<Scalars['String']['output']>;
  totalProperties: Scalars['Int']['output'];
};

export type Media = {
  __typename?: 'Media';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  order: Scalars['Float']['output'];
  propertyId: Scalars['String']['output'];
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type: MediaType;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

/** Type of media file */
export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  conversationId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  propertyId?: Maybe<Scalars['ID']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  receiver?: Maybe<User>;
  receiverId: Scalars['ID']['output'];
  sender?: Maybe<User>;
  senderId: Scalars['ID']['output'];
  status: MessageStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type MessageReport = {
  __typename?: 'MessageReport';
  createdAt: Scalars['DateTime']['output'];
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  messageId: Scalars['ID']['output'];
  reason: Scalars['String']['output'];
  reporter?: Maybe<User>;
  reporterId: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum MessageStatus {
  Delivered = 'DELIVERED',
  Read = 'READ',
  Sent = 'SENT'
}

export type Mutation = {
  __typename?: 'Mutation';
  addFavorite: Favorite;
  /** Approve payment and activate subscription (admin only) */
  approvePayment: Payment;
  approveProperty: Property;
  assignUserToAgency: User;
  blockUser: BlockedUser;
  /** Cancel pending payment */
  cancelPayment: Payment;
  cancelSubscription: Subscription;
  /** Change password for authenticated user */
  changePassword: Scalars['Boolean']['output'];
  createAgency: Agency;
  createEmailCampaign: EmailCampaign;
  createEmailSubscriber: EmailSubscriber;
  createForumCategory: ForumCategory;
  createForumReply: ForumReply;
  createForumTopic: ForumTopic;
  /** Create a new payment for subscription */
  createPayment: PaymentInstructions;
  createProperty: Property;
  createSavedSearch: SavedSearch;
  createSetting: SystemConfig;
  createSubscription: Subscription;
  createSubscriptionForUser: Subscription;
  createTag: Tag;
  deleteAgency: Agency;
  deleteComparison: Scalars['Boolean']['output'];
  deleteForumCategory: ForumCategory;
  deleteForumReply: ForumReply;
  deleteForumTopic: ForumTopic;
  /** Delete image - uses configured storage provider */
  deleteImage: Scalars['Boolean']['output'];
  deleteMedia: Media;
  deleteMessage: Scalars['Boolean']['output'];
  deleteNotification: Notification;
  deleteProperty: Property;
  deleteSavedSearch: Scalars['Boolean']['output'];
  deleteSetting: SystemConfig;
  deleteTag: Tag;
  deleteUser: User;
  facebookLogin: AuthResponse;
  /** Request password reset email */
  forgotPassword: Scalars['Boolean']['output'];
  /** Generate PDF flyer for property */
  generatePropertyFlyer: Scalars['String']['output'];
  googleLogin: AuthResponse;
  login: AuthResponse;
  markAllNotificationsAsRead: Scalars['Boolean']['output'];
  markConversationAsRead: Scalars['Boolean']['output'];
  markNotificationAsRead: Notification;
  refreshToken: AuthResponse;
  register: RegisterResponse;
  /** Reject payment (admin only) */
  rejectPayment: Payment;
  rejectProperty: Property;
  removeFavorite: Scalars['Boolean']['output'];
  removeUserFromAgency: User;
  reportMessage: MessageReport;
  /** Resend verification email */
  resendVerificationEmail: Scalars['Boolean']['output'];
  /** Reset password with token from email */
  resetPassword: Scalars['Boolean']['output'];
  saveComparison: PropertyComparison;
  sendEmailCampaign: EmailCampaign;
  sendMessage: Message;
  sendPropertyAlerts: PropertyAlertResult;
  startFreeTrial: Subscription;
  subscribe: Subscription;
  toggleSavedSearchAlerts: SavedSearch;
  trackEmailClick: Scalars['Boolean']['output'];
  trackPhoneClick: Scalars['Boolean']['output'];
  trackPropertyClick: Scalars['Boolean']['output'];
  trackPropertyView: Scalars['Boolean']['output'];
  trackSearch: Scalars['Boolean']['output'];
  trackShare: Scalars['Boolean']['output'];
  trackWhatsAppClick: Scalars['Boolean']['output'];
  unblockUser: Scalars['Boolean']['output'];
  unsubscribeEmail: EmailSubscriber;
  updateAgency: Agency;
  updateFavorite: Favorite;
  updateMedia: Media;
  updateProfile: Profile;
  updateProperty: Property;
  updateSavedSearch: SavedSearch;
  updateSetting: SystemConfig;
  updateTag: Tag;
  updateUsername: User;
  /** Upload image (base64 string) - uses configured storage provider */
  uploadImage: Scalars['String']['output'];
  uploadMedia: UploadResponse;
  /** Upload payment receipt (for manual payments) */
  uploadReceipt: Payment;
  /** Verify email with token from email */
  verifyEmail: AuthResponse;
};


export type MutationAddFavoriteArgs = {
  input: AddFavoriteInput;
};


export type MutationApprovePaymentArgs = {
  input: ApprovePaymentInput;
};


export type MutationApprovePropertyArgs = {
  id: Scalars['String']['input'];
};


export type MutationAssignUserToAgencyArgs = {
  assignUserToAgencyInput: AssignUserToAgencyInput;
};


export type MutationBlockUserArgs = {
  blockedId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCancelPaymentArgs = {
  paymentId: Scalars['String']['input'];
};


export type MutationCancelSubscriptionArgs = {
  id: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateAgencyArgs = {
  createAgencyInput: CreateAgencyInput;
};


export type MutationCreateEmailCampaignArgs = {
  createEmailCampaignInput: CreateEmailCampaignInput;
};


export type MutationCreateEmailSubscriberArgs = {
  createEmailSubscriberInput: CreateEmailSubscriberInput;
};


export type MutationCreateForumCategoryArgs = {
  createForumCategoryInput: CreateForumCategoryInput;
};


export type MutationCreateForumReplyArgs = {
  createForumReplyInput: CreateForumReplyInput;
};


export type MutationCreateForumTopicArgs = {
  createForumTopicInput: CreateForumTopicInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreatePropertyArgs = {
  createPropertyInput: CreatePropertyInput;
};


export type MutationCreateSavedSearchArgs = {
  input: CreateSavedSearchInput;
};


export type MutationCreateSettingArgs = {
  createSettingInput: CreateSettingInput;
};


export type MutationCreateSubscriptionArgs = {
  createSubscriptionInput: CreateSubscriptionInput;
};


export type MutationCreateSubscriptionForUserArgs = {
  createSubscriptionInput: CreateSubscriptionInput;
  userId: Scalars['String']['input'];
};


export type MutationCreateTagArgs = {
  createTagInput: CreateTagInput;
};


export type MutationDeleteAgencyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteComparisonArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteForumCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteForumReplyArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteForumTopicArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteImageArgs = {
  publicId: Scalars['String']['input'];
};


export type MutationDeleteMediaArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['String']['input'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePropertyArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSavedSearchArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSettingArgs = {
  key: Scalars['String']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationFacebookLoginArgs = {
  facebookLoginInput: FacebookLoginInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationGeneratePropertyFlyerArgs = {
  propertyId: Scalars['String']['input'];
};


export type MutationGoogleLoginArgs = {
  googleLoginInput: GoogleLoginInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationMarkConversationAsReadArgs = {
  conversationId: Scalars['String']['input'];
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationRejectPaymentArgs = {
  input: RejectPaymentInput;
};


export type MutationRejectPropertyArgs = {
  id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationRemoveFavoriteArgs = {
  propertyId: Scalars['String']['input'];
};


export type MutationRemoveUserFromAgencyArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationReportMessageArgs = {
  details?: InputMaybe<Scalars['String']['input']>;
  messageId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationResendVerificationEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSaveComparisonArgs = {
  input: SaveComparisonInput;
};


export type MutationSendEmailCampaignArgs = {
  id: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationSendPropertyAlertsArgs = {
  propertyId: Scalars['String']['input'];
};


export type MutationStartFreeTrialArgs = {
  durationDays?: Scalars['Float']['input'];
};


export type MutationSubscribeArgs = {
  createSubscriptionInput: CreateSubscriptionInput;
  paymentIntentId: Scalars['String']['input'];
};


export type MutationToggleSavedSearchAlertsArgs = {
  enabled: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
};


export type MutationTrackEmailClickArgs = {
  propertyId: Scalars['String']['input'];
  sessionId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTrackPhoneClickArgs = {
  propertyId: Scalars['String']['input'];
  sessionId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTrackPropertyClickArgs = {
  propertyId: Scalars['String']['input'];
};


export type MutationTrackPropertyViewArgs = {
  propertyId: Scalars['String']['input'];
  sessionId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTrackSearchArgs = {
  query: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTrackShareArgs = {
  platform: SocialPlatform;
  propertyId: Scalars['String']['input'];
};


export type MutationTrackWhatsAppClickArgs = {
  propertyId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUnblockUserArgs = {
  blockedId: Scalars['String']['input'];
};


export type MutationUnsubscribeEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateAgencyArgs = {
  id: Scalars['ID']['input'];
  updateAgencyInput: UpdateAgencyInput;
};


export type MutationUpdateFavoriteArgs = {
  notes?: InputMaybe<Scalars['String']['input']>;
  priceAlertEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  propertyId: Scalars['String']['input'];
};


export type MutationUpdateMediaArgs = {
  updateMediaInput: UpdateMediaInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};


export type MutationUpdatePropertyArgs = {
  id: Scalars['String']['input'];
  updatePropertyInput: UpdatePropertyInput;
};


export type MutationUpdateSavedSearchArgs = {
  id: Scalars['String']['input'];
  input: UpdateSavedSearchInput;
};


export type MutationUpdateSettingArgs = {
  updateSettingInput: UpdateSettingInput;
};


export type MutationUpdateTagArgs = {
  id: Scalars['String']['input'];
  updateTagInput: UpdateTagInput;
};


export type MutationUpdateUsernameArgs = {
  username: Scalars['String']['input'];
};


export type MutationUploadImageArgs = {
  folder?: InputMaybe<Scalars['String']['input']>;
  image: Scalars['String']['input'];
};


export type MutationUploadMediaArgs = {
  uploadMediaInput: UploadMediaInput;
};


export type MutationUploadReceiptArgs = {
  input: UploadReceiptInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type NotificationMeta = {
  __typename?: 'NotificationMeta';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type NotificationResult = {
  __typename?: 'NotificationResult';
  data: Array<Notification>;
  meta: NotificationMeta;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  approvedAt?: Maybe<Scalars['DateTime']['output']>;
  approvedBy?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  method: PaymentMethod;
  plan: Scalars['String']['output'];
  receiptUrl?: Maybe<Scalars['String']['output']>;
  rejectedReason?: Maybe<Scalars['String']['output']>;
  status: PaymentStatus;
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type PaymentInstructions = {
  __typename?: 'PaymentInstructions';
  instructions?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  paymentId: Scalars['String']['output'];
  redirectUrl?: Maybe<Scalars['String']['output']>;
  status: PaymentStatus;
  success: Scalars['Boolean']['output'];
};

/** Available payment methods */
export enum PaymentMethod {
  ManualTransfer = 'MANUAL_TRANSFER',
  MercadoPago = 'MERCADO_PAGO',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE'
}

/** Payment status */
export enum PaymentStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED'
}

export type PlaceResultType = {
  __typename?: 'PlaceResultType';
  address: Scalars['String']['output'];
  id: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type PopularSearch = {
  __typename?: 'PopularSearch';
  count: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lastSearched: Scalars['DateTime']['output'];
  searchQuery: Scalars['String']['output'];
};

export type PriceDistribution = {
  __typename?: 'PriceDistribution';
  count: Scalars['Int']['output'];
  percentage: Scalars['Float']['output'];
  range: Scalars['String']['output'];
};

export type PriceHistoryInput = {
  cityId?: InputMaybe<Scalars['Int']['input']>;
  months?: Scalars['Int']['input'];
  zoneId?: InputMaybe<Scalars['Int']['input']>;
};

export type PriceHistoryPoint = {
  __typename?: 'PriceHistoryPoint';
  averagePriceBS: Scalars['Float']['output'];
  averagePriceUS: Scalars['Float']['output'];
  month: Scalars['String']['output'];
  propertyCount: Scalars['Int']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  modifiedBy?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  pictureUrl?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type Property = {
  __typename?: 'Property';
  address: Scalars['String']['output'];
  agencyId?: Maybe<Scalars['String']['output']>;
  analytics?: Maybe<PropertyAnalytics>;
  availableFrom?: Maybe<Scalars['DateTime']['output']>;
  balcony?: Maybe<Scalars['Boolean']['output']>;
  bathrooms?: Maybe<Scalars['Int']['output']>;
  bedrooms?: Maybe<Scalars['Int']['output']>;
  city?: Maybe<City>;
  cityId: Scalars['Int']['output'];
  condition?: Maybe<Scalars['String']['output']>;
  cooling?: Maybe<Scalars['String']['output']>;
  countryId: Scalars['Int']['output'];
  coveredArea?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  dealTypeId: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  descriptionEn: Scalars['String']['output'];
  displayMap: Scalars['Boolean']['output'];
  displayPrice: Scalars['Boolean']['output'];
  displayProperty: Scalars['Boolean']['output'];
  elevators?: Maybe<Scalars['Int']['output']>;
  floorPlanUrl?: Maybe<Scalars['String']['output']>;
  furnished?: Maybe<Scalars['Boolean']['output']>;
  heating?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastPriceChange?: Maybe<Scalars['DateTime']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  maintenanceFee?: Maybe<Scalars['Float']['output']>;
  media?: Maybe<Array<Media>>;
  modifiedBy?: Maybe<Scalars['String']['output']>;
  parkingSpaces?: Maybe<Scalars['Int']['output']>;
  petsAllowed?: Maybe<Scalars['Boolean']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  pool?: Maybe<Scalars['Boolean']['output']>;
  priceBS?: Maybe<Scalars['Float']['output']>;
  priceUS?: Maybe<Scalars['Float']['output']>;
  priority: Scalars['String']['output'];
  propertyCondition?: Maybe<Scalars['String']['output']>;
  propertyTax?: Maybe<Scalars['Float']['output']>;
  propertyType?: Maybe<PropertyType>;
  propertyTypeId: Scalars['Int']['output'];
  renovationYear?: Maybe<Scalars['Int']['output']>;
  security?: Maybe<Scalars['Boolean']['output']>;
  slug: Scalars['String']['output'];
  slugEn: Scalars['String']['output'];
  sponsorshipEnd?: Maybe<Scalars['DateTime']['output']>;
  sponsorshipStart?: Maybe<Scalars['DateTime']['output']>;
  sponsorshipTier: Scalars['String']['output'];
  stateId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  storage?: Maybe<Scalars['Boolean']['output']>;
  stories?: Maybe<Scalars['Int']['output']>;
  terrace?: Maybe<Scalars['Boolean']['output']>;
  title: Scalars['String']['output'];
  titleEn: Scalars['String']['output'];
  totalArea?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
  virtualTourUrl?: Maybe<Scalars['String']['output']>;
  yearBuilt?: Maybe<Scalars['Int']['output']>;
  zoneId: Scalars['Int']['output'];
};

export type PropertyAlertResult = {
  __typename?: 'PropertyAlertResult';
  emailsSent: Scalars['Int']['output'];
  propertyId: Scalars['String']['output'];
  sentAt: Scalars['DateTime']['output'];
};

export type PropertyAnalytics = {
  __typename?: 'PropertyAnalytics';
  averageViewTime?: Maybe<Scalars['Int']['output']>;
  clicks: Scalars['Int']['output'];
  conversionRate: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  emailClicks: Scalars['Int']['output'];
  favorites: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  inquiries: Scalars['Int']['output'];
  lastViewedAt?: Maybe<Scalars['DateTime']['output']>;
  phoneClicks: Scalars['Int']['output'];
  propertyId: Scalars['ID']['output'];
  qrCodeScans: Scalars['Int']['output'];
  shares: Scalars['Int']['output'];
  shortCodeViews: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  views: Scalars['Int']['output'];
  whatsappClicks: Scalars['Int']['output'];
};

export type PropertyComparison = {
  __typename?: 'PropertyComparison';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  propertyIds: Array<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type PropertyComparisonResult = {
  __typename?: 'PropertyComparisonResult';
  matrix: ComparisonMatrix;
  properties: Array<Property>;
};

export type PropertyFiltersInput = {
  bathrooms?: InputMaybe<Scalars['Int']['input']>;
  bedrooms?: InputMaybe<Scalars['Int']['input']>;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  dealTypeId?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  propertyTypeId?: InputMaybe<Scalars['Int']['input']>;
  zoneId?: InputMaybe<Scalars['Int']['input']>;
};

export type PropertyLimits = {
  __typename?: 'PropertyLimits';
  /** Property limit (number or "unlimited") */
  limit: Scalars['String']['output'];
  plan: Scalars['String']['output'];
  /** Remaining properties (number or "unlimited") */
  remaining: Scalars['String']['output'];
  resetsAt?: Maybe<Scalars['DateTime']['output']>;
  used: Scalars['Int']['output'];
};

export type PropertyMeta = {
  __typename?: 'PropertyMeta';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PropertyResult = {
  __typename?: 'PropertyResult';
  data: Array<Property>;
  meta: PropertyMeta;
};

export type PropertyType = {
  __typename?: 'PropertyType';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type PropertyTypeDistribution = {
  __typename?: 'PropertyTypeDistribution';
  averagePrice: Scalars['Float']['output'];
  count: Scalars['Int']['output'];
  percentage: Scalars['Float']['output'];
  propertyType: Scalars['String']['output'];
};

export type PropertyViewHistory = {
  __typename?: 'PropertyViewHistory';
  clicks: Scalars['Int']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  shares: Scalars['Int']['output'];
  uniqueViews: Scalars['Int']['output'];
  views: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  agencies: Array<Agency>;
  agency: Agency;
  /** Get all payments (admin only) */
  allPayments: Array<Payment>;
  /** Get available payment methods */
  availablePaymentMethods: Array<Scalars['String']['output']>;
  cities: Array<City>;
  compareProperties: PropertyComparisonResult;
  conversationMessages: Array<Message>;
  countries: Array<Country>;
  currentSubscription?: Maybe<Subscription>;
  emailCampaign: EmailCampaign;
  emailCampaigns: Array<EmailCampaign>;
  emailStats: EmailStats;
  emailSubscribers: EmailSubscriberResult;
  forumCategories: Array<ForumCategory>;
  forumReplies: Array<ForumReply>;
  forumTopic: ForumTopic;
  forumTopics: Array<ForumTopic>;
  generateShareUrls: Array<ShareUrl>;
  /** Convert address to coordinates */
  geocodeAddress: GeocodeResultType;
  isFavorited: Scalars['Boolean']['output'];
  marketAnalysis: MarketAnalysisReport;
  me: User;
  myBlockedUsers: Array<BlockedUser>;
  myComparisons: Array<PropertyComparison>;
  myConversations: Array<Conversation>;
  myFavorites: Array<Favorite>;
  /** Get current user payments */
  myPayments: Array<Payment>;
  myProperties: PropertyResult;
  mySavedSearches: Array<SavedSearch>;
  notifications: NotificationResult;
  /** Get payment by ID */
  payment: Payment;
  popularSearches: Array<PopularSearch>;
  priceHistory: Array<PriceHistoryPoint>;
  properties: PropertyResult;
  property: Property;
  propertyAnalytics: PropertyAnalytics;
  propertyBySlug: Property;
  propertyLimits: PropertyLimits;
  propertyMedia: Array<Media>;
  propertyViewHistory: Array<PropertyViewHistory>;
  publicSettings: Array<SystemConfig>;
  /** Convert coordinates to address */
  reverseGeocode: Scalars['String']['output'];
  savedSearch: SavedSearch;
  searchLocations: LocationSearchResult;
  /** Search places with autocomplete */
  searchPlaces: Array<PlaceResultType>;
  searchProperties: PropertyResult;
  setting: SystemConfig;
  settings: Array<SystemConfig>;
  settingsByCategory: Array<SystemConfig>;
  states: Array<State>;
  tag: Tag;
  tags: Array<Tag>;
  unreadNotificationsCount: Scalars['Int']['output'];
  user: User;
  userStats: UserStats;
  userSubscriptions: Array<Subscription>;
  users: Array<User>;
  /** Validate if coordinates are within Bolivia */
  validateBoliviaCoordinates: Scalars['Boolean']['output'];
  /** Validate reset password token */
  validateResetToken: Scalars['Boolean']['output'];
  /** Validate email verification token */
  validateVerificationToken: Scalars['Boolean']['output'];
  zones: Array<Zone>;
};


export type QueryAgencyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAllPaymentsArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCitiesArgs = {
  stateId: Scalars['Int']['input'];
};


export type QueryComparePropertiesArgs = {
  input: ComparePropertiesInput;
};


export type QueryConversationMessagesArgs = {
  conversationId: Scalars['String']['input'];
};


export type QueryEmailCampaignArgs = {
  id: Scalars['String']['input'];
};


export type QueryEmailSubscribersArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryForumRepliesArgs = {
  topicId: Scalars['String']['input'];
};


export type QueryForumTopicArgs = {
  id: Scalars['String']['input'];
};


export type QueryForumTopicsArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryGenerateShareUrlsArgs = {
  propertyId: Scalars['String']['input'];
};


export type QueryGeocodeAddressArgs = {
  address: Scalars['String']['input'];
};


export type QueryIsFavoritedArgs = {
  propertyId: Scalars['String']['input'];
};


export type QueryMarketAnalysisArgs = {
  input: MarketAnalysisInput;
};


export type QueryMyPropertiesArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryNotificationsArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryPaymentArgs = {
  id: Scalars['String']['input'];
};


export type QueryPopularSearchesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPriceHistoryArgs = {
  input: PriceHistoryInput;
};


export type QueryPropertiesArgs = {
  filters?: InputMaybe<PropertyFiltersInput>;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryPropertyArgs = {
  id: Scalars['String']['input'];
};


export type QueryPropertyAnalyticsArgs = {
  propertyId: Scalars['String']['input'];
};


export type QueryPropertyBySlugArgs = {
  locale?: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};


export type QueryPropertyMediaArgs = {
  propertyId: Scalars['String']['input'];
};


export type QueryPropertyViewHistoryArgs = {
  endDate: Scalars['DateTime']['input'];
  propertyId: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
};


export type QueryReverseGeocodeArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};


export type QuerySavedSearchArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchLocationsArgs = {
  query: Scalars['String']['input'];
};


export type QuerySearchPlacesArgs = {
  query: Scalars['String']['input'];
};


export type QuerySearchPropertiesArgs = {
  input: SearchPropertiesInput;
};


export type QuerySettingArgs = {
  key: Scalars['String']['input'];
};


export type QuerySettingsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySettingsByCategoryArgs = {
  category: Scalars['String']['input'];
};


export type QueryStatesArgs = {
  countryId: Scalars['Int']['input'];
};


export type QueryTagArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryValidateBoliviaCoordinatesArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};


export type QueryValidateResetTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryValidateVerificationTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryZonesArgs = {
  cityId: Scalars['Int']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type RejectPaymentInput = {
  paymentId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type SaveComparisonInput = {
  propertyIds: Array<Scalars['ID']['input']>;
};

export type SavedSearch = {
  __typename?: 'SavedSearch';
  alertsEnabled: Scalars['Boolean']['output'];
  bathrooms?: Maybe<Scalars['Int']['output']>;
  bedrooms?: Maybe<Scalars['Int']['output']>;
  cityId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dealTypeId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  lastAlertAt?: Maybe<Scalars['DateTime']['output']>;
  maxPrice?: Maybe<Scalars['Int']['output']>;
  minPrice?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  propertyTypeId?: Maybe<Scalars['Int']['output']>;
  query?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
  zoneId?: Maybe<Scalars['Int']['output']>;
};

export type SearchPropertiesInput = {
  filters?: InputMaybe<PropertyFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type SendMessageInput = {
  content: Scalars['String']['input'];
  conversationId?: InputMaybe<Scalars['String']['input']>;
  propertyId?: InputMaybe<Scalars['String']['input']>;
  receiverId: Scalars['String']['input'];
};

export type ShareUrl = {
  __typename?: 'ShareUrl';
  platform: SocialPlatform;
  url: Scalars['String']['output'];
};

export enum SocialPlatform {
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Linkedin = 'LINKEDIN',
  Telegram = 'TELEGRAM',
  Twitter = 'TWITTER',
  Whatsapp = 'WHATSAPP'
}

export enum SponsorshipTier {
  Basic = 'BASIC',
  None = 'NONE',
  Premium = 'PREMIUM',
  PremiumPlus = 'PREMIUM_PLUS'
}

export type State = {
  __typename?: 'State';
  cities?: Maybe<Array<City>>;
  countryId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  createdAt: Scalars['DateTime']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  plan: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type SystemConfig = {
  __typename?: 'SystemConfig';
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  dataType: ConfigType;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isEditable: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateAgencyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMediaInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePropertyInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  agencyId?: InputMaybe<Scalars['String']['input']>;
  balcony?: InputMaybe<Scalars['Boolean']['input']>;
  bathrooms?: InputMaybe<Scalars['Int']['input']>;
  bedrooms?: InputMaybe<Scalars['Int']['input']>;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  countryId?: InputMaybe<Scalars['Int']['input']>;
  coveredArea?: InputMaybe<Scalars['Float']['input']>;
  dealTypeId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  descriptionEn?: InputMaybe<Scalars['String']['input']>;
  furnished?: InputMaybe<Scalars['Boolean']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  parkingSpaces?: InputMaybe<Scalars['Int']['input']>;
  petsAllowed?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  pool?: InputMaybe<Scalars['Boolean']['input']>;
  priceBS?: InputMaybe<Scalars['Float']['input']>;
  priceUS?: InputMaybe<Scalars['Float']['input']>;
  propertyTypeId?: InputMaybe<Scalars['Int']['input']>;
  security?: InputMaybe<Scalars['Boolean']['input']>;
  sponsorshipTier?: InputMaybe<SponsorshipTier>;
  stateId?: InputMaybe<Scalars['Int']['input']>;
  storage?: InputMaybe<Scalars['Boolean']['input']>;
  terrace?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  titleEn?: InputMaybe<Scalars['String']['input']>;
  totalArea?: InputMaybe<Scalars['Float']['input']>;
  yearBuilt?: InputMaybe<Scalars['Int']['input']>;
  zoneId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateSavedSearchInput = {
  bathrooms?: InputMaybe<Scalars['Int']['input']>;
  bedrooms?: InputMaybe<Scalars['Int']['input']>;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  dealTypeId?: InputMaybe<Scalars['Int']['input']>;
  emailAlertsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  propertyTypeId?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  zoneId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateSettingInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type UpdateTagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UploadMediaInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  propertyId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type: MediaType;
};

export type UploadReceiptInput = {
  paymentId: Scalars['String']['input'];
  receiptUrl: Scalars['String']['input'];
};

export type UploadResponse = {
  __typename?: 'UploadResponse';
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  type: MediaType;
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isVerified: Scalars['Boolean']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedBy?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  role: Role;
  roleId: Scalars['Int']['output'];
  sessionToken?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  subscriptions?: Maybe<Array<Subscription>>;
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type UserStats = {
  __typename?: 'UserStats';
  propertiesCount: Scalars['Int']['output'];
  reviewsCount: Scalars['Int']['output'];
  savedPropertiesCount: Scalars['Int']['output'];
};

export type Zone = {
  __typename?: 'Zone';
  cityId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type TestConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type TestConnectionQuery = { __typename: 'Query' };

export type ApprovePropertyMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ApprovePropertyMutation = { __typename?: 'Mutation', approveProperty: { __typename?: 'Property', id: string, status: string } };

export type RejectPropertyMutationVariables = Exact<{
  id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
}>;


export type RejectPropertyMutation = { __typename?: 'Mutation', rejectProperty: { __typename?: 'Property', id: string, status: string } };

export type ApprovePaymentMutationVariables = Exact<{
  input: ApprovePaymentInput;
}>;


export type ApprovePaymentMutation = { __typename?: 'Mutation', approvePayment: { __typename?: 'Payment', id: string, status: PaymentStatus, approvedAt?: any | null } };

export type RejectPaymentMutationVariables = Exact<{
  input: RejectPaymentInput;
}>;


export type RejectPaymentMutation = { __typename?: 'Mutation', rejectPayment: { __typename?: 'Payment', id: string, status: PaymentStatus, rejectedReason?: string | null } };

export type UpdateSettingMutationVariables = Exact<{
  updateSettingInput: UpdateSettingInput;
}>;


export type UpdateSettingMutation = { __typename?: 'Mutation', updateSetting: { __typename?: 'SystemConfig', id: string, key: string, value: string, updatedAt: any } };

export type CreateSettingMutationVariables = Exact<{
  createSettingInput: CreateSettingInput;
}>;


export type CreateSettingMutation = { __typename?: 'Mutation', createSetting: { __typename?: 'SystemConfig', id: string, key: string, value: string, dataType: ConfigType, category: string, description?: string | null, isPublic: boolean, isEditable: boolean, createdAt: any } };

export type DeleteSettingMutationVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type DeleteSettingMutation = { __typename?: 'Mutation', deleteSetting: { __typename?: 'SystemConfig', id: string, key: string } };

export type TrackPropertyViewMutationVariables = Exact<{
  propertyId: Scalars['String']['input'];
  sessionId?: InputMaybe<Scalars['String']['input']>;
}>;


export type TrackPropertyViewMutation = { __typename?: 'Mutation', trackPropertyView: boolean };

export type TrackPropertyClickMutationVariables = Exact<{
  propertyId: Scalars['String']['input'];
}>;


export type TrackPropertyClickMutation = { __typename?: 'Mutation', trackPropertyClick: boolean };

export type TrackPhoneClickMutationVariables = Exact<{
  propertyId: Scalars['String']['input'];
  sessionId?: InputMaybe<Scalars['String']['input']>;
}>;


export type TrackPhoneClickMutation = { __typename?: 'Mutation', trackPhoneClick: boolean };

export type TrackEmailClickMutationVariables = Exact<{
  propertyId: Scalars['String']['input'];
  sessionId?: InputMaybe<Scalars['String']['input']>;
}>;


export type TrackEmailClickMutation = { __typename?: 'Mutation', trackEmailClick: boolean };

export type TrackWhatsAppClickMutationVariables = Exact<{
  propertyId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type TrackWhatsAppClickMutation = { __typename?: 'Mutation', trackWhatsAppClick: boolean };

export type TrackSearchMutationVariables = Exact<{
  query: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type TrackSearchMutation = { __typename?: 'Mutation', trackSearch: boolean };

export type SaveComparisonMutationVariables = Exact<{
  input: SaveComparisonInput;
}>;


export type SaveComparisonMutation = { __typename?: 'Mutation', saveComparison: { __typename?: 'PropertyComparison', id: string, propertyIds: Array<string>, createdAt: any } };

export type DeleteComparisonMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteComparisonMutation = { __typename?: 'Mutation', deleteComparison: boolean };

export type AddFavoriteMutationVariables = Exact<{
  input: AddFavoriteInput;
}>;


export type AddFavoriteMutation = { __typename?: 'Mutation', addFavorite: { __typename?: 'Favorite', id: string, propertyId: string, priceAlertEnabled: boolean, notes?: string | null, createdAt: any } };

export type RemoveFavoriteMutationVariables = Exact<{
  propertyId: Scalars['String']['input'];
}>;


export type RemoveFavoriteMutation = { __typename?: 'Mutation', removeFavorite: boolean };

export type UpdateFavoriteMutationVariables = Exact<{
  propertyId: Scalars['String']['input'];
  priceAlertEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateFavoriteMutation = { __typename?: 'Mutation', updateFavorite: { __typename?: 'Favorite', id: string, propertyId: string, priceAlertEnabled: boolean, notes?: string | null, updatedAt: any } };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: string, conversationId: string, senderId: string, receiverId: string, content: string, status: MessageStatus, readAt?: any | null, createdAt: any } };

export type MarkConversationAsReadMutationVariables = Exact<{
  conversationId: Scalars['String']['input'];
}>;


export type MarkConversationAsReadMutation = { __typename?: 'Mutation', markConversationAsRead: boolean };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['String']['input'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: boolean };

export type BlockUserMutationVariables = Exact<{
  blockedId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser: { __typename?: 'BlockedUser', id: string, blockerId: string, blockedId: string, reason?: string | null, createdAt: any } };

export type UnblockUserMutationVariables = Exact<{
  blockedId: Scalars['String']['input'];
}>;


export type UnblockUserMutation = { __typename?: 'Mutation', unblockUser: boolean };

export type ReportMessageMutationVariables = Exact<{
  messageId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  details?: InputMaybe<Scalars['String']['input']>;
}>;


export type ReportMessageMutation = { __typename?: 'Mutation', reportMessage: { __typename?: 'MessageReport', id: string, messageId: string, reporterId: string, reason: string, details?: string | null, status: string, createdAt: any } };

export type MarkNotificationAsReadMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: { __typename?: 'Notification', id: string, read: boolean, readAt?: any | null } };

export type MarkAllNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsAsReadMutation = { __typename?: 'Mutation', markAllNotificationsAsRead: boolean };

export type DeleteNotificationMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteNotification: { __typename?: 'Notification', id: string } };

export type GeneratePropertyFlyerMutationVariables = Exact<{
  propertyId: Scalars['String']['input'];
}>;


export type GeneratePropertyFlyerMutation = { __typename?: 'Mutation', generatePropertyFlyer: string };

export type DeletePropertyMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePropertyMutation = { __typename?: 'Mutation', deleteProperty: { __typename?: 'Property', id: string, title: string } };

export type UpdatePropertyMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdatePropertyInput;
}>;


export type UpdatePropertyMutation = { __typename?: 'Mutation', updateProperty: { __typename?: 'Property', id: string, title: string, titleEn: string, description: string, descriptionEn: string, priceUS?: number | null, priceBS?: number | null, address: string, latitude?: number | null, longitude?: number | null, bedrooms?: number | null, bathrooms?: number | null, totalArea?: number | null, coveredArea?: number | null, parkingSpaces?: number | null, yearBuilt?: number | null, propertyTypeId: number, dealTypeId: number, cityId: number, stateId: number, countryId: number, zoneId: number, furnished?: boolean | null, pool?: boolean | null, balcony?: boolean | null, terrace?: boolean | null, storage?: boolean | null, security?: boolean | null, petsAllowed?: boolean | null, phoneNumber?: string | null } };

export type CreateSavedSearchMutationVariables = Exact<{
  input: CreateSavedSearchInput;
}>;


export type CreateSavedSearchMutation = { __typename?: 'Mutation', createSavedSearch: { __typename?: 'SavedSearch', id: string, name: string, query?: string | null, minPrice?: number | null, maxPrice?: number | null, bedrooms?: number | null, bathrooms?: number | null, propertyTypeId?: number | null, dealTypeId?: number | null, cityId?: number | null, zoneId?: number | null, alertsEnabled: boolean, createdAt: any } };

export type UpdateSavedSearchMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateSavedSearchInput;
}>;


export type UpdateSavedSearchMutation = { __typename?: 'Mutation', updateSavedSearch: { __typename?: 'SavedSearch', id: string, name: string, alertsEnabled: boolean, updatedAt: any } };

export type DeleteSavedSearchMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteSavedSearchMutation = { __typename?: 'Mutation', deleteSavedSearch: boolean };

export type ToggleSavedSearchAlertsMutationVariables = Exact<{
  id: Scalars['String']['input'];
  enabled: Scalars['Boolean']['input'];
}>;


export type ToggleSavedSearchAlertsMutation = { __typename?: 'Mutation', toggleSavedSearchAlerts: { __typename?: 'SavedSearch', id: string, alertsEnabled: boolean, updatedAt: any } };

export type CancelSubscriptionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CancelSubscriptionMutation = { __typename?: 'Mutation', cancelSubscription: { __typename?: 'Subscription', id: string, userId: string, plan: string, status: string, startDate: any, endDate: any, createdAt: any, updatedAt: any } };

export type StartFreeTrialMutationVariables = Exact<{
  durationDays?: InputMaybe<Scalars['Float']['input']>;
}>;


export type StartFreeTrialMutation = { __typename?: 'Mutation', startFreeTrial: { __typename?: 'Subscription', id: string, userId: string, plan: string, status: string, startDate: any, endDate: any, createdAt: any, updatedAt: any } };

export type AdminUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, username?: string | null, status: string, createdAt: any, role: { __typename?: 'Role', id: number, name: string }, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, pictureUrl?: string | null } | null, subscriptions?: Array<{ __typename?: 'Subscription', id: string, plan: string, status: string, endDate: any }> | null }> };

export type AdminPropertiesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminPropertiesQuery = { __typename?: 'Query', properties: { __typename?: 'PropertyResult', data: Array<{ __typename?: 'Property', id: string, title: string, status: string, priceUS?: number | null, createdAt: any, user?: { __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null } | null } | null }>, meta: { __typename?: 'PropertyMeta', total: number, page: number, limit: number } } };

export type AdminPaymentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminPaymentsQuery = { __typename?: 'Query', allPayments: Array<{ __typename?: 'Payment', id: string, userId: string, amount: number, currency: string, method: PaymentMethod, status: PaymentStatus, plan: string, createdAt: any, approvedAt?: any | null }> };

export type AdminSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminSettingsQuery = { __typename?: 'Query', settings: Array<{ __typename?: 'SystemConfig', id: string, key: string, value: string, dataType: ConfigType, category: string, description?: string | null, isPublic: boolean, isEditable: boolean, createdAt: any, updatedAt: any }> };

export type PropertyAnalyticsQueryVariables = Exact<{
  propertyId: Scalars['String']['input'];
}>;


export type PropertyAnalyticsQuery = { __typename?: 'Query', propertyAnalytics: { __typename?: 'PropertyAnalytics', id: string, propertyId: string, views: number, clicks: number, shares: number, favorites: number, inquiries: number, phoneClicks: number, emailClicks: number, whatsappClicks: number, shortCodeViews: number, qrCodeScans: number, lastViewedAt?: any | null, averageViewTime?: number | null, conversionRate: number, createdAt: any, updatedAt: any } };

export type PropertyViewHistoryQueryVariables = Exact<{
  propertyId: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;


export type PropertyViewHistoryQuery = { __typename?: 'Query', propertyViewHistory: Array<{ __typename?: 'PropertyViewHistory', id: string, date: any, views: number, uniqueViews: number, clicks: number, shares: number }> };

export type PopularSearchesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PopularSearchesQuery = { __typename?: 'Query', popularSearches: Array<{ __typename?: 'PopularSearch', id: string, searchQuery: string, count: number, lastSearched: any }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, username?: string | null, roleId: number, status: string, isVerified: boolean, createdAt: any, role: { __typename?: 'Role', id: number, name: string }, profile?: { __typename?: 'Profile', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, pictureUrl?: string | null, bio?: string | null, birthdate?: any | null } | null, subscriptions?: Array<{ __typename?: 'Subscription', id: string, plan: string, status: string, startDate: any, endDate: any }> | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', access_token: string, user: { __typename?: 'User', id: string, email: string, username?: string | null, role: { __typename?: 'Role', id: number, name: string }, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null, pictureUrl?: string | null } | null, subscriptions?: Array<{ __typename?: 'Subscription', id: string, plan: string, status: string, startDate: any, endDate: any }> | null } } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', success: boolean, message: string } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type UpdateProfileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, pictureUrl?: string | null, bio?: string | null, birthdate?: any | null } };

export type UpdateUsernameMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UpdateUsernameMutation = { __typename?: 'Mutation', updateUsername: { __typename?: 'User', id: string, email: string, username?: string | null, role: { __typename?: 'Role', id: number, name: string }, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null } | null } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthResponse', access_token: string, user: { __typename?: 'User', id: string, email: string, username?: string | null, role: { __typename?: 'Role', id: number, name: string }, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null } | null, subscriptions?: Array<{ __typename?: 'Subscription', id: string, plan: string, status: string, startDate: any, endDate: any }> | null } } };

export type GoogleLoginMutationVariables = Exact<{
  googleLoginInput: GoogleLoginInput;
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'AuthResponse', access_token: string, user: { __typename?: 'User', id: string, email: string, username?: string | null, role: { __typename?: 'Role', id: number, name: string }, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null, pictureUrl?: string | null } | null, subscriptions?: Array<{ __typename?: 'Subscription', id: string, plan: string, status: string, startDate: any, endDate: any }> | null } } };

export type FacebookLoginMutationVariables = Exact<{
  facebookLoginInput: FacebookLoginInput;
}>;


export type FacebookLoginMutation = { __typename?: 'Mutation', facebookLogin: { __typename?: 'AuthResponse', access_token: string, user: { __typename?: 'User', id: string, email: string, username?: string | null, role: { __typename?: 'Role', id: number, name: string }, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null, pictureUrl?: string | null } | null, subscriptions?: Array<{ __typename?: 'Subscription', id: string, plan: string, status: string, startDate: any, endDate: any }> | null } } };

export type ValidateResetTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ValidateResetTokenQuery = { __typename?: 'Query', validateResetToken: boolean };

export type ValidateVerificationTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ValidateVerificationTokenQuery = { __typename?: 'Query', validateVerificationToken: boolean };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'AuthResponse', access_token: string, user: { __typename?: 'User', id: string, email: string, username?: string | null, isVerified: boolean, role: { __typename?: 'Role', id: number, name: string }, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null, pictureUrl?: string | null } | null, subscriptions?: Array<{ __typename?: 'Subscription', id: string, plan: string, status: string, startDate: any, endDate: any }> | null } } };

export type ResendVerificationEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResendVerificationEmailMutation = { __typename?: 'Mutation', resendVerificationEmail: boolean };

export type ComparePropertiesQueryVariables = Exact<{
  input: ComparePropertiesInput;
}>;


export type ComparePropertiesQuery = { __typename?: 'Query', compareProperties: { __typename?: 'PropertyComparisonResult', properties: Array<{ __typename?: 'Property', id: string, title: string, titleEn: string, slug: string, slugEn: string, priceUS?: number | null, priceBS?: number | null, bedrooms?: number | null, bathrooms?: number | null, totalArea?: number | null, coveredArea?: number | null, parkingSpaces?: number | null, yearBuilt?: number | null, furnished?: boolean | null, pool?: boolean | null, balcony?: boolean | null, terrace?: boolean | null, security?: boolean | null, storage?: boolean | null, address: string, propertyTypeId: number, dealTypeId: number, latitude?: number | null, longitude?: number | null }>, matrix: { __typename?: 'ComparisonMatrix', features: Array<{ __typename?: 'ComparisonFeature', name: string, values: Array<string> }> } } };

export type MyComparisonsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyComparisonsQuery = { __typename?: 'Query', myComparisons: Array<{ __typename?: 'PropertyComparison', id: string, propertyIds: Array<string>, createdAt: any }> };

export type MyFavoritesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFavoritesQuery = { __typename?: 'Query', myFavorites: Array<{ __typename?: 'Favorite', id: string, propertyId: string, priceAlertEnabled: boolean, lastPrice?: number | null, notes?: string | null, createdAt: any, property?: { __typename?: 'Property', id: string, title: string, titleEn: string, slug: string, slugEn: string, description: string, priceUS?: number | null, priceBS?: number | null, bedrooms?: number | null, bathrooms?: number | null, totalArea?: number | null, coveredArea?: number | null, status: string, priority: string, address: string, latitude?: number | null, longitude?: number | null, propertyTypeId: number, dealTypeId: number, cityId: number, zoneId: number, createdAt: any } | null }> };

export type IsFavoritedQueryVariables = Exact<{
  propertyId: Scalars['String']['input'];
}>;


export type IsFavoritedQuery = { __typename?: 'Query', isFavorited: boolean };

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', id: number, name: string }> };

export type StatesQueryVariables = Exact<{
  countryId: Scalars['Int']['input'];
}>;


export type StatesQuery = { __typename?: 'Query', states: Array<{ __typename?: 'State', id: number, name: string, countryId: number }> };

export type CitiesQueryVariables = Exact<{
  stateId: Scalars['Int']['input'];
}>;


export type CitiesQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'City', id: number, name: string, stateId: number, latitude?: number | null, longitude?: number | null }> };

export type ZonesQueryVariables = Exact<{
  cityId: Scalars['Int']['input'];
}>;


export type ZonesQuery = { __typename?: 'Query', zones: Array<{ __typename?: 'Zone', id: number, name: string, cityId: number, latitude: number, longitude: number }> };

export type MyConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyConversationsQuery = { __typename?: 'Query', myConversations: Array<{ __typename?: 'Conversation', id: string, participant1Id: string, participant2Id: string, propertyId?: string | null, lastMessageAt?: any | null, createdAt: any, participant1?: { __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null, pictureUrl?: string | null } | null, subscriptions?: Array<{ __typename?: 'Subscription', id: string, plan: string, status: string, endDate: any }> | null } | null, participant2?: { __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null, pictureUrl?: string | null } | null, subscriptions?: Array<{ __typename?: 'Subscription', id: string, plan: string, status: string, endDate: any }> | null } | null, messages?: Array<{ __typename?: 'Message', id: string, content: string, senderId: string, createdAt: any, readAt?: any | null }> | null }> };

export type ConversationMessagesQueryVariables = Exact<{
  conversationId: Scalars['String']['input'];
}>;


export type ConversationMessagesQuery = { __typename?: 'Query', conversationMessages: Array<{ __typename?: 'Message', id: string, conversationId: string, senderId: string, receiverId: string, propertyId?: string | null, content: string, status: MessageStatus, readAt?: any | null, createdAt: any, sender?: { __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null, pictureUrl?: string | null } | null, subscriptions?: Array<{ __typename?: 'Subscription', id: string, plan: string, status: string, endDate: any }> | null } | null, receiver?: { __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null, pictureUrl?: string | null } | null, subscriptions?: Array<{ __typename?: 'Subscription', id: string, plan: string, status: string, endDate: any }> | null } | null }> };

export type ConversationWithPropertyQueryVariables = Exact<{
  conversationId: Scalars['String']['input'];
}>;


export type ConversationWithPropertyQuery = { __typename?: 'Query', conversationMessages: Array<{ __typename?: 'Message', id: string, conversationId: string, propertyId?: string | null }> };

export type NotificationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationResult', data: Array<{ __typename?: 'Notification', id: string, userId: string, type: string, title: string, message: string, data?: any | null, read: boolean, readAt?: any | null, createdAt: any }>, meta: { __typename?: 'NotificationMeta', total: number, page: number, limit: number, totalPages: number } } };

export type UnreadNotificationsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UnreadNotificationsCountQuery = { __typename?: 'Query', unreadNotificationsCount: number };

export type MyPaymentsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPaymentsQuery = { __typename?: 'Query', myPayments: Array<{ __typename?: 'Payment', id: string, userId: string, amount: number, currency: string, method: PaymentMethod, status: PaymentStatus, plan: string, receiptUrl?: string | null, transactionId?: string | null, approvedAt?: any | null, rejectedReason?: string | null, createdAt: any, updatedAt: any }> };

export type AvailablePaymentMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailablePaymentMethodsQuery = { __typename?: 'Query', availablePaymentMethods: Array<string> };

export type CreatePaymentMutationVariables = Exact<{
  input: CreatePaymentInput;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'PaymentInstructions', success: boolean, paymentId: string, status: PaymentStatus, message: string, instructions?: string | null, redirectUrl?: string | null } };

export type CancelPaymentMutationVariables = Exact<{
  paymentId: Scalars['String']['input'];
}>;


export type CancelPaymentMutation = { __typename?: 'Mutation', cancelPayment: { __typename?: 'Payment', id: string, status: PaymentStatus } };

export type PropertiesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PropertiesQuery = { __typename?: 'Query', properties: { __typename?: 'PropertyResult', data: Array<{ __typename?: 'Property', id: string, title: string, slug: string, slugEn: string, description: string, priceUS?: number | null, priceBS?: number | null, address: string, bedrooms?: number | null, bathrooms?: number | null, totalArea?: number | null, coveredArea?: number | null, latitude?: number | null, longitude?: number | null, status: string, priority: string, createdAt: any, propertyTypeId: number, dealTypeId: number, cityId: number, zoneId: number, userId: string, media?: Array<{ __typename?: 'Media', id: string, url: string, type: MediaType, order: number }> | null }>, meta: { __typename?: 'PropertyMeta', total: number, page: number, limit: number, totalPages: number } } };

export type PropertyQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type PropertyQuery = { __typename?: 'Query', property: { __typename?: 'Property', id: string, title: string, titleEn: string, slug: string, slugEn: string, description: string, descriptionEn: string, priceUS?: number | null, priceBS?: number | null, phoneNumber?: string | null, address: string, bedrooms?: number | null, bathrooms?: number | null, totalArea?: number | null, coveredArea?: number | null, parkingSpaces?: number | null, latitude?: number | null, longitude?: number | null, status: string, priority: string, yearBuilt?: number | null, furnished?: boolean | null, petsAllowed?: boolean | null, maintenanceFee?: number | null, propertyTax?: number | null, availableFrom?: any | null, virtualTourUrl?: string | null, floorPlanUrl?: string | null, condition?: string | null, stories?: number | null, elevators?: number | null, heating?: string | null, cooling?: string | null, security?: boolean | null, pool?: boolean | null, balcony?: boolean | null, terrace?: boolean | null, storage?: boolean | null, createdAt: any, updatedAt: any, propertyTypeId: number, dealTypeId: number, cityId: number, zoneId: number, stateId: number, countryId: number, userId: string, agencyId?: string | null, media?: Array<{ __typename?: 'Media', id: string, url: string, type: MediaType, order: number }> | null, user?: { __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null } | null } | null } };

export type SearchPropertiesQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<PropertyFiltersInput>;
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchPropertiesQuery = { __typename?: 'Query', searchProperties: { __typename?: 'PropertyResult', data: Array<{ __typename?: 'Property', id: string, title: string, slug: string, slugEn: string, description: string, priceUS?: number | null, priceBS?: number | null, address: string, bedrooms?: number | null, bathrooms?: number | null, totalArea?: number | null, coveredArea?: number | null, latitude?: number | null, longitude?: number | null, status: string, priority: string, createdAt: any, propertyTypeId: number, dealTypeId: number, cityId: number, zoneId: number, userId: string, media?: Array<{ __typename?: 'Media', id: string, url: string, type: MediaType, order: number }> | null }>, meta: { __typename?: 'PropertyMeta', total: number, page: number, limit: number, totalPages: number } } };

export type CreatePropertyMutationVariables = Exact<{
  input: CreatePropertyInput;
}>;


export type CreatePropertyMutation = { __typename?: 'Mutation', createProperty: { __typename?: 'Property', id: string, title: string, titleEn: string, description: string, descriptionEn: string, priceUS?: number | null, priceBS?: number | null, address: string, bedrooms?: number | null, bathrooms?: number | null, totalArea?: number | null, coveredArea?: number | null, parkingSpaces?: number | null, latitude?: number | null, longitude?: number | null, status: string, yearBuilt?: number | null, furnished?: boolean | null, pool?: boolean | null, balcony?: boolean | null, terrace?: boolean | null, security?: boolean | null, storage?: boolean | null, petsAllowed?: boolean | null, propertyTypeId: number, dealTypeId: number, cityId: number, zoneId: number, stateId: number, countryId: number, createdAt: any } };

export type MyPropertiesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MyPropertiesQuery = { __typename?: 'Query', myProperties: { __typename?: 'PropertyResult', data: Array<{ __typename?: 'Property', id: string, title: string, titleEn: string, description: string, priceUS?: number | null, priceBS?: number | null, address: string, bedrooms?: number | null, bathrooms?: number | null, totalArea?: number | null, coveredArea?: number | null, latitude?: number | null, longitude?: number | null, status: string, priority: string, createdAt: any, propertyTypeId: number, dealTypeId: number, cityId: number, zoneId: number, media?: Array<{ __typename?: 'Media', id: string, url: string, type: MediaType, order: number }> | null, city?: { __typename?: 'City', id: number, name: string } | null, propertyType?: { __typename?: 'PropertyType', id: number, name: string } | null, analytics?: { __typename?: 'PropertyAnalytics', id: string, views: number, clicks: number, favorites: number, inquiries: number, phoneClicks: number, emailClicks: number, whatsappClicks: number, shares: number, conversionRate: number } | null }>, meta: { __typename?: 'PropertyMeta', total: number, page: number, limit: number, totalPages: number } } };

export type PropertyBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  locale: Scalars['String']['input'];
}>;


export type PropertyBySlugQuery = { __typename?: 'Query', propertyBySlug: { __typename?: 'Property', id: string, title: string, titleEn: string, slug: string, slugEn: string, description: string, descriptionEn: string, priceUS?: number | null, priceBS?: number | null, phoneNumber?: string | null, address: string, bedrooms?: number | null, bathrooms?: number | null, totalArea?: number | null, coveredArea?: number | null, parkingSpaces?: number | null, latitude?: number | null, longitude?: number | null, status: string, priority: string, yearBuilt?: number | null, furnished?: boolean | null, petsAllowed?: boolean | null, maintenanceFee?: number | null, propertyTax?: number | null, availableFrom?: any | null, virtualTourUrl?: string | null, floorPlanUrl?: string | null, condition?: string | null, stories?: number | null, elevators?: number | null, heating?: string | null, cooling?: string | null, security?: boolean | null, pool?: boolean | null, balcony?: boolean | null, terrace?: boolean | null, storage?: boolean | null, createdAt: any, updatedAt: any, propertyTypeId: number, dealTypeId: number, cityId: number, zoneId: number, stateId: number, countryId: number, userId: string, agencyId?: string | null, media?: Array<{ __typename?: 'Media', id: string, url: string, type: MediaType, order: number }> | null, user?: { __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null } | null } | null } };

export type MarketAnalysisQueryVariables = Exact<{
  input: MarketAnalysisInput;
}>;


export type MarketAnalysisQuery = { __typename?: 'Query', marketAnalysis: { __typename?: 'MarketAnalysisReport', cityId: number, cityName: string, propertyTypeId?: number | null, propertyTypeName?: string | null, totalProperties: number, averagePriceUS: number, averagePriceBS: number, medianPriceUS: number, medianPriceBS: number, minPriceUS: number, maxPriceUS: number, averageArea: number, pricePerSqmUS: number, priceDistribution: Array<{ __typename?: 'PriceDistribution', range: string, count: number, percentage: number }>, propertyTypeDistribution: Array<{ __typename?: 'PropertyTypeDistribution', propertyType: string, count: number, percentage: number, averagePrice: number }> } };

export type StatesForReportsQueryVariables = Exact<{
  countryId: Scalars['Int']['input'];
}>;


export type StatesForReportsQuery = { __typename?: 'Query', states: Array<{ __typename?: 'State', id: number, name: string, cities?: Array<{ __typename?: 'City', id: number, name: string }> | null }> };

export type MySavedSearchesQueryVariables = Exact<{ [key: string]: never; }>;


export type MySavedSearchesQuery = { __typename?: 'Query', mySavedSearches: Array<{ __typename?: 'SavedSearch', id: string, name: string, query?: string | null, minPrice?: number | null, maxPrice?: number | null, bedrooms?: number | null, bathrooms?: number | null, propertyTypeId?: number | null, dealTypeId?: number | null, cityId?: number | null, zoneId?: number | null, alertsEnabled: boolean, lastAlertAt?: any | null, createdAt: any, updatedAt: any }> };

export type SavedSearchQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SavedSearchQuery = { __typename?: 'Query', savedSearch: { __typename?: 'SavedSearch', id: string, name: string, query?: string | null, minPrice?: number | null, maxPrice?: number | null, bedrooms?: number | null, bathrooms?: number | null, propertyTypeId?: number | null, dealTypeId?: number | null, cityId?: number | null, zoneId?: number | null, alertsEnabled: boolean, lastAlertAt?: any | null, createdAt: any, updatedAt: any } };

export type CurrentSubscriptionQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentSubscriptionQuery = { __typename?: 'Query', currentSubscription?: { __typename?: 'Subscription', id: string, userId: string, plan: string, status: string, startDate: any, endDate: any, createdAt: any, updatedAt: any } | null };

export type UserSubscriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserSubscriptionsQuery = { __typename?: 'Query', userSubscriptions: Array<{ __typename?: 'Subscription', id: string, userId: string, plan: string, status: string, startDate: any, endDate: any, createdAt: any, updatedAt: any }> };


export const TestConnectionDocument = gql`
    query TestConnection {
  __typename
}
    `;
export function useTestConnectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TestConnectionQuery, TestConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<TestConnectionQuery, TestConnectionQueryVariables>(TestConnectionDocument, options);
      }
export function useTestConnectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TestConnectionQuery, TestConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<TestConnectionQuery, TestConnectionQueryVariables>(TestConnectionDocument, options);
        }
// @ts-ignore
export function useTestConnectionSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<TestConnectionQuery, TestConnectionQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<TestConnectionQuery, TestConnectionQueryVariables>;
export function useTestConnectionSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<TestConnectionQuery, TestConnectionQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<TestConnectionQuery | undefined, TestConnectionQueryVariables>;
export function useTestConnectionSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<TestConnectionQuery, TestConnectionQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<TestConnectionQuery, TestConnectionQueryVariables>(TestConnectionDocument, options);
        }
export type TestConnectionQueryHookResult = ReturnType<typeof useTestConnectionQuery>;
export type TestConnectionLazyQueryHookResult = ReturnType<typeof useTestConnectionLazyQuery>;
export type TestConnectionQueryResult = ApolloReactCommon.QueryResult<TestConnectionQuery, TestConnectionQueryVariables>;
export const ApprovePropertyDocument = gql`
    mutation ApproveProperty($id: String!) {
  approveProperty(id: $id) {
    id
    status
  }
}
    `;
export type ApprovePropertyMutationFn = ApolloReactCommon.MutationFunction<ApprovePropertyMutation, ApprovePropertyMutationVariables>;
export function useApprovePropertyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ApprovePropertyMutation, ApprovePropertyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ApprovePropertyMutation, ApprovePropertyMutationVariables>(ApprovePropertyDocument, options);
      }
export type ApprovePropertyMutationHookResult = ReturnType<typeof useApprovePropertyMutation>;
export type ApprovePropertyMutationResult = ApolloReactCommon.MutationResult<ApprovePropertyMutation>;
export type ApprovePropertyMutationOptions = ApolloReactCommon.BaseMutationOptions<ApprovePropertyMutation, ApprovePropertyMutationVariables>;
export const RejectPropertyDocument = gql`
    mutation RejectProperty($id: String!, $reason: String!) {
  rejectProperty(id: $id, reason: $reason) {
    id
    status
  }
}
    `;
export type RejectPropertyMutationFn = ApolloReactCommon.MutationFunction<RejectPropertyMutation, RejectPropertyMutationVariables>;
export function useRejectPropertyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RejectPropertyMutation, RejectPropertyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RejectPropertyMutation, RejectPropertyMutationVariables>(RejectPropertyDocument, options);
      }
export type RejectPropertyMutationHookResult = ReturnType<typeof useRejectPropertyMutation>;
export type RejectPropertyMutationResult = ApolloReactCommon.MutationResult<RejectPropertyMutation>;
export type RejectPropertyMutationOptions = ApolloReactCommon.BaseMutationOptions<RejectPropertyMutation, RejectPropertyMutationVariables>;
export const ApprovePaymentDocument = gql`
    mutation ApprovePayment($input: ApprovePaymentInput!) {
  approvePayment(input: $input) {
    id
    status
    approvedAt
  }
}
    `;
export type ApprovePaymentMutationFn = ApolloReactCommon.MutationFunction<ApprovePaymentMutation, ApprovePaymentMutationVariables>;
export function useApprovePaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ApprovePaymentMutation, ApprovePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ApprovePaymentMutation, ApprovePaymentMutationVariables>(ApprovePaymentDocument, options);
      }
export type ApprovePaymentMutationHookResult = ReturnType<typeof useApprovePaymentMutation>;
export type ApprovePaymentMutationResult = ApolloReactCommon.MutationResult<ApprovePaymentMutation>;
export type ApprovePaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<ApprovePaymentMutation, ApprovePaymentMutationVariables>;
export const RejectPaymentDocument = gql`
    mutation RejectPayment($input: RejectPaymentInput!) {
  rejectPayment(input: $input) {
    id
    status
    rejectedReason
  }
}
    `;
export type RejectPaymentMutationFn = ApolloReactCommon.MutationFunction<RejectPaymentMutation, RejectPaymentMutationVariables>;
export function useRejectPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RejectPaymentMutation, RejectPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RejectPaymentMutation, RejectPaymentMutationVariables>(RejectPaymentDocument, options);
      }
export type RejectPaymentMutationHookResult = ReturnType<typeof useRejectPaymentMutation>;
export type RejectPaymentMutationResult = ApolloReactCommon.MutationResult<RejectPaymentMutation>;
export type RejectPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<RejectPaymentMutation, RejectPaymentMutationVariables>;
export const UpdateSettingDocument = gql`
    mutation UpdateSetting($updateSettingInput: UpdateSettingInput!) {
  updateSetting(updateSettingInput: $updateSettingInput) {
    id
    key
    value
    updatedAt
  }
}
    `;
export type UpdateSettingMutationFn = ApolloReactCommon.MutationFunction<UpdateSettingMutation, UpdateSettingMutationVariables>;
export function useUpdateSettingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSettingMutation, UpdateSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateSettingMutation, UpdateSettingMutationVariables>(UpdateSettingDocument, options);
      }
export type UpdateSettingMutationHookResult = ReturnType<typeof useUpdateSettingMutation>;
export type UpdateSettingMutationResult = ApolloReactCommon.MutationResult<UpdateSettingMutation>;
export type UpdateSettingMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateSettingMutation, UpdateSettingMutationVariables>;
export const CreateSettingDocument = gql`
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
export type CreateSettingMutationFn = ApolloReactCommon.MutationFunction<CreateSettingMutation, CreateSettingMutationVariables>;
export function useCreateSettingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSettingMutation, CreateSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateSettingMutation, CreateSettingMutationVariables>(CreateSettingDocument, options);
      }
export type CreateSettingMutationHookResult = ReturnType<typeof useCreateSettingMutation>;
export type CreateSettingMutationResult = ApolloReactCommon.MutationResult<CreateSettingMutation>;
export type CreateSettingMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSettingMutation, CreateSettingMutationVariables>;
export const DeleteSettingDocument = gql`
    mutation DeleteSetting($key: String!) {
  deleteSetting(key: $key) {
    id
    key
  }
}
    `;
export type DeleteSettingMutationFn = ApolloReactCommon.MutationFunction<DeleteSettingMutation, DeleteSettingMutationVariables>;
export function useDeleteSettingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSettingMutation, DeleteSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteSettingMutation, DeleteSettingMutationVariables>(DeleteSettingDocument, options);
      }
export type DeleteSettingMutationHookResult = ReturnType<typeof useDeleteSettingMutation>;
export type DeleteSettingMutationResult = ApolloReactCommon.MutationResult<DeleteSettingMutation>;
export type DeleteSettingMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteSettingMutation, DeleteSettingMutationVariables>;
export const TrackPropertyViewDocument = gql`
    mutation TrackPropertyView($propertyId: String!, $sessionId: String) {
  trackPropertyView(propertyId: $propertyId, sessionId: $sessionId)
}
    `;
export type TrackPropertyViewMutationFn = ApolloReactCommon.MutationFunction<TrackPropertyViewMutation, TrackPropertyViewMutationVariables>;
export function useTrackPropertyViewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TrackPropertyViewMutation, TrackPropertyViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<TrackPropertyViewMutation, TrackPropertyViewMutationVariables>(TrackPropertyViewDocument, options);
      }
export type TrackPropertyViewMutationHookResult = ReturnType<typeof useTrackPropertyViewMutation>;
export type TrackPropertyViewMutationResult = ApolloReactCommon.MutationResult<TrackPropertyViewMutation>;
export type TrackPropertyViewMutationOptions = ApolloReactCommon.BaseMutationOptions<TrackPropertyViewMutation, TrackPropertyViewMutationVariables>;
export const TrackPropertyClickDocument = gql`
    mutation TrackPropertyClick($propertyId: String!) {
  trackPropertyClick(propertyId: $propertyId)
}
    `;
export type TrackPropertyClickMutationFn = ApolloReactCommon.MutationFunction<TrackPropertyClickMutation, TrackPropertyClickMutationVariables>;
export function useTrackPropertyClickMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TrackPropertyClickMutation, TrackPropertyClickMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<TrackPropertyClickMutation, TrackPropertyClickMutationVariables>(TrackPropertyClickDocument, options);
      }
export type TrackPropertyClickMutationHookResult = ReturnType<typeof useTrackPropertyClickMutation>;
export type TrackPropertyClickMutationResult = ApolloReactCommon.MutationResult<TrackPropertyClickMutation>;
export type TrackPropertyClickMutationOptions = ApolloReactCommon.BaseMutationOptions<TrackPropertyClickMutation, TrackPropertyClickMutationVariables>;
export const TrackPhoneClickDocument = gql`
    mutation TrackPhoneClick($propertyId: String!, $sessionId: String) {
  trackPhoneClick(propertyId: $propertyId, sessionId: $sessionId)
}
    `;
export type TrackPhoneClickMutationFn = ApolloReactCommon.MutationFunction<TrackPhoneClickMutation, TrackPhoneClickMutationVariables>;
export function useTrackPhoneClickMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TrackPhoneClickMutation, TrackPhoneClickMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<TrackPhoneClickMutation, TrackPhoneClickMutationVariables>(TrackPhoneClickDocument, options);
      }
export type TrackPhoneClickMutationHookResult = ReturnType<typeof useTrackPhoneClickMutation>;
export type TrackPhoneClickMutationResult = ApolloReactCommon.MutationResult<TrackPhoneClickMutation>;
export type TrackPhoneClickMutationOptions = ApolloReactCommon.BaseMutationOptions<TrackPhoneClickMutation, TrackPhoneClickMutationVariables>;
export const TrackEmailClickDocument = gql`
    mutation TrackEmailClick($propertyId: String!, $sessionId: String) {
  trackEmailClick(propertyId: $propertyId, sessionId: $sessionId)
}
    `;
export type TrackEmailClickMutationFn = ApolloReactCommon.MutationFunction<TrackEmailClickMutation, TrackEmailClickMutationVariables>;
export function useTrackEmailClickMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TrackEmailClickMutation, TrackEmailClickMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<TrackEmailClickMutation, TrackEmailClickMutationVariables>(TrackEmailClickDocument, options);
      }
export type TrackEmailClickMutationHookResult = ReturnType<typeof useTrackEmailClickMutation>;
export type TrackEmailClickMutationResult = ApolloReactCommon.MutationResult<TrackEmailClickMutation>;
export type TrackEmailClickMutationOptions = ApolloReactCommon.BaseMutationOptions<TrackEmailClickMutation, TrackEmailClickMutationVariables>;
export const TrackWhatsAppClickDocument = gql`
    mutation TrackWhatsAppClick($propertyId: String!, $userId: String) {
  trackWhatsAppClick(propertyId: $propertyId, userId: $userId)
}
    `;
export type TrackWhatsAppClickMutationFn = ApolloReactCommon.MutationFunction<TrackWhatsAppClickMutation, TrackWhatsAppClickMutationVariables>;
export function useTrackWhatsAppClickMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TrackWhatsAppClickMutation, TrackWhatsAppClickMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<TrackWhatsAppClickMutation, TrackWhatsAppClickMutationVariables>(TrackWhatsAppClickDocument, options);
      }
export type TrackWhatsAppClickMutationHookResult = ReturnType<typeof useTrackWhatsAppClickMutation>;
export type TrackWhatsAppClickMutationResult = ApolloReactCommon.MutationResult<TrackWhatsAppClickMutation>;
export type TrackWhatsAppClickMutationOptions = ApolloReactCommon.BaseMutationOptions<TrackWhatsAppClickMutation, TrackWhatsAppClickMutationVariables>;
export const TrackSearchDocument = gql`
    mutation TrackSearch($query: String!, $userId: String) {
  trackSearch(query: $query, userId: $userId)
}
    `;
export type TrackSearchMutationFn = ApolloReactCommon.MutationFunction<TrackSearchMutation, TrackSearchMutationVariables>;
export function useTrackSearchMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TrackSearchMutation, TrackSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<TrackSearchMutation, TrackSearchMutationVariables>(TrackSearchDocument, options);
      }
export type TrackSearchMutationHookResult = ReturnType<typeof useTrackSearchMutation>;
export type TrackSearchMutationResult = ApolloReactCommon.MutationResult<TrackSearchMutation>;
export type TrackSearchMutationOptions = ApolloReactCommon.BaseMutationOptions<TrackSearchMutation, TrackSearchMutationVariables>;
export const SaveComparisonDocument = gql`
    mutation SaveComparison($input: SaveComparisonInput!) {
  saveComparison(input: $input) {
    id
    propertyIds
    createdAt
  }
}
    `;
export type SaveComparisonMutationFn = ApolloReactCommon.MutationFunction<SaveComparisonMutation, SaveComparisonMutationVariables>;
export function useSaveComparisonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveComparisonMutation, SaveComparisonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SaveComparisonMutation, SaveComparisonMutationVariables>(SaveComparisonDocument, options);
      }
export type SaveComparisonMutationHookResult = ReturnType<typeof useSaveComparisonMutation>;
export type SaveComparisonMutationResult = ApolloReactCommon.MutationResult<SaveComparisonMutation>;
export type SaveComparisonMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveComparisonMutation, SaveComparisonMutationVariables>;
export const DeleteComparisonDocument = gql`
    mutation DeleteComparison($id: String!) {
  deleteComparison(id: $id)
}
    `;
export type DeleteComparisonMutationFn = ApolloReactCommon.MutationFunction<DeleteComparisonMutation, DeleteComparisonMutationVariables>;
export function useDeleteComparisonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteComparisonMutation, DeleteComparisonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteComparisonMutation, DeleteComparisonMutationVariables>(DeleteComparisonDocument, options);
      }
export type DeleteComparisonMutationHookResult = ReturnType<typeof useDeleteComparisonMutation>;
export type DeleteComparisonMutationResult = ApolloReactCommon.MutationResult<DeleteComparisonMutation>;
export type DeleteComparisonMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteComparisonMutation, DeleteComparisonMutationVariables>;
export const AddFavoriteDocument = gql`
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
export type AddFavoriteMutationFn = ApolloReactCommon.MutationFunction<AddFavoriteMutation, AddFavoriteMutationVariables>;
export function useAddFavoriteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddFavoriteMutation, AddFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddFavoriteMutation, AddFavoriteMutationVariables>(AddFavoriteDocument, options);
      }
export type AddFavoriteMutationHookResult = ReturnType<typeof useAddFavoriteMutation>;
export type AddFavoriteMutationResult = ApolloReactCommon.MutationResult<AddFavoriteMutation>;
export type AddFavoriteMutationOptions = ApolloReactCommon.BaseMutationOptions<AddFavoriteMutation, AddFavoriteMutationVariables>;
export const RemoveFavoriteDocument = gql`
    mutation RemoveFavorite($propertyId: String!) {
  removeFavorite(propertyId: $propertyId)
}
    `;
export type RemoveFavoriteMutationFn = ApolloReactCommon.MutationFunction<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>;
export function useRemoveFavoriteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>(RemoveFavoriteDocument, options);
      }
export type RemoveFavoriteMutationHookResult = ReturnType<typeof useRemoveFavoriteMutation>;
export type RemoveFavoriteMutationResult = ApolloReactCommon.MutationResult<RemoveFavoriteMutation>;
export type RemoveFavoriteMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>;
export const UpdateFavoriteDocument = gql`
    mutation UpdateFavorite($propertyId: String!, $priceAlertEnabled: Boolean, $notes: String) {
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
export type UpdateFavoriteMutationFn = ApolloReactCommon.MutationFunction<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>;
export function useUpdateFavoriteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>(UpdateFavoriteDocument, options);
      }
export type UpdateFavoriteMutationHookResult = ReturnType<typeof useUpdateFavoriteMutation>;
export type UpdateFavoriteMutationResult = ApolloReactCommon.MutationResult<UpdateFavoriteMutation>;
export type UpdateFavoriteMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>;
export const SendMessageDocument = gql`
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
export type SendMessageMutationFn = ApolloReactCommon.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;
export function useSendMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = ApolloReactCommon.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const MarkConversationAsReadDocument = gql`
    mutation MarkConversationAsRead($conversationId: String!) {
  markConversationAsRead(conversationId: $conversationId)
}
    `;
export type MarkConversationAsReadMutationFn = ApolloReactCommon.MutationFunction<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>;
export function useMarkConversationAsReadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>(MarkConversationAsReadDocument, options);
      }
export type MarkConversationAsReadMutationHookResult = ReturnType<typeof useMarkConversationAsReadMutation>;
export type MarkConversationAsReadMutationResult = ApolloReactCommon.MutationResult<MarkConversationAsReadMutation>;
export type MarkConversationAsReadMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: String!) {
  deleteMessage(messageId: $messageId)
}
    `;
export type DeleteMessageMutationFn = ApolloReactCommon.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;
export function useDeleteMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = ApolloReactCommon.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const BlockUserDocument = gql`
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
export type BlockUserMutationFn = ApolloReactCommon.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;
export function useBlockUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = ApolloReactCommon.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = ApolloReactCommon.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const UnblockUserDocument = gql`
    mutation UnblockUser($blockedId: String!) {
  unblockUser(blockedId: $blockedId)
}
    `;
export type UnblockUserMutationFn = ApolloReactCommon.MutationFunction<UnblockUserMutation, UnblockUserMutationVariables>;
export function useUnblockUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnblockUserMutation, UnblockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(UnblockUserDocument, options);
      }
export type UnblockUserMutationHookResult = ReturnType<typeof useUnblockUserMutation>;
export type UnblockUserMutationResult = ApolloReactCommon.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UnblockUserMutation, UnblockUserMutationVariables>;
export const ReportMessageDocument = gql`
    mutation ReportMessage($messageId: String!, $reason: String!, $details: String) {
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
export type ReportMessageMutationFn = ApolloReactCommon.MutationFunction<ReportMessageMutation, ReportMessageMutationVariables>;
export function useReportMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReportMessageMutation, ReportMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ReportMessageMutation, ReportMessageMutationVariables>(ReportMessageDocument, options);
      }
export type ReportMessageMutationHookResult = ReturnType<typeof useReportMessageMutation>;
export type ReportMessageMutationResult = ApolloReactCommon.MutationResult<ReportMessageMutation>;
export type ReportMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<ReportMessageMutation, ReportMessageMutationVariables>;
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($id: String!) {
  markNotificationAsRead(id: $id) {
    id
    read
    readAt
  }
}
    `;
export type MarkNotificationAsReadMutationFn = ApolloReactCommon.MutationFunction<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export function useMarkNotificationAsReadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, options);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = ApolloReactCommon.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const MarkAllNotificationsAsReadDocument = gql`
    mutation MarkAllNotificationsAsRead {
  markAllNotificationsAsRead
}
    `;
export type MarkAllNotificationsAsReadMutationFn = ApolloReactCommon.MutationFunction<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;
export function useMarkAllNotificationsAsReadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>(MarkAllNotificationsAsReadDocument, options);
      }
export type MarkAllNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationResult = ApolloReactCommon.MutationResult<MarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($id: String!) {
  deleteNotification(id: $id) {
    id
  }
}
    `;
export type DeleteNotificationMutationFn = ApolloReactCommon.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export function useDeleteNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, options);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = ApolloReactCommon.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const GeneratePropertyFlyerDocument = gql`
    mutation GeneratePropertyFlyer($propertyId: String!) {
  generatePropertyFlyer(propertyId: $propertyId)
}
    `;
export type GeneratePropertyFlyerMutationFn = ApolloReactCommon.MutationFunction<GeneratePropertyFlyerMutation, GeneratePropertyFlyerMutationVariables>;
export function useGeneratePropertyFlyerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GeneratePropertyFlyerMutation, GeneratePropertyFlyerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<GeneratePropertyFlyerMutation, GeneratePropertyFlyerMutationVariables>(GeneratePropertyFlyerDocument, options);
      }
export type GeneratePropertyFlyerMutationHookResult = ReturnType<typeof useGeneratePropertyFlyerMutation>;
export type GeneratePropertyFlyerMutationResult = ApolloReactCommon.MutationResult<GeneratePropertyFlyerMutation>;
export type GeneratePropertyFlyerMutationOptions = ApolloReactCommon.BaseMutationOptions<GeneratePropertyFlyerMutation, GeneratePropertyFlyerMutationVariables>;
export const DeletePropertyDocument = gql`
    mutation DeleteProperty($id: String!) {
  deleteProperty(id: $id) {
    id
    title
  }
}
    `;
export type DeletePropertyMutationFn = ApolloReactCommon.MutationFunction<DeletePropertyMutation, DeletePropertyMutationVariables>;
export function useDeletePropertyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePropertyMutation, DeletePropertyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeletePropertyMutation, DeletePropertyMutationVariables>(DeletePropertyDocument, options);
      }
export type DeletePropertyMutationHookResult = ReturnType<typeof useDeletePropertyMutation>;
export type DeletePropertyMutationResult = ApolloReactCommon.MutationResult<DeletePropertyMutation>;
export type DeletePropertyMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePropertyMutation, DeletePropertyMutationVariables>;
export const UpdatePropertyDocument = gql`
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
export type UpdatePropertyMutationFn = ApolloReactCommon.MutationFunction<UpdatePropertyMutation, UpdatePropertyMutationVariables>;
export function useUpdatePropertyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePropertyMutation, UpdatePropertyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdatePropertyMutation, UpdatePropertyMutationVariables>(UpdatePropertyDocument, options);
      }
export type UpdatePropertyMutationHookResult = ReturnType<typeof useUpdatePropertyMutation>;
export type UpdatePropertyMutationResult = ApolloReactCommon.MutationResult<UpdatePropertyMutation>;
export type UpdatePropertyMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePropertyMutation, UpdatePropertyMutationVariables>;
export const CreateSavedSearchDocument = gql`
    mutation CreateSavedSearch($input: CreateSavedSearchInput!) {
  createSavedSearch(input: $input) {
    id
    name
    query
    minPrice
    maxPrice
    bedrooms
    bathrooms
    propertyTypeId
    dealTypeId
    cityId
    zoneId
    alertsEnabled
    createdAt
  }
}
    `;
export type CreateSavedSearchMutationFn = ApolloReactCommon.MutationFunction<CreateSavedSearchMutation, CreateSavedSearchMutationVariables>;
export function useCreateSavedSearchMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSavedSearchMutation, CreateSavedSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateSavedSearchMutation, CreateSavedSearchMutationVariables>(CreateSavedSearchDocument, options);
      }
export type CreateSavedSearchMutationHookResult = ReturnType<typeof useCreateSavedSearchMutation>;
export type CreateSavedSearchMutationResult = ApolloReactCommon.MutationResult<CreateSavedSearchMutation>;
export type CreateSavedSearchMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSavedSearchMutation, CreateSavedSearchMutationVariables>;
export const UpdateSavedSearchDocument = gql`
    mutation UpdateSavedSearch($id: String!, $input: UpdateSavedSearchInput!) {
  updateSavedSearch(id: $id, input: $input) {
    id
    name
    alertsEnabled
    updatedAt
  }
}
    `;
export type UpdateSavedSearchMutationFn = ApolloReactCommon.MutationFunction<UpdateSavedSearchMutation, UpdateSavedSearchMutationVariables>;
export function useUpdateSavedSearchMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSavedSearchMutation, UpdateSavedSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateSavedSearchMutation, UpdateSavedSearchMutationVariables>(UpdateSavedSearchDocument, options);
      }
export type UpdateSavedSearchMutationHookResult = ReturnType<typeof useUpdateSavedSearchMutation>;
export type UpdateSavedSearchMutationResult = ApolloReactCommon.MutationResult<UpdateSavedSearchMutation>;
export type UpdateSavedSearchMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateSavedSearchMutation, UpdateSavedSearchMutationVariables>;
export const DeleteSavedSearchDocument = gql`
    mutation DeleteSavedSearch($id: String!) {
  deleteSavedSearch(id: $id)
}
    `;
export type DeleteSavedSearchMutationFn = ApolloReactCommon.MutationFunction<DeleteSavedSearchMutation, DeleteSavedSearchMutationVariables>;
export function useDeleteSavedSearchMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSavedSearchMutation, DeleteSavedSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteSavedSearchMutation, DeleteSavedSearchMutationVariables>(DeleteSavedSearchDocument, options);
      }
export type DeleteSavedSearchMutationHookResult = ReturnType<typeof useDeleteSavedSearchMutation>;
export type DeleteSavedSearchMutationResult = ApolloReactCommon.MutationResult<DeleteSavedSearchMutation>;
export type DeleteSavedSearchMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteSavedSearchMutation, DeleteSavedSearchMutationVariables>;
export const ToggleSavedSearchAlertsDocument = gql`
    mutation ToggleSavedSearchAlerts($id: String!, $enabled: Boolean!) {
  toggleSavedSearchAlerts(id: $id, enabled: $enabled) {
    id
    alertsEnabled
    updatedAt
  }
}
    `;
export type ToggleSavedSearchAlertsMutationFn = ApolloReactCommon.MutationFunction<ToggleSavedSearchAlertsMutation, ToggleSavedSearchAlertsMutationVariables>;
export function useToggleSavedSearchAlertsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleSavedSearchAlertsMutation, ToggleSavedSearchAlertsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ToggleSavedSearchAlertsMutation, ToggleSavedSearchAlertsMutationVariables>(ToggleSavedSearchAlertsDocument, options);
      }
export type ToggleSavedSearchAlertsMutationHookResult = ReturnType<typeof useToggleSavedSearchAlertsMutation>;
export type ToggleSavedSearchAlertsMutationResult = ApolloReactCommon.MutationResult<ToggleSavedSearchAlertsMutation>;
export type ToggleSavedSearchAlertsMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleSavedSearchAlertsMutation, ToggleSavedSearchAlertsMutationVariables>;
export const CancelSubscriptionDocument = gql`
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
export type CancelSubscriptionMutationFn = ApolloReactCommon.MutationFunction<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;
export function useCancelSubscriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument, options);
      }
export type CancelSubscriptionMutationHookResult = ReturnType<typeof useCancelSubscriptionMutation>;
export type CancelSubscriptionMutationResult = ApolloReactCommon.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;
export const StartFreeTrialDocument = gql`
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
export type StartFreeTrialMutationFn = ApolloReactCommon.MutationFunction<StartFreeTrialMutation, StartFreeTrialMutationVariables>;
export function useStartFreeTrialMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartFreeTrialMutation, StartFreeTrialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<StartFreeTrialMutation, StartFreeTrialMutationVariables>(StartFreeTrialDocument, options);
      }
export type StartFreeTrialMutationHookResult = ReturnType<typeof useStartFreeTrialMutation>;
export type StartFreeTrialMutationResult = ApolloReactCommon.MutationResult<StartFreeTrialMutation>;
export type StartFreeTrialMutationOptions = ApolloReactCommon.BaseMutationOptions<StartFreeTrialMutation, StartFreeTrialMutationVariables>;
export const AdminUsersDocument = gql`
    query AdminUsers {
  users {
    id
    email
    username
    status
    createdAt
    role {
      id
      name
    }
    profile {
      firstName
      lastName
      phoneNumber
      pictureUrl
    }
    subscriptions {
      id
      plan
      status
      endDate
    }
  }
}
    `;
export function useAdminUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, options);
      }
export function useAdminUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, options);
        }
// @ts-ignore
export function useAdminUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUsersQuery, AdminUsersQueryVariables>;
export function useAdminUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUsersQuery | undefined, AdminUsersQueryVariables>;
export function useAdminUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, options);
        }
export type AdminUsersQueryHookResult = ReturnType<typeof useAdminUsersQuery>;
export type AdminUsersLazyQueryHookResult = ReturnType<typeof useAdminUsersLazyQuery>;
export type AdminUsersQueryResult = ApolloReactCommon.QueryResult<AdminUsersQuery, AdminUsersQueryVariables>;
export const AdminPropertiesDocument = gql`
    query AdminProperties {
  properties(page: 1, limit: 1000) {
    data {
      id
      title
      status
      priceUS
      createdAt
      user {
        id
        email
        profile {
          firstName
          lastName
        }
      }
    }
    meta {
      total
      page
      limit
    }
  }
}
    `;
export function useAdminPropertiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminPropertiesQuery, AdminPropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminPropertiesQuery, AdminPropertiesQueryVariables>(AdminPropertiesDocument, options);
      }
export function useAdminPropertiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminPropertiesQuery, AdminPropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminPropertiesQuery, AdminPropertiesQueryVariables>(AdminPropertiesDocument, options);
        }
// @ts-ignore
export function useAdminPropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminPropertiesQuery, AdminPropertiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminPropertiesQuery, AdminPropertiesQueryVariables>;
export function useAdminPropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminPropertiesQuery, AdminPropertiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminPropertiesQuery | undefined, AdminPropertiesQueryVariables>;
export function useAdminPropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminPropertiesQuery, AdminPropertiesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminPropertiesQuery, AdminPropertiesQueryVariables>(AdminPropertiesDocument, options);
        }
export type AdminPropertiesQueryHookResult = ReturnType<typeof useAdminPropertiesQuery>;
export type AdminPropertiesLazyQueryHookResult = ReturnType<typeof useAdminPropertiesLazyQuery>;
export type AdminPropertiesQueryResult = ApolloReactCommon.QueryResult<AdminPropertiesQuery, AdminPropertiesQueryVariables>;
export const AdminPaymentsDocument = gql`
    query AdminPayments {
  allPayments {
    id
    userId
    amount
    currency
    method
    status
    plan
    createdAt
    approvedAt
  }
}
    `;
export function useAdminPaymentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminPaymentsQuery, AdminPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminPaymentsQuery, AdminPaymentsQueryVariables>(AdminPaymentsDocument, options);
      }
export function useAdminPaymentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminPaymentsQuery, AdminPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminPaymentsQuery, AdminPaymentsQueryVariables>(AdminPaymentsDocument, options);
        }
// @ts-ignore
export function useAdminPaymentsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminPaymentsQuery, AdminPaymentsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminPaymentsQuery, AdminPaymentsQueryVariables>;
export function useAdminPaymentsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminPaymentsQuery, AdminPaymentsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminPaymentsQuery | undefined, AdminPaymentsQueryVariables>;
export function useAdminPaymentsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminPaymentsQuery, AdminPaymentsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminPaymentsQuery, AdminPaymentsQueryVariables>(AdminPaymentsDocument, options);
        }
export type AdminPaymentsQueryHookResult = ReturnType<typeof useAdminPaymentsQuery>;
export type AdminPaymentsLazyQueryHookResult = ReturnType<typeof useAdminPaymentsLazyQuery>;
export type AdminPaymentsQueryResult = ApolloReactCommon.QueryResult<AdminPaymentsQuery, AdminPaymentsQueryVariables>;
export const AdminSettingsDocument = gql`
    query AdminSettings {
  settings {
    id
    key
    value
    dataType
    category
    description
    isPublic
    isEditable
    createdAt
    updatedAt
  }
}
    `;
export function useAdminSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminSettingsQuery, AdminSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminSettingsQuery, AdminSettingsQueryVariables>(AdminSettingsDocument, options);
      }
export function useAdminSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminSettingsQuery, AdminSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminSettingsQuery, AdminSettingsQueryVariables>(AdminSettingsDocument, options);
        }
// @ts-ignore
export function useAdminSettingsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminSettingsQuery, AdminSettingsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminSettingsQuery, AdminSettingsQueryVariables>;
export function useAdminSettingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminSettingsQuery, AdminSettingsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminSettingsQuery | undefined, AdminSettingsQueryVariables>;
export function useAdminSettingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminSettingsQuery, AdminSettingsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminSettingsQuery, AdminSettingsQueryVariables>(AdminSettingsDocument, options);
        }
export type AdminSettingsQueryHookResult = ReturnType<typeof useAdminSettingsQuery>;
export type AdminSettingsLazyQueryHookResult = ReturnType<typeof useAdminSettingsLazyQuery>;
export type AdminSettingsQueryResult = ApolloReactCommon.QueryResult<AdminSettingsQuery, AdminSettingsQueryVariables>;
export const PropertyAnalyticsDocument = gql`
    query PropertyAnalytics($propertyId: String!) {
  propertyAnalytics(propertyId: $propertyId) {
    id
    propertyId
    views
    clicks
    shares
    favorites
    inquiries
    phoneClicks
    emailClicks
    whatsappClicks
    shortCodeViews
    qrCodeScans
    lastViewedAt
    averageViewTime
    conversionRate
    createdAt
    updatedAt
  }
}
    `;
export function usePropertyAnalyticsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PropertyAnalyticsQuery, PropertyAnalyticsQueryVariables> & ({ variables: PropertyAnalyticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PropertyAnalyticsQuery, PropertyAnalyticsQueryVariables>(PropertyAnalyticsDocument, options);
      }
export function usePropertyAnalyticsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PropertyAnalyticsQuery, PropertyAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PropertyAnalyticsQuery, PropertyAnalyticsQueryVariables>(PropertyAnalyticsDocument, options);
        }
// @ts-ignore
export function usePropertyAnalyticsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PropertyAnalyticsQuery, PropertyAnalyticsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PropertyAnalyticsQuery, PropertyAnalyticsQueryVariables>;
export function usePropertyAnalyticsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PropertyAnalyticsQuery, PropertyAnalyticsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PropertyAnalyticsQuery | undefined, PropertyAnalyticsQueryVariables>;
export function usePropertyAnalyticsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PropertyAnalyticsQuery, PropertyAnalyticsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PropertyAnalyticsQuery, PropertyAnalyticsQueryVariables>(PropertyAnalyticsDocument, options);
        }
export type PropertyAnalyticsQueryHookResult = ReturnType<typeof usePropertyAnalyticsQuery>;
export type PropertyAnalyticsLazyQueryHookResult = ReturnType<typeof usePropertyAnalyticsLazyQuery>;
export type PropertyAnalyticsQueryResult = ApolloReactCommon.QueryResult<PropertyAnalyticsQuery, PropertyAnalyticsQueryVariables>;
export const PropertyViewHistoryDocument = gql`
    query PropertyViewHistory($propertyId: String!, $startDate: DateTime!, $endDate: DateTime!) {
  propertyViewHistory(
    propertyId: $propertyId
    startDate: $startDate
    endDate: $endDate
  ) {
    id
    date
    views
    uniqueViews
    clicks
    shares
  }
}
    `;
export function usePropertyViewHistoryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PropertyViewHistoryQuery, PropertyViewHistoryQueryVariables> & ({ variables: PropertyViewHistoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PropertyViewHistoryQuery, PropertyViewHistoryQueryVariables>(PropertyViewHistoryDocument, options);
      }
export function usePropertyViewHistoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PropertyViewHistoryQuery, PropertyViewHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PropertyViewHistoryQuery, PropertyViewHistoryQueryVariables>(PropertyViewHistoryDocument, options);
        }
// @ts-ignore
export function usePropertyViewHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PropertyViewHistoryQuery, PropertyViewHistoryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PropertyViewHistoryQuery, PropertyViewHistoryQueryVariables>;
export function usePropertyViewHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PropertyViewHistoryQuery, PropertyViewHistoryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PropertyViewHistoryQuery | undefined, PropertyViewHistoryQueryVariables>;
export function usePropertyViewHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PropertyViewHistoryQuery, PropertyViewHistoryQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PropertyViewHistoryQuery, PropertyViewHistoryQueryVariables>(PropertyViewHistoryDocument, options);
        }
export type PropertyViewHistoryQueryHookResult = ReturnType<typeof usePropertyViewHistoryQuery>;
export type PropertyViewHistoryLazyQueryHookResult = ReturnType<typeof usePropertyViewHistoryLazyQuery>;
export type PropertyViewHistoryQueryResult = ApolloReactCommon.QueryResult<PropertyViewHistoryQuery, PropertyViewHistoryQueryVariables>;
export const PopularSearchesDocument = gql`
    query PopularSearches($limit: Int) {
  popularSearches(limit: $limit) {
    id
    searchQuery
    count
    lastSearched
  }
}
    `;
export function usePopularSearchesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PopularSearchesQuery, PopularSearchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PopularSearchesQuery, PopularSearchesQueryVariables>(PopularSearchesDocument, options);
      }
export function usePopularSearchesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PopularSearchesQuery, PopularSearchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PopularSearchesQuery, PopularSearchesQueryVariables>(PopularSearchesDocument, options);
        }
// @ts-ignore
export function usePopularSearchesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PopularSearchesQuery, PopularSearchesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PopularSearchesQuery, PopularSearchesQueryVariables>;
export function usePopularSearchesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PopularSearchesQuery, PopularSearchesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PopularSearchesQuery | undefined, PopularSearchesQueryVariables>;
export function usePopularSearchesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PopularSearchesQuery, PopularSearchesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PopularSearchesQuery, PopularSearchesQueryVariables>(PopularSearchesDocument, options);
        }
export type PopularSearchesQueryHookResult = ReturnType<typeof usePopularSearchesQuery>;
export type PopularSearchesLazyQueryHookResult = ReturnType<typeof usePopularSearchesLazyQuery>;
export type PopularSearchesQueryResult = ApolloReactCommon.QueryResult<PopularSearchesQuery, PopularSearchesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
    roleId
    status
    isVerified
    createdAt
    role {
      id
      name
    }
    profile {
      id
      firstName
      lastName
      phoneNumber
      pictureUrl
      bio
      birthdate
    }
    subscriptions {
      id
      plan
      status
      startDate
      endDate
    }
  }
}
    `;
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
// @ts-ignore
export function useMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(loginInput: {email: $email, password: $password}) {
    access_token
    user {
      id
      email
      username
      role {
        id
        name
      }
      profile {
        firstName
        lastName
        pictureUrl
      }
      subscriptions {
        id
        plan
        status
        startDate
        endDate
      }
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    success
    message
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(input: {email: $email})
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(input: {token: $token, newPassword: $newPassword})
}
    `;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
  changePassword(
    input: {currentPassword: $currentPassword, newPassword: $newPassword}
  )
}
    `;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {
  updateProfile(updateProfileInput: $updateProfileInput) {
    id
    firstName
    lastName
    phoneNumber
    pictureUrl
    bio
    birthdate
  }
}
    `;
export type UpdateProfileMutationFn = ApolloReactCommon.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;
export function useUpdateProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = ApolloReactCommon.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateUsernameDocument = gql`
    mutation UpdateUsername($username: String!) {
  updateUsername(username: $username) {
    id
    email
    username
    role {
      id
      name
    }
    profile {
      firstName
      lastName
    }
  }
}
    `;
export type UpdateUsernameMutationFn = ApolloReactCommon.MutationFunction<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export function useUpdateUsernameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUsernameMutation, UpdateUsernameMutationVariables>(UpdateUsernameDocument, options);
      }
export type UpdateUsernameMutationHookResult = ReturnType<typeof useUpdateUsernameMutation>;
export type UpdateUsernameMutationResult = ApolloReactCommon.MutationResult<UpdateUsernameMutation>;
export type UpdateUsernameMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refreshToken {
    access_token
    user {
      id
      email
      username
      role {
        id
        name
      }
      profile {
        firstName
        lastName
      }
      subscriptions {
        id
        plan
        status
        startDate
        endDate
      }
    }
  }
}
    `;
export type RefreshTokenMutationFn = ApolloReactCommon.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;
export function useRefreshTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = ApolloReactCommon.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const GoogleLoginDocument = gql`
    mutation GoogleLogin($googleLoginInput: GoogleLoginInput!) {
  googleLogin(googleLoginInput: $googleLoginInput) {
    access_token
    user {
      id
      email
      username
      role {
        id
        name
      }
      profile {
        firstName
        lastName
        pictureUrl
      }
      subscriptions {
        id
        plan
        status
        startDate
        endDate
      }
    }
  }
}
    `;
export type GoogleLoginMutationFn = ApolloReactCommon.MutationFunction<GoogleLoginMutation, GoogleLoginMutationVariables>;
export function useGoogleLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GoogleLoginMutation, GoogleLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(GoogleLoginDocument, options);
      }
export type GoogleLoginMutationHookResult = ReturnType<typeof useGoogleLoginMutation>;
export type GoogleLoginMutationResult = ApolloReactCommon.MutationResult<GoogleLoginMutation>;
export type GoogleLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<GoogleLoginMutation, GoogleLoginMutationVariables>;
export const FacebookLoginDocument = gql`
    mutation FacebookLogin($facebookLoginInput: FacebookLoginInput!) {
  facebookLogin(facebookLoginInput: $facebookLoginInput) {
    access_token
    user {
      id
      email
      username
      role {
        id
        name
      }
      profile {
        firstName
        lastName
        pictureUrl
      }
      subscriptions {
        id
        plan
        status
        startDate
        endDate
      }
    }
  }
}
    `;
export type FacebookLoginMutationFn = ApolloReactCommon.MutationFunction<FacebookLoginMutation, FacebookLoginMutationVariables>;
export function useFacebookLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FacebookLoginMutation, FacebookLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<FacebookLoginMutation, FacebookLoginMutationVariables>(FacebookLoginDocument, options);
      }
export type FacebookLoginMutationHookResult = ReturnType<typeof useFacebookLoginMutation>;
export type FacebookLoginMutationResult = ApolloReactCommon.MutationResult<FacebookLoginMutation>;
export type FacebookLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<FacebookLoginMutation, FacebookLoginMutationVariables>;
export const ValidateResetTokenDocument = gql`
    query ValidateResetToken($token: String!) {
  validateResetToken(token: $token)
}
    `;
export function useValidateResetTokenQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ValidateResetTokenQuery, ValidateResetTokenQueryVariables> & ({ variables: ValidateResetTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ValidateResetTokenQuery, ValidateResetTokenQueryVariables>(ValidateResetTokenDocument, options);
      }
export function useValidateResetTokenLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ValidateResetTokenQuery, ValidateResetTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ValidateResetTokenQuery, ValidateResetTokenQueryVariables>(ValidateResetTokenDocument, options);
        }
// @ts-ignore
export function useValidateResetTokenSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ValidateResetTokenQuery, ValidateResetTokenQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ValidateResetTokenQuery, ValidateResetTokenQueryVariables>;
export function useValidateResetTokenSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ValidateResetTokenQuery, ValidateResetTokenQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ValidateResetTokenQuery | undefined, ValidateResetTokenQueryVariables>;
export function useValidateResetTokenSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ValidateResetTokenQuery, ValidateResetTokenQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ValidateResetTokenQuery, ValidateResetTokenQueryVariables>(ValidateResetTokenDocument, options);
        }
export type ValidateResetTokenQueryHookResult = ReturnType<typeof useValidateResetTokenQuery>;
export type ValidateResetTokenLazyQueryHookResult = ReturnType<typeof useValidateResetTokenLazyQuery>;
export type ValidateResetTokenQueryResult = ApolloReactCommon.QueryResult<ValidateResetTokenQuery, ValidateResetTokenQueryVariables>;
export const ValidateVerificationTokenDocument = gql`
    query ValidateVerificationToken($token: String!) {
  validateVerificationToken(token: $token)
}
    `;
export function useValidateVerificationTokenQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ValidateVerificationTokenQuery, ValidateVerificationTokenQueryVariables> & ({ variables: ValidateVerificationTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ValidateVerificationTokenQuery, ValidateVerificationTokenQueryVariables>(ValidateVerificationTokenDocument, options);
      }
export function useValidateVerificationTokenLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ValidateVerificationTokenQuery, ValidateVerificationTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ValidateVerificationTokenQuery, ValidateVerificationTokenQueryVariables>(ValidateVerificationTokenDocument, options);
        }
// @ts-ignore
export function useValidateVerificationTokenSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ValidateVerificationTokenQuery, ValidateVerificationTokenQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ValidateVerificationTokenQuery, ValidateVerificationTokenQueryVariables>;
export function useValidateVerificationTokenSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ValidateVerificationTokenQuery, ValidateVerificationTokenQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ValidateVerificationTokenQuery | undefined, ValidateVerificationTokenQueryVariables>;
export function useValidateVerificationTokenSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ValidateVerificationTokenQuery, ValidateVerificationTokenQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ValidateVerificationTokenQuery, ValidateVerificationTokenQueryVariables>(ValidateVerificationTokenDocument, options);
        }
export type ValidateVerificationTokenQueryHookResult = ReturnType<typeof useValidateVerificationTokenQuery>;
export type ValidateVerificationTokenLazyQueryHookResult = ReturnType<typeof useValidateVerificationTokenLazyQuery>;
export type ValidateVerificationTokenQueryResult = ApolloReactCommon.QueryResult<ValidateVerificationTokenQuery, ValidateVerificationTokenQueryVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    access_token
    user {
      id
      email
      username
      isVerified
      role {
        id
        name
      }
      profile {
        firstName
        lastName
        pictureUrl
      }
      subscriptions {
        id
        plan
        status
        startDate
        endDate
      }
    }
  }
}
    `;
export type VerifyEmailMutationFn = ApolloReactCommon.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;
export function useVerifyEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = ApolloReactCommon.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const ResendVerificationEmailDocument = gql`
    mutation ResendVerificationEmail($email: String!) {
  resendVerificationEmail(email: $email)
}
    `;
export type ResendVerificationEmailMutationFn = ApolloReactCommon.MutationFunction<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>;
export function useResendVerificationEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>(ResendVerificationEmailDocument, options);
      }
export type ResendVerificationEmailMutationHookResult = ReturnType<typeof useResendVerificationEmailMutation>;
export type ResendVerificationEmailMutationResult = ApolloReactCommon.MutationResult<ResendVerificationEmailMutation>;
export type ResendVerificationEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>;
export const ComparePropertiesDocument = gql`
    query CompareProperties($input: ComparePropertiesInput!) {
  compareProperties(input: $input) {
    properties {
      id
      title
      titleEn
      slug
      slugEn
      priceUS
      priceBS
      bedrooms
      bathrooms
      totalArea
      coveredArea
      parkingSpaces
      yearBuilt
      furnished
      pool
      balcony
      terrace
      security
      storage
      address
      propertyTypeId
      dealTypeId
      latitude
      longitude
    }
    matrix {
      features {
        name
        values
      }
    }
  }
}
    `;
export function useComparePropertiesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ComparePropertiesQuery, ComparePropertiesQueryVariables> & ({ variables: ComparePropertiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ComparePropertiesQuery, ComparePropertiesQueryVariables>(ComparePropertiesDocument, options);
      }
export function useComparePropertiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ComparePropertiesQuery, ComparePropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ComparePropertiesQuery, ComparePropertiesQueryVariables>(ComparePropertiesDocument, options);
        }
// @ts-ignore
export function useComparePropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ComparePropertiesQuery, ComparePropertiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ComparePropertiesQuery, ComparePropertiesQueryVariables>;
export function useComparePropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ComparePropertiesQuery, ComparePropertiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ComparePropertiesQuery | undefined, ComparePropertiesQueryVariables>;
export function useComparePropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ComparePropertiesQuery, ComparePropertiesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ComparePropertiesQuery, ComparePropertiesQueryVariables>(ComparePropertiesDocument, options);
        }
export type ComparePropertiesQueryHookResult = ReturnType<typeof useComparePropertiesQuery>;
export type ComparePropertiesLazyQueryHookResult = ReturnType<typeof useComparePropertiesLazyQuery>;
export type ComparePropertiesQueryResult = ApolloReactCommon.QueryResult<ComparePropertiesQuery, ComparePropertiesQueryVariables>;
export const MyComparisonsDocument = gql`
    query MyComparisons {
  myComparisons {
    id
    propertyIds
    createdAt
  }
}
    `;
export function useMyComparisonsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyComparisonsQuery, MyComparisonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyComparisonsQuery, MyComparisonsQueryVariables>(MyComparisonsDocument, options);
      }
export function useMyComparisonsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyComparisonsQuery, MyComparisonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyComparisonsQuery, MyComparisonsQueryVariables>(MyComparisonsDocument, options);
        }
// @ts-ignore
export function useMyComparisonsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MyComparisonsQuery, MyComparisonsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyComparisonsQuery, MyComparisonsQueryVariables>;
export function useMyComparisonsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyComparisonsQuery, MyComparisonsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyComparisonsQuery | undefined, MyComparisonsQueryVariables>;
export function useMyComparisonsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyComparisonsQuery, MyComparisonsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MyComparisonsQuery, MyComparisonsQueryVariables>(MyComparisonsDocument, options);
        }
export type MyComparisonsQueryHookResult = ReturnType<typeof useMyComparisonsQuery>;
export type MyComparisonsLazyQueryHookResult = ReturnType<typeof useMyComparisonsLazyQuery>;
export type MyComparisonsQueryResult = ApolloReactCommon.QueryResult<MyComparisonsQuery, MyComparisonsQueryVariables>;
export const MyFavoritesDocument = gql`
    query MyFavorites {
  myFavorites {
    id
    propertyId
    priceAlertEnabled
    lastPrice
    notes
    createdAt
    property {
      id
      title
      titleEn
      slug
      slugEn
      description
      priceUS
      priceBS
      bedrooms
      bathrooms
      totalArea
      coveredArea
      status
      priority
      address
      latitude
      longitude
      propertyTypeId
      dealTypeId
      cityId
      zoneId
      createdAt
    }
  }
}
    `;
export function useMyFavoritesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyFavoritesQuery, MyFavoritesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyFavoritesQuery, MyFavoritesQueryVariables>(MyFavoritesDocument, options);
      }
export function useMyFavoritesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyFavoritesQuery, MyFavoritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyFavoritesQuery, MyFavoritesQueryVariables>(MyFavoritesDocument, options);
        }
// @ts-ignore
export function useMyFavoritesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MyFavoritesQuery, MyFavoritesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyFavoritesQuery, MyFavoritesQueryVariables>;
export function useMyFavoritesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyFavoritesQuery, MyFavoritesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyFavoritesQuery | undefined, MyFavoritesQueryVariables>;
export function useMyFavoritesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyFavoritesQuery, MyFavoritesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MyFavoritesQuery, MyFavoritesQueryVariables>(MyFavoritesDocument, options);
        }
export type MyFavoritesQueryHookResult = ReturnType<typeof useMyFavoritesQuery>;
export type MyFavoritesLazyQueryHookResult = ReturnType<typeof useMyFavoritesLazyQuery>;
export type MyFavoritesQueryResult = ApolloReactCommon.QueryResult<MyFavoritesQuery, MyFavoritesQueryVariables>;
export const IsFavoritedDocument = gql`
    query IsFavorited($propertyId: String!) {
  isFavorited(propertyId: $propertyId)
}
    `;
export function useIsFavoritedQuery(baseOptions: ApolloReactHooks.QueryHookOptions<IsFavoritedQuery, IsFavoritedQueryVariables> & ({ variables: IsFavoritedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<IsFavoritedQuery, IsFavoritedQueryVariables>(IsFavoritedDocument, options);
      }
export function useIsFavoritedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsFavoritedQuery, IsFavoritedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<IsFavoritedQuery, IsFavoritedQueryVariables>(IsFavoritedDocument, options);
        }
// @ts-ignore
export function useIsFavoritedSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<IsFavoritedQuery, IsFavoritedQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<IsFavoritedQuery, IsFavoritedQueryVariables>;
export function useIsFavoritedSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<IsFavoritedQuery, IsFavoritedQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<IsFavoritedQuery | undefined, IsFavoritedQueryVariables>;
export function useIsFavoritedSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<IsFavoritedQuery, IsFavoritedQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<IsFavoritedQuery, IsFavoritedQueryVariables>(IsFavoritedDocument, options);
        }
export type IsFavoritedQueryHookResult = ReturnType<typeof useIsFavoritedQuery>;
export type IsFavoritedLazyQueryHookResult = ReturnType<typeof useIsFavoritedLazyQuery>;
export type IsFavoritedQueryResult = ApolloReactCommon.QueryResult<IsFavoritedQuery, IsFavoritedQueryVariables>;
export const CountriesDocument = gql`
    query Countries {
  countries {
    id
    name
  }
}
    `;
export function useCountriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
      }
export function useCountriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
        }
// @ts-ignore
export function useCountriesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<CountriesQuery, CountriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CountriesQuery, CountriesQueryVariables>;
export function useCountriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CountriesQuery, CountriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CountriesQuery | undefined, CountriesQueryVariables>;
export function useCountriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
        }
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = ApolloReactCommon.QueryResult<CountriesQuery, CountriesQueryVariables>;
export const StatesDocument = gql`
    query States($countryId: Int!) {
  states(countryId: $countryId) {
    id
    name
    countryId
  }
}
    `;
export function useStatesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<StatesQuery, StatesQueryVariables> & ({ variables: StatesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<StatesQuery, StatesQueryVariables>(StatesDocument, options);
      }
export function useStatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StatesQuery, StatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<StatesQuery, StatesQueryVariables>(StatesDocument, options);
        }
// @ts-ignore
export function useStatesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<StatesQuery, StatesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<StatesQuery, StatesQueryVariables>;
export function useStatesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<StatesQuery, StatesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<StatesQuery | undefined, StatesQueryVariables>;
export function useStatesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<StatesQuery, StatesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<StatesQuery, StatesQueryVariables>(StatesDocument, options);
        }
export type StatesQueryHookResult = ReturnType<typeof useStatesQuery>;
export type StatesLazyQueryHookResult = ReturnType<typeof useStatesLazyQuery>;
export type StatesQueryResult = ApolloReactCommon.QueryResult<StatesQuery, StatesQueryVariables>;
export const CitiesDocument = gql`
    query Cities($stateId: Int!) {
  cities(stateId: $stateId) {
    id
    name
    stateId
    latitude
    longitude
  }
}
    `;
export function useCitiesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<CitiesQuery, CitiesQueryVariables> & ({ variables: CitiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
      }
export function useCitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
        }
// @ts-ignore
export function useCitiesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<CitiesQuery, CitiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CitiesQuery, CitiesQueryVariables>;
export function useCitiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CitiesQuery, CitiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CitiesQuery | undefined, CitiesQueryVariables>;
export function useCitiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
        }
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = ApolloReactCommon.QueryResult<CitiesQuery, CitiesQueryVariables>;
export const ZonesDocument = gql`
    query Zones($cityId: Int!) {
  zones(cityId: $cityId) {
    id
    name
    cityId
    latitude
    longitude
  }
}
    `;
export function useZonesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ZonesQuery, ZonesQueryVariables> & ({ variables: ZonesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ZonesQuery, ZonesQueryVariables>(ZonesDocument, options);
      }
export function useZonesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ZonesQuery, ZonesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ZonesQuery, ZonesQueryVariables>(ZonesDocument, options);
        }
// @ts-ignore
export function useZonesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ZonesQuery, ZonesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ZonesQuery, ZonesQueryVariables>;
export function useZonesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ZonesQuery, ZonesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ZonesQuery | undefined, ZonesQueryVariables>;
export function useZonesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ZonesQuery, ZonesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ZonesQuery, ZonesQueryVariables>(ZonesDocument, options);
        }
export type ZonesQueryHookResult = ReturnType<typeof useZonesQuery>;
export type ZonesLazyQueryHookResult = ReturnType<typeof useZonesLazyQuery>;
export type ZonesQueryResult = ApolloReactCommon.QueryResult<ZonesQuery, ZonesQueryVariables>;
export const MyConversationsDocument = gql`
    query MyConversations {
  myConversations {
    id
    participant1Id
    participant1 {
      id
      email
      profile {
        firstName
        lastName
        pictureUrl
      }
      subscriptions {
        id
        plan
        status
        endDate
      }
    }
    participant2Id
    participant2 {
      id
      email
      profile {
        firstName
        lastName
        pictureUrl
      }
      subscriptions {
        id
        plan
        status
        endDate
      }
    }
    propertyId
    lastMessageAt
    createdAt
    messages {
      id
      content
      senderId
      createdAt
      readAt
    }
  }
}
    `;
export function useMyConversationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyConversationsQuery, MyConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyConversationsQuery, MyConversationsQueryVariables>(MyConversationsDocument, options);
      }
export function useMyConversationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyConversationsQuery, MyConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyConversationsQuery, MyConversationsQueryVariables>(MyConversationsDocument, options);
        }
// @ts-ignore
export function useMyConversationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MyConversationsQuery, MyConversationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyConversationsQuery, MyConversationsQueryVariables>;
export function useMyConversationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyConversationsQuery, MyConversationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyConversationsQuery | undefined, MyConversationsQueryVariables>;
export function useMyConversationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyConversationsQuery, MyConversationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MyConversationsQuery, MyConversationsQueryVariables>(MyConversationsDocument, options);
        }
export type MyConversationsQueryHookResult = ReturnType<typeof useMyConversationsQuery>;
export type MyConversationsLazyQueryHookResult = ReturnType<typeof useMyConversationsLazyQuery>;
export type MyConversationsQueryResult = ApolloReactCommon.QueryResult<MyConversationsQuery, MyConversationsQueryVariables>;
export const ConversationMessagesDocument = gql`
    query ConversationMessages($conversationId: String!) {
  conversationMessages(conversationId: $conversationId) {
    id
    conversationId
    senderId
    sender {
      id
      email
      profile {
        firstName
        lastName
        pictureUrl
      }
      subscriptions {
        id
        plan
        status
        endDate
      }
    }
    receiverId
    receiver {
      id
      email
      profile {
        firstName
        lastName
        pictureUrl
      }
      subscriptions {
        id
        plan
        status
        endDate
      }
    }
    propertyId
    content
    status
    readAt
    createdAt
  }
}
    `;
export function useConversationMessagesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ConversationMessagesQuery, ConversationMessagesQueryVariables> & ({ variables: ConversationMessagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ConversationMessagesQuery, ConversationMessagesQueryVariables>(ConversationMessagesDocument, options);
      }
export function useConversationMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ConversationMessagesQuery, ConversationMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ConversationMessagesQuery, ConversationMessagesQueryVariables>(ConversationMessagesDocument, options);
        }
// @ts-ignore
export function useConversationMessagesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ConversationMessagesQuery, ConversationMessagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ConversationMessagesQuery, ConversationMessagesQueryVariables>;
export function useConversationMessagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ConversationMessagesQuery, ConversationMessagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ConversationMessagesQuery | undefined, ConversationMessagesQueryVariables>;
export function useConversationMessagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ConversationMessagesQuery, ConversationMessagesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ConversationMessagesQuery, ConversationMessagesQueryVariables>(ConversationMessagesDocument, options);
        }
export type ConversationMessagesQueryHookResult = ReturnType<typeof useConversationMessagesQuery>;
export type ConversationMessagesLazyQueryHookResult = ReturnType<typeof useConversationMessagesLazyQuery>;
export type ConversationMessagesQueryResult = ApolloReactCommon.QueryResult<ConversationMessagesQuery, ConversationMessagesQueryVariables>;
export const ConversationWithPropertyDocument = gql`
    query ConversationWithProperty($conversationId: String!) {
  conversationMessages(conversationId: $conversationId) {
    id
    conversationId
    propertyId
  }
}
    `;
export function useConversationWithPropertyQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ConversationWithPropertyQuery, ConversationWithPropertyQueryVariables> & ({ variables: ConversationWithPropertyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ConversationWithPropertyQuery, ConversationWithPropertyQueryVariables>(ConversationWithPropertyDocument, options);
      }
export function useConversationWithPropertyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ConversationWithPropertyQuery, ConversationWithPropertyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ConversationWithPropertyQuery, ConversationWithPropertyQueryVariables>(ConversationWithPropertyDocument, options);
        }
// @ts-ignore
export function useConversationWithPropertySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ConversationWithPropertyQuery, ConversationWithPropertyQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ConversationWithPropertyQuery, ConversationWithPropertyQueryVariables>;
export function useConversationWithPropertySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ConversationWithPropertyQuery, ConversationWithPropertyQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ConversationWithPropertyQuery | undefined, ConversationWithPropertyQueryVariables>;
export function useConversationWithPropertySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ConversationWithPropertyQuery, ConversationWithPropertyQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ConversationWithPropertyQuery, ConversationWithPropertyQueryVariables>(ConversationWithPropertyDocument, options);
        }
export type ConversationWithPropertyQueryHookResult = ReturnType<typeof useConversationWithPropertyQuery>;
export type ConversationWithPropertyLazyQueryHookResult = ReturnType<typeof useConversationWithPropertyLazyQuery>;
export type ConversationWithPropertyQueryResult = ApolloReactCommon.QueryResult<ConversationWithPropertyQuery, ConversationWithPropertyQueryVariables>;
export const NotificationsDocument = gql`
    query Notifications($page: Int, $limit: Int) {
  notifications(page: $page, limit: $limit) {
    data {
      id
      userId
      type
      title
      message
      data
      read
      readAt
      createdAt
    }
    meta {
      total
      page
      limit
      totalPages
    }
  }
}
    `;
export function useNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
// @ts-ignore
export function useNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<NotificationsQuery, NotificationsQueryVariables>;
export function useNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<NotificationsQuery | undefined, NotificationsQueryVariables>;
export function useNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = ApolloReactCommon.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const UnreadNotificationsCountDocument = gql`
    query UnreadNotificationsCount {
  unreadNotificationsCount
}
    `;
export function useUnreadNotificationsCountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>(UnreadNotificationsCountDocument, options);
      }
export function useUnreadNotificationsCountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>(UnreadNotificationsCountDocument, options);
        }
// @ts-ignore
export function useUnreadNotificationsCountSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>;
export function useUnreadNotificationsCountSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UnreadNotificationsCountQuery | undefined, UnreadNotificationsCountQueryVariables>;
export function useUnreadNotificationsCountSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>(UnreadNotificationsCountDocument, options);
        }
export type UnreadNotificationsCountQueryHookResult = ReturnType<typeof useUnreadNotificationsCountQuery>;
export type UnreadNotificationsCountLazyQueryHookResult = ReturnType<typeof useUnreadNotificationsCountLazyQuery>;
export type UnreadNotificationsCountQueryResult = ApolloReactCommon.QueryResult<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>;
export const MyPaymentsDocument = gql`
    query MyPayments {
  myPayments {
    id
    userId
    amount
    currency
    method
    status
    plan
    receiptUrl
    transactionId
    approvedAt
    rejectedReason
    createdAt
    updatedAt
  }
}
    `;
export function useMyPaymentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyPaymentsQuery, MyPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyPaymentsQuery, MyPaymentsQueryVariables>(MyPaymentsDocument, options);
      }
export function useMyPaymentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyPaymentsQuery, MyPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyPaymentsQuery, MyPaymentsQueryVariables>(MyPaymentsDocument, options);
        }
// @ts-ignore
export function useMyPaymentsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MyPaymentsQuery, MyPaymentsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyPaymentsQuery, MyPaymentsQueryVariables>;
export function useMyPaymentsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyPaymentsQuery, MyPaymentsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyPaymentsQuery | undefined, MyPaymentsQueryVariables>;
export function useMyPaymentsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyPaymentsQuery, MyPaymentsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MyPaymentsQuery, MyPaymentsQueryVariables>(MyPaymentsDocument, options);
        }
export type MyPaymentsQueryHookResult = ReturnType<typeof useMyPaymentsQuery>;
export type MyPaymentsLazyQueryHookResult = ReturnType<typeof useMyPaymentsLazyQuery>;
export type MyPaymentsQueryResult = ApolloReactCommon.QueryResult<MyPaymentsQuery, MyPaymentsQueryVariables>;
export const AvailablePaymentMethodsDocument = gql`
    query AvailablePaymentMethods {
  availablePaymentMethods
}
    `;
export function useAvailablePaymentMethodsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AvailablePaymentMethodsQuery, AvailablePaymentMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AvailablePaymentMethodsQuery, AvailablePaymentMethodsQueryVariables>(AvailablePaymentMethodsDocument, options);
      }
export function useAvailablePaymentMethodsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AvailablePaymentMethodsQuery, AvailablePaymentMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AvailablePaymentMethodsQuery, AvailablePaymentMethodsQueryVariables>(AvailablePaymentMethodsDocument, options);
        }
// @ts-ignore
export function useAvailablePaymentMethodsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AvailablePaymentMethodsQuery, AvailablePaymentMethodsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AvailablePaymentMethodsQuery, AvailablePaymentMethodsQueryVariables>;
export function useAvailablePaymentMethodsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AvailablePaymentMethodsQuery, AvailablePaymentMethodsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AvailablePaymentMethodsQuery | undefined, AvailablePaymentMethodsQueryVariables>;
export function useAvailablePaymentMethodsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AvailablePaymentMethodsQuery, AvailablePaymentMethodsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AvailablePaymentMethodsQuery, AvailablePaymentMethodsQueryVariables>(AvailablePaymentMethodsDocument, options);
        }
export type AvailablePaymentMethodsQueryHookResult = ReturnType<typeof useAvailablePaymentMethodsQuery>;
export type AvailablePaymentMethodsLazyQueryHookResult = ReturnType<typeof useAvailablePaymentMethodsLazyQuery>;
export type AvailablePaymentMethodsQueryResult = ApolloReactCommon.QueryResult<AvailablePaymentMethodsQuery, AvailablePaymentMethodsQueryVariables>;
export const CreatePaymentDocument = gql`
    mutation CreatePayment($input: CreatePaymentInput!) {
  createPayment(input: $input) {
    success
    paymentId
    status
    message
    instructions
    redirectUrl
  }
}
    `;
export type CreatePaymentMutationFn = ApolloReactCommon.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;
export function useCreatePaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = ApolloReactCommon.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const CancelPaymentDocument = gql`
    mutation CancelPayment($paymentId: String!) {
  cancelPayment(paymentId: $paymentId) {
    id
    status
  }
}
    `;
export type CancelPaymentMutationFn = ApolloReactCommon.MutationFunction<CancelPaymentMutation, CancelPaymentMutationVariables>;
export function useCancelPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelPaymentMutation, CancelPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CancelPaymentMutation, CancelPaymentMutationVariables>(CancelPaymentDocument, options);
      }
export type CancelPaymentMutationHookResult = ReturnType<typeof useCancelPaymentMutation>;
export type CancelPaymentMutationResult = ApolloReactCommon.MutationResult<CancelPaymentMutation>;
export type CancelPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelPaymentMutation, CancelPaymentMutationVariables>;
export const PropertiesDocument = gql`
    query Properties($page: Int, $limit: Int) {
  properties(page: $page, limit: $limit) {
    data {
      id
      title
      slug
      slugEn
      description
      priceUS
      priceBS
      address
      bedrooms
      bathrooms
      totalArea
      coveredArea
      latitude
      longitude
      status
      priority
      createdAt
      propertyTypeId
      dealTypeId
      cityId
      zoneId
      userId
      media {
        id
        url
        type
        order
      }
    }
    meta {
      total
      page
      limit
      totalPages
    }
  }
}
    `;
export function usePropertiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PropertiesQuery, PropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PropertiesQuery, PropertiesQueryVariables>(PropertiesDocument, options);
      }
export function usePropertiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PropertiesQuery, PropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PropertiesQuery, PropertiesQueryVariables>(PropertiesDocument, options);
        }
// @ts-ignore
export function usePropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PropertiesQuery, PropertiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PropertiesQuery, PropertiesQueryVariables>;
export function usePropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PropertiesQuery, PropertiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PropertiesQuery | undefined, PropertiesQueryVariables>;
export function usePropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PropertiesQuery, PropertiesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PropertiesQuery, PropertiesQueryVariables>(PropertiesDocument, options);
        }
export type PropertiesQueryHookResult = ReturnType<typeof usePropertiesQuery>;
export type PropertiesLazyQueryHookResult = ReturnType<typeof usePropertiesLazyQuery>;
export type PropertiesQueryResult = ApolloReactCommon.QueryResult<PropertiesQuery, PropertiesQueryVariables>;
export const PropertyDocument = gql`
    query Property($id: String!) {
  property(id: $id) {
    id
    title
    titleEn
    slug
    slugEn
    description
    descriptionEn
    priceUS
    priceBS
    phoneNumber
    address
    bedrooms
    bathrooms
    totalArea
    coveredArea
    parkingSpaces
    latitude
    longitude
    status
    priority
    yearBuilt
    furnished
    petsAllowed
    maintenanceFee
    propertyTax
    availableFrom
    virtualTourUrl
    floorPlanUrl
    condition
    stories
    elevators
    heating
    cooling
    security
    pool
    balcony
    terrace
    storage
    createdAt
    updatedAt
    propertyTypeId
    dealTypeId
    cityId
    zoneId
    stateId
    countryId
    userId
    agencyId
    media {
      id
      url
      type
      order
    }
    user {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
}
    `;
export function usePropertyQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PropertyQuery, PropertyQueryVariables> & ({ variables: PropertyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PropertyQuery, PropertyQueryVariables>(PropertyDocument, options);
      }
export function usePropertyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PropertyQuery, PropertyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PropertyQuery, PropertyQueryVariables>(PropertyDocument, options);
        }
// @ts-ignore
export function usePropertySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PropertyQuery, PropertyQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PropertyQuery, PropertyQueryVariables>;
export function usePropertySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PropertyQuery, PropertyQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PropertyQuery | undefined, PropertyQueryVariables>;
export function usePropertySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PropertyQuery, PropertyQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PropertyQuery, PropertyQueryVariables>(PropertyDocument, options);
        }
export type PropertyQueryHookResult = ReturnType<typeof usePropertyQuery>;
export type PropertyLazyQueryHookResult = ReturnType<typeof usePropertyLazyQuery>;
export type PropertyQueryResult = ApolloReactCommon.QueryResult<PropertyQuery, PropertyQueryVariables>;
export const SearchPropertiesDocument = gql`
    query SearchProperties($query: String, $filters: PropertyFiltersInput, $page: Int, $limit: Int) {
  searchProperties(
    input: {query: $query, filters: $filters, page: $page, limit: $limit}
  ) {
    data {
      id
      title
      slug
      slugEn
      description
      priceUS
      priceBS
      address
      bedrooms
      bathrooms
      totalArea
      coveredArea
      latitude
      longitude
      status
      priority
      createdAt
      propertyTypeId
      dealTypeId
      cityId
      zoneId
      userId
      media {
        id
        url
        type
        order
      }
    }
    meta {
      total
      page
      limit
      totalPages
    }
  }
}
    `;
export function useSearchPropertiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchPropertiesQuery, SearchPropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SearchPropertiesQuery, SearchPropertiesQueryVariables>(SearchPropertiesDocument, options);
      }
export function useSearchPropertiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchPropertiesQuery, SearchPropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SearchPropertiesQuery, SearchPropertiesQueryVariables>(SearchPropertiesDocument, options);
        }
// @ts-ignore
export function useSearchPropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<SearchPropertiesQuery, SearchPropertiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<SearchPropertiesQuery, SearchPropertiesQueryVariables>;
export function useSearchPropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<SearchPropertiesQuery, SearchPropertiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<SearchPropertiesQuery | undefined, SearchPropertiesQueryVariables>;
export function useSearchPropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<SearchPropertiesQuery, SearchPropertiesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<SearchPropertiesQuery, SearchPropertiesQueryVariables>(SearchPropertiesDocument, options);
        }
export type SearchPropertiesQueryHookResult = ReturnType<typeof useSearchPropertiesQuery>;
export type SearchPropertiesLazyQueryHookResult = ReturnType<typeof useSearchPropertiesLazyQuery>;
export type SearchPropertiesQueryResult = ApolloReactCommon.QueryResult<SearchPropertiesQuery, SearchPropertiesQueryVariables>;
export const CreatePropertyDocument = gql`
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
export type CreatePropertyMutationFn = ApolloReactCommon.MutationFunction<CreatePropertyMutation, CreatePropertyMutationVariables>;
export function useCreatePropertyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePropertyMutation, CreatePropertyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePropertyMutation, CreatePropertyMutationVariables>(CreatePropertyDocument, options);
      }
export type CreatePropertyMutationHookResult = ReturnType<typeof useCreatePropertyMutation>;
export type CreatePropertyMutationResult = ApolloReactCommon.MutationResult<CreatePropertyMutation>;
export type CreatePropertyMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePropertyMutation, CreatePropertyMutationVariables>;
export const MyPropertiesDocument = gql`
    query MyProperties($page: Int, $limit: Int) {
  myProperties(page: $page, limit: $limit) {
    data {
      id
      title
      titleEn
      description
      priceUS
      priceBS
      address
      bedrooms
      bathrooms
      totalArea
      coveredArea
      latitude
      longitude
      status
      priority
      createdAt
      propertyTypeId
      dealTypeId
      cityId
      zoneId
      media {
        id
        url
        type
        order
      }
      city {
        id
        name
      }
      propertyType {
        id
        name
      }
      analytics {
        id
        views
        clicks
        favorites
        inquiries
        phoneClicks
        emailClicks
        whatsappClicks
        shares
        conversionRate
      }
    }
    meta {
      total
      page
      limit
      totalPages
    }
  }
}
    `;
export function useMyPropertiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyPropertiesQuery, MyPropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyPropertiesQuery, MyPropertiesQueryVariables>(MyPropertiesDocument, options);
      }
export function useMyPropertiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyPropertiesQuery, MyPropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyPropertiesQuery, MyPropertiesQueryVariables>(MyPropertiesDocument, options);
        }
// @ts-ignore
export function useMyPropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MyPropertiesQuery, MyPropertiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyPropertiesQuery, MyPropertiesQueryVariables>;
export function useMyPropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyPropertiesQuery, MyPropertiesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyPropertiesQuery | undefined, MyPropertiesQueryVariables>;
export function useMyPropertiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyPropertiesQuery, MyPropertiesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MyPropertiesQuery, MyPropertiesQueryVariables>(MyPropertiesDocument, options);
        }
export type MyPropertiesQueryHookResult = ReturnType<typeof useMyPropertiesQuery>;
export type MyPropertiesLazyQueryHookResult = ReturnType<typeof useMyPropertiesLazyQuery>;
export type MyPropertiesQueryResult = ApolloReactCommon.QueryResult<MyPropertiesQuery, MyPropertiesQueryVariables>;
export const PropertyBySlugDocument = gql`
    query PropertyBySlug($slug: String!, $locale: String!) {
  propertyBySlug(slug: $slug, locale: $locale) {
    id
    title
    titleEn
    slug
    slugEn
    description
    descriptionEn
    priceUS
    priceBS
    phoneNumber
    address
    bedrooms
    bathrooms
    totalArea
    coveredArea
    parkingSpaces
    latitude
    longitude
    status
    priority
    yearBuilt
    furnished
    petsAllowed
    maintenanceFee
    propertyTax
    availableFrom
    virtualTourUrl
    floorPlanUrl
    condition
    stories
    elevators
    heating
    cooling
    security
    pool
    balcony
    terrace
    storage
    createdAt
    updatedAt
    propertyTypeId
    dealTypeId
    cityId
    zoneId
    stateId
    countryId
    userId
    agencyId
    media {
      id
      url
      type
      order
    }
    user {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
}
    `;
export function usePropertyBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PropertyBySlugQuery, PropertyBySlugQueryVariables> & ({ variables: PropertyBySlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PropertyBySlugQuery, PropertyBySlugQueryVariables>(PropertyBySlugDocument, options);
      }
export function usePropertyBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PropertyBySlugQuery, PropertyBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PropertyBySlugQuery, PropertyBySlugQueryVariables>(PropertyBySlugDocument, options);
        }
// @ts-ignore
export function usePropertyBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PropertyBySlugQuery, PropertyBySlugQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PropertyBySlugQuery, PropertyBySlugQueryVariables>;
export function usePropertyBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PropertyBySlugQuery, PropertyBySlugQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PropertyBySlugQuery | undefined, PropertyBySlugQueryVariables>;
export function usePropertyBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PropertyBySlugQuery, PropertyBySlugQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PropertyBySlugQuery, PropertyBySlugQueryVariables>(PropertyBySlugDocument, options);
        }
export type PropertyBySlugQueryHookResult = ReturnType<typeof usePropertyBySlugQuery>;
export type PropertyBySlugLazyQueryHookResult = ReturnType<typeof usePropertyBySlugLazyQuery>;
export type PropertyBySlugQueryResult = ApolloReactCommon.QueryResult<PropertyBySlugQuery, PropertyBySlugQueryVariables>;
export const MarketAnalysisDocument = gql`
    query MarketAnalysis($input: MarketAnalysisInput!) {
  marketAnalysis(input: $input) {
    cityId
    cityName
    propertyTypeId
    propertyTypeName
    totalProperties
    averagePriceUS
    averagePriceBS
    medianPriceUS
    medianPriceBS
    minPriceUS
    maxPriceUS
    averageArea
    pricePerSqmUS
    priceDistribution {
      range
      count
      percentage
    }
    propertyTypeDistribution {
      propertyType
      count
      percentage
      averagePrice
    }
  }
}
    `;
export function useMarketAnalysisQuery(baseOptions: ApolloReactHooks.QueryHookOptions<MarketAnalysisQuery, MarketAnalysisQueryVariables> & ({ variables: MarketAnalysisQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MarketAnalysisQuery, MarketAnalysisQueryVariables>(MarketAnalysisDocument, options);
      }
export function useMarketAnalysisLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MarketAnalysisQuery, MarketAnalysisQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MarketAnalysisQuery, MarketAnalysisQueryVariables>(MarketAnalysisDocument, options);
        }
// @ts-ignore
export function useMarketAnalysisSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MarketAnalysisQuery, MarketAnalysisQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MarketAnalysisQuery, MarketAnalysisQueryVariables>;
export function useMarketAnalysisSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MarketAnalysisQuery, MarketAnalysisQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MarketAnalysisQuery | undefined, MarketAnalysisQueryVariables>;
export function useMarketAnalysisSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MarketAnalysisQuery, MarketAnalysisQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MarketAnalysisQuery, MarketAnalysisQueryVariables>(MarketAnalysisDocument, options);
        }
export type MarketAnalysisQueryHookResult = ReturnType<typeof useMarketAnalysisQuery>;
export type MarketAnalysisLazyQueryHookResult = ReturnType<typeof useMarketAnalysisLazyQuery>;
export type MarketAnalysisQueryResult = ApolloReactCommon.QueryResult<MarketAnalysisQuery, MarketAnalysisQueryVariables>;
export const StatesForReportsDocument = gql`
    query StatesForReports($countryId: Int!) {
  states(countryId: $countryId) {
    id
    name
    cities {
      id
      name
    }
  }
}
    `;
export function useStatesForReportsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<StatesForReportsQuery, StatesForReportsQueryVariables> & ({ variables: StatesForReportsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<StatesForReportsQuery, StatesForReportsQueryVariables>(StatesForReportsDocument, options);
      }
export function useStatesForReportsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StatesForReportsQuery, StatesForReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<StatesForReportsQuery, StatesForReportsQueryVariables>(StatesForReportsDocument, options);
        }
// @ts-ignore
export function useStatesForReportsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<StatesForReportsQuery, StatesForReportsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<StatesForReportsQuery, StatesForReportsQueryVariables>;
export function useStatesForReportsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<StatesForReportsQuery, StatesForReportsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<StatesForReportsQuery | undefined, StatesForReportsQueryVariables>;
export function useStatesForReportsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<StatesForReportsQuery, StatesForReportsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<StatesForReportsQuery, StatesForReportsQueryVariables>(StatesForReportsDocument, options);
        }
export type StatesForReportsQueryHookResult = ReturnType<typeof useStatesForReportsQuery>;
export type StatesForReportsLazyQueryHookResult = ReturnType<typeof useStatesForReportsLazyQuery>;
export type StatesForReportsQueryResult = ApolloReactCommon.QueryResult<StatesForReportsQuery, StatesForReportsQueryVariables>;
export const MySavedSearchesDocument = gql`
    query MySavedSearches {
  mySavedSearches {
    id
    name
    query
    minPrice
    maxPrice
    bedrooms
    bathrooms
    propertyTypeId
    dealTypeId
    cityId
    zoneId
    alertsEnabled
    lastAlertAt
    createdAt
    updatedAt
  }
}
    `;
export function useMySavedSearchesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MySavedSearchesQuery, MySavedSearchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MySavedSearchesQuery, MySavedSearchesQueryVariables>(MySavedSearchesDocument, options);
      }
export function useMySavedSearchesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MySavedSearchesQuery, MySavedSearchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MySavedSearchesQuery, MySavedSearchesQueryVariables>(MySavedSearchesDocument, options);
        }
// @ts-ignore
export function useMySavedSearchesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MySavedSearchesQuery, MySavedSearchesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MySavedSearchesQuery, MySavedSearchesQueryVariables>;
export function useMySavedSearchesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MySavedSearchesQuery, MySavedSearchesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MySavedSearchesQuery | undefined, MySavedSearchesQueryVariables>;
export function useMySavedSearchesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MySavedSearchesQuery, MySavedSearchesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MySavedSearchesQuery, MySavedSearchesQueryVariables>(MySavedSearchesDocument, options);
        }
export type MySavedSearchesQueryHookResult = ReturnType<typeof useMySavedSearchesQuery>;
export type MySavedSearchesLazyQueryHookResult = ReturnType<typeof useMySavedSearchesLazyQuery>;
export type MySavedSearchesQueryResult = ApolloReactCommon.QueryResult<MySavedSearchesQuery, MySavedSearchesQueryVariables>;
export const SavedSearchDocument = gql`
    query SavedSearch($id: String!) {
  savedSearch(id: $id) {
    id
    name
    query
    minPrice
    maxPrice
    bedrooms
    bathrooms
    propertyTypeId
    dealTypeId
    cityId
    zoneId
    alertsEnabled
    lastAlertAt
    createdAt
    updatedAt
  }
}
    `;
export function useSavedSearchQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SavedSearchQuery, SavedSearchQueryVariables> & ({ variables: SavedSearchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SavedSearchQuery, SavedSearchQueryVariables>(SavedSearchDocument, options);
      }
export function useSavedSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SavedSearchQuery, SavedSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SavedSearchQuery, SavedSearchQueryVariables>(SavedSearchDocument, options);
        }
// @ts-ignore
export function useSavedSearchSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<SavedSearchQuery, SavedSearchQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<SavedSearchQuery, SavedSearchQueryVariables>;
export function useSavedSearchSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<SavedSearchQuery, SavedSearchQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<SavedSearchQuery | undefined, SavedSearchQueryVariables>;
export function useSavedSearchSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<SavedSearchQuery, SavedSearchQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<SavedSearchQuery, SavedSearchQueryVariables>(SavedSearchDocument, options);
        }
export type SavedSearchQueryHookResult = ReturnType<typeof useSavedSearchQuery>;
export type SavedSearchLazyQueryHookResult = ReturnType<typeof useSavedSearchLazyQuery>;
export type SavedSearchQueryResult = ApolloReactCommon.QueryResult<SavedSearchQuery, SavedSearchQueryVariables>;
export const CurrentSubscriptionDocument = gql`
    query CurrentSubscription {
  currentSubscription {
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
export function useCurrentSubscriptionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>(CurrentSubscriptionDocument, options);
      }
export function useCurrentSubscriptionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>(CurrentSubscriptionDocument, options);
        }
// @ts-ignore
export function useCurrentSubscriptionSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>;
export function useCurrentSubscriptionSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CurrentSubscriptionQuery | undefined, CurrentSubscriptionQueryVariables>;
export function useCurrentSubscriptionSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>(CurrentSubscriptionDocument, options);
        }
export type CurrentSubscriptionQueryHookResult = ReturnType<typeof useCurrentSubscriptionQuery>;
export type CurrentSubscriptionLazyQueryHookResult = ReturnType<typeof useCurrentSubscriptionLazyQuery>;
export type CurrentSubscriptionQueryResult = ApolloReactCommon.QueryResult<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>;
export const UserSubscriptionsDocument = gql`
    query UserSubscriptions {
  userSubscriptions {
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
export function useUserSubscriptionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>(UserSubscriptionsDocument, options);
      }
export function useUserSubscriptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>(UserSubscriptionsDocument, options);
        }
// @ts-ignore
export function useUserSubscriptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>;
export function useUserSubscriptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UserSubscriptionsQuery | undefined, UserSubscriptionsQueryVariables>;
export function useUserSubscriptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>(UserSubscriptionsDocument, options);
        }
export type UserSubscriptionsQueryHookResult = ReturnType<typeof useUserSubscriptionsQuery>;
export type UserSubscriptionsLazyQueryHookResult = ReturnType<typeof useUserSubscriptionsLazyQuery>;
export type UserSubscriptionsQueryResult = ApolloReactCommon.QueryResult<UserSubscriptionsQuery, UserSubscriptionsQueryVariables>;