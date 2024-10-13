
export type LoanStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface LoanApplication {
    customerId: string;
    loanAmount: number;
    repaymentPeriod: number;
    loanPurpose: string;
}

export interface LoanResponse {
    loadId: string;
    status: LoanStatus,
}
export interface LoanUpdate{
    loanAmount: number;
    repaymentPeriod: number;
}