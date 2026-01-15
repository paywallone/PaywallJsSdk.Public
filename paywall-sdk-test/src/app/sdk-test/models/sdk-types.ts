/**
 * SDK Response Types and Interfaces
 */

export type ActionType = 
  | 'MASTERPASS_OTP_REQUIRED'
  | 'BANK_OTP_REQUIRED'
  | 'MERCHANT_LINK_REQUIRED'
  | 'SESSION_EXPIRED'
  | 'HEADER_MISSING'
  | 'INVALID_USER_PHONE'
  | 'INVALID_MERCHANT_ID'
  | '3D'
  | 'THREE_D'
  | string;

export type ResponseStatus = 'SUCCESS' | 'ACTION_REQUIRED' | 'FAILED' | 'ERROR';

export interface SdkResponse<T = any> {
  success?: boolean;
  status?: ResponseStatus;
  actionType?: ActionType;
  message?: string;
  errorMessage?: string;
  data?: T;
  redirectUrl?: string;
  [key: string]: any;
}

export interface CardInfo {
  alias: string;
  cardBin?: string;
  cardMasked?: string;
  maskedCardNumber?: string; // SDK response format
  maskedNumber?: string; // Alternative SDK format
  ownerName?: string;
  expiryDate?: string;
  uniqueCardNumber?: string;
  isDefault?: boolean;
  isDefaultCard?: boolean; // SDK response format
  [key: string]: any;
}

export interface CardListResponse {
  cards?: CardInfo[];
  cardList?: CardInfo[];
  [key: string]: any;
}

export interface FlowStep {
  id: string;
  timestamp: Date;
  actionName: string;
  request?: any;
  response?: SdkResponse;
  normalizedResult?: {
    success: boolean;
    status: ResponseStatus;
    actionType?: ActionType;
    message?: string;
  };
  error?: string;
}

export interface FlowState {
  currentToken?: string;
  sessionId?: string;
  providerInitialized: boolean;
  linkedState: boolean;
  cardCount: number;
  cards: CardInfo[];
  environment: 'dev' | 'test' | 'prod';
  userId?: string;
  userPhone?: string;
  // OTP blocking state
  awaitingOtp?: boolean;
  pendingAction?: 'merchantLink' | 'accountAccess' | null;
  otpToken?: string | null;
}
