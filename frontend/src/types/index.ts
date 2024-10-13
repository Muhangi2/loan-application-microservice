
export type LoanStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface LoanApplication {
    customerId: string;
    loanAmount: number;
    repaymentPeriod: number;
    loanPurpose: string;
}


export interface LoanUpdate {
    loanAmount?: number;
    repaymentPeriod?: number;
}
export interface LoanResponse {
    loanId: string;
    customerId: string;
    loanAmount: number;
    repaymentPeriod: number;
    loanPurpose: string;
    status: LoanStatus;
  }
  

