
type LoanStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface LoanApplication {
    customerId: string;
    loanAmount: number;
    repaymentPeriod: number;
    loanPurpose: string;
}
interface LoanResponse {
    loadId: string;
    status: LoanStatus,
}