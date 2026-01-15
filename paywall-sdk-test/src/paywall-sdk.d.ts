declare global {
  interface Window {
    PaywallJsSdk: PaywallJsSdkType;
    PaywallSDK: {
      PaywallJsSdk: PaywallJsSdkType;
    };
  }
}

interface PaywallJsSdkType {
  Init: (params: {
    merchantId: string;
    token: string;
    environment: 'dev' | 'test' | 'prod';
  }) => Promise<any>;
  providers: {
    masterpass: {
      init: (params?: any) => Promise<any>;
      addCard: (params?: any) => Promise<any>;
      deleteCard: (params?: any) => Promise<any>;
      verifyOtp: (params?: any) => Promise<any>;
      merchantLink: (params?: any) => Promise<any>;
      [key: string]: any;
    };
    [key: string]: any;
  };
  payment: {
    init: (params?: any) => Promise<any>;
    [key: string]: any;
  };
  ExternalService: {
    Masterpass: {
      startSession: (params?: any) => Promise<any>;
      [key: string]: any;
    };
    [key: string]: any;
  };
  InternalService: any;
  utils: any;
  [key: string]: any;
}

export {};
