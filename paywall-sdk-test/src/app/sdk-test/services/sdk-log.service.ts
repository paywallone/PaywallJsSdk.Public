import { Injectable } from '@angular/core';
import { FlowStep, SdkResponse } from '../models/sdk-types';

/**
 * Service for collecting and managing SDK logs
 */
@Injectable({
  providedIn: 'root'
})
export class SdkLogService {
  private logs: FlowStep[] = [];
  private maxLogs = 1000; // Prevent memory issues

  constructor() {}

  /**
   * Add a new log step
   */
  addStep(step: Omit<FlowStep, 'id' | 'timestamp'>): FlowStep {
    const fullStep: FlowStep = {
      ...step,
      id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };

    this.logs.push(fullStep);
    
    // Keep only last N logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    return fullStep;
  }

  /**
   * Get all logs
   */
  getLogs(): FlowStep[] {
    return [...this.logs];
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Copy logs as JSON to clipboard
   */
  async copyLogsAsJson(): Promise<boolean> {
    try {
      const logsJson = JSON.stringify(this.logs, null, 2);
      await navigator.clipboard.writeText(logsJson);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Mask sensitive data in request/response
   */
  maskSensitiveData(data: any): any {
    if (!data || typeof data !== 'object') {
      return data;
    }

    const masked = { ...data };

    // Mask card numbers
    if (masked.cardNumber) {
      masked.cardNumber = this.maskCardNumber(masked.cardNumber);
    }
    if (masked.cardData?.cardNumber) {
      masked.cardData = {
        ...masked.cardData,
        cardNumber: this.maskCardNumber(masked.cardData.cardNumber)
      };
    }

    // Mask CVV
    if (masked.cvv) {
      masked.cvv = '***';
    }
    if (masked.cardData?.cvv) {
      masked.cardData = {
        ...masked.cardData,
        cvv: '***'
      };
    }

    // Mask tokens
    if (masked.token) {
      masked.token = this.maskToken(masked.token);
    }
    if (masked.masterpassToken) {
      masked.masterpassToken = this.maskToken(masked.masterpassToken);
    }
    if (masked.accessToken) {
      masked.accessToken = this.maskToken(masked.accessToken);
    }

    // Mask OTP (optional, can be shown in test)
    if (masked.otp) {
      masked.otp = '***';
    }
    if (masked.otpCode) {
      masked.otpCode = '***';
    }

    return masked;
  }

  /**
   * Mask card number
   */
  private maskCardNumber(cardNumber: string): string {
    if (!cardNumber || cardNumber.length < 8) return '****';
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.length >= 16) {
      return cleaned.substring(0, 4) + ' **** **** ' + cleaned.substring(cleaned.length - 4);
    }
    return cleaned.substring(0, 4) + '***' + cleaned.substring(cleaned.length - 4);
  }

  /**
   * Mask token
   */
  private maskToken(token: string): string {
    if (!token || token.length < 8) return '***';
    return token.substring(0, 6) + '...' + token.substring(token.length - 4);
  }

  /**
   * Normalize SDK response
   */
  normalizeResponse(response: SdkResponse): {
    success: boolean;
    status: 'SUCCESS' | 'ACTION_REQUIRED' | 'FAILED' | 'ERROR';
    actionType?: string;
    message?: string;
  } {
    const status = response.status || (response.success ? 'SUCCESS' : 'FAILED');
    return {
      success: response.success === true || status === 'SUCCESS',
      status: status as 'SUCCESS' | 'ACTION_REQUIRED' | 'FAILED' | 'ERROR',
      actionType: response.actionType,
      message: response.message || response.errorMessage
    };
  }
}
