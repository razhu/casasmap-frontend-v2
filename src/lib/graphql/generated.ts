import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
  participant1Id: Scalars['ID']['output'];
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

export type CreateInquiryInput = {
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  propertyId: Scalars['String']['input'];
};

export type CreatePaymentInput = {
  method: PaymentMethod;
  plan: Scalars['String']['input'];
};

export type CreatePropertyInput = {
  address: Scalars['String']['input'];
  agencyId?: InputMaybe<Scalars['String']['input']>;
  bathrooms?: InputMaybe<Scalars['Int']['input']>;
  bedrooms?: InputMaybe<Scalars['Int']['input']>;
  cityId: Scalars['Int']['input'];
  countryId: Scalars['Int']['input'];
  coveredArea?: InputMaybe<Scalars['Float']['input']>;
  dealTypeId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  descriptionEn: Scalars['String']['input'];
  furnished?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  parkingSpaces?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  priceBS?: InputMaybe<Scalars['Float']['input']>;
  priceUS?: InputMaybe<Scalars['Float']['input']>;
  propertyTypeId: Scalars['Int']['input'];
  sponsorshipTier?: InputMaybe<SponsorshipTier>;
  stateId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  titleEn: Scalars['String']['input'];
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

export enum InquiryStatus {
  Closed = 'CLOSED',
  New = 'NEW',
  Read = 'READ',
  Replied = 'REPLIED'
}

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
  receiverId: Scalars['ID']['output'];
  senderId: Scalars['ID']['output'];
  status: MessageStatus;
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
  deleteMedia: Media;
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
  register: AuthResponse;
  /** Reject payment (admin only) */
  rejectPayment: Payment;
  rejectProperty: Property;
  removeFavorite: Scalars['Boolean']['output'];
  removeUserFromAgency: User;
  /** Reset password with token from email */
  resetPassword: Scalars['Boolean']['output'];
  saveComparison: PropertyComparison;
  sendEmailCampaign: EmailCampaign;
  sendMessage: Message;
  sendPropertyAlerts: PropertyAlertResult;
  sendPropertyInquiry: PropertyInquiry;
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
  unsubscribeEmail: EmailSubscriber;
  updateAgency: Agency;
  updateFavorite: Favorite;
  updateInquiryStatus: PropertyInquiry;
  updateMedia: Media;
  updateProfile: Profile;
  updateProperty: Property;
  updateSavedSearch: SavedSearch;
  updateSetting: SystemConfig;
  updateTag: Tag;
  uploadMedia: UploadResponse;
  /** Upload payment receipt (for manual payments) */
  uploadReceipt: Payment;
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


export type MutationDeleteMediaArgs = {
  id: Scalars['String']['input'];
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


export type MutationSendPropertyInquiryArgs = {
  input: CreateInquiryInput;
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


export type MutationUpdateInquiryStatusArgs = {
  inquiryId: Scalars['String']['input'];
  status: InquiryStatus;
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


export type MutationUploadMediaArgs = {
  uploadMediaInput: UploadMediaInput;
};


export type MutationUploadReceiptArgs = {
  input: UploadReceiptInput;
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
  availableFrom?: Maybe<Scalars['DateTime']['output']>;
  balcony?: Maybe<Scalars['Boolean']['output']>;
  bathrooms?: Maybe<Scalars['Int']['output']>;
  bedrooms?: Maybe<Scalars['Int']['output']>;
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

export type PropertyInquiry = {
  __typename?: 'PropertyInquiry';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  property?: Maybe<Property>;
  propertyId: Scalars['ID']['output'];
  source: Scalars['String']['output'];
  status: InquiryStatus;
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['ID']['output']>;
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
  inquiry: PropertyInquiry;
  isFavorited: Scalars['Boolean']['output'];
  marketAnalysis: MarketAnalysisReport;
  me: User;
  myComparisons: Array<PropertyComparison>;
  myConversations: Array<Conversation>;
  myFavorites: Array<Favorite>;
  myInquiries: Array<PropertyInquiry>;
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
  propertyInquiries: Array<PropertyInquiry>;
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


export type QueryInquiryArgs = {
  inquiryId: Scalars['String']['input'];
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


export type QueryPropertyInquiriesArgs = {
  propertyId: Scalars['String']['input'];
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


export type QueryZonesArgs = {
  cityId: Scalars['Int']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
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
  bathrooms?: InputMaybe<Scalars['Int']['input']>;
  bedrooms?: InputMaybe<Scalars['Int']['input']>;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  countryId?: InputMaybe<Scalars['Int']['input']>;
  coveredArea?: InputMaybe<Scalars['Float']['input']>;
  dealTypeId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  descriptionEn?: InputMaybe<Scalars['String']['input']>;
  furnished?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  parkingSpaces?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  priceBS?: InputMaybe<Scalars['Float']['input']>;
  priceUS?: InputMaybe<Scalars['Float']['input']>;
  propertyTypeId?: InputMaybe<Scalars['Int']['input']>;
  sponsorshipTier?: InputMaybe<SponsorshipTier>;
  stateId?: InputMaybe<Scalars['Int']['input']>;
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, username?: string | null, roleId: number, status: string, isVerified: boolean, createdAt: any, role: { __typename?: 'Role', id: number, name: string }, profile?: { __typename?: 'Profile', id: string, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, pictureUrl?: string | null, bio?: string | null } | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', access_token: string, user: { __typename?: 'User', id: string, email: string, username?: string | null, role: { __typename?: 'Role', id: number, name: string }, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null, pictureUrl?: string | null } | null } } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', access_token: string, user: { __typename?: 'User', id: string, email: string, username?: string | null, role: { __typename?: 'Role', id: number, name: string }, profile?: { __typename?: 'Profile', firstName?: string | null, lastName?: string | null } | null } } };

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
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
// @ts-ignore
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
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
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
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
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(input: {email: $email})
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(input: {token: $token, newPassword: $newPassword})
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
  changePassword(
    input: {currentPassword: $currentPassword, newPassword: $newPassword}
  )
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;