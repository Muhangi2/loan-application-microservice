import { LoanApplication, LoanResponse, LoanUpdate } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const applyForLoan = async (application: LoanApplication): Promise<LoanResponse> => {
    const response = await fetch(`${API_BASE_URL}/loans/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
    });
    if (!response.ok) throw new Error('Failed to submit loan application');
    return response.json();
};

export const checkLoanStatus = async (loanId: string): Promise<LoanResponse> => {
    const response = await fetch(`${API_BASE_URL}/loans/${loanId}`);
    if (!response.ok) throw new Error('Failed to fetch loan status');
    return response.json();
};

export const updateLoanApplication = async (loanId: string, LoanUpdate: Partial<LoanUpdate>): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/loans/${loanId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(LoanUpdate),
    });
    if (!response.ok) throw new Error('Failed to update loan application');
};
export const fetchAllLoans = async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/loans`);
    if (!response.ok) throw new Error('Failed to fetch loans');

    const loanIds: string[] = await response.json();
    return loanIds;
};

// setLoanIds(ids);