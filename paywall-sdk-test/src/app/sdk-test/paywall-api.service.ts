import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaywallApiService {
  private baseUrl = 'http://localhost:5000/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  private getHeaders(): HttpHeaders {
    if (!this.token) {
      throw new Error('Token is required. Please set token first.');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    });
  }

  /**
   * Create Masterpass session
   * POST /api/paywall/masterpass/by/sdk/session
   */
  createSession(params: {
    userId: string;
    userPhone: string;
    force3D: boolean;
    phoneVerifiedByMerchant: boolean;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/paywall/masterpass/by/sdk/session`,
      params,
      { headers: this.getHeaders() }
    );
  }

  /**
   * Initialize payment
   * POST /payment/init
   */
  initPayment(params: {
    sessionId: string;
    paymentDetail: any;
    card: any;
    customer: any;
    products: any[];
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/payment/init`,
      params,
      { headers: this.getHeaders() }
    );
  }

  /**
   * Mark payment as started
   * POST /api/paywall/masterpass/by/sdk/payment/mark-as-started
   */
  markAsStarted(params: {
    masterpassPaymentId: string;
    paymentType: string;
    threeDAddress?: string;
    masterpassOrderId?: string;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/paywall/masterpass/by/sdk/payment/mark-as-started`,
      params,
      { headers: this.getHeaders() }
    );
  }
}
