// src/__tests__/loansRoutes.test.ts
import request from 'supertest';
import app from '../app';

describe('Loan API', () => {
    it('should apply for a loan', async () => {
        const response = await request(app).post('/api/loans/apply').send({
            customerId: '12345',
            loanAmount: 1000,
            repaymentPeriod: 12,
            loanPurpose: 'Home renovation',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('loanId');
        expect(response.body.message).toBe('Loan application successful');
    }, 10000); 

    it('should get the status of a loan', async () => {

        const newLoanResponse = await request(app).post('/api/loans/apply').send({
            customerId: '12345',
            loanAmount: 1000,
            repaymentPeriod: 12,
            loanPurpose: 'Home renovation',
        });

        const loanId = newLoanResponse.body.loanId; 

       
        const response = await request(app).get(`/api/loans/${loanId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', loanId); 
        expect(response.body).toHaveProperty('customerId', '12345');
        expect(response.body).toHaveProperty('loanAmount', 1000);
        expect(response.body).toHaveProperty('loanPurpose', 'Home renovation');
        expect(response.body).toHaveProperty('repaymentPeriod', 12);
        expect(response.body).toHaveProperty('status', 'PENDING');
    });

    it('should return 400 for an invalid loan ID', async () => {
        const response = await request(app).get('/api/loans/invalidLoanId');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid loan ID');
    });

    it('should update a loan', async () => {
        // Create a loan first to update
        const newLoanResponse = await request(app).post('/api/loans/apply').send({
            customerId: '12345',
            loanAmount: 1000,
            repaymentPeriod: 12,
            loanPurpose: 'Home renovation',
        });

        const loanId = newLoanResponse.body.loanId; 

 
        const response = await request(app)
            .put(`/api/loans/${loanId}`)
            .send({ loanAmount: 2000 });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('loanId', loanId);
        expect(response.body.message).toBe('Loan updated successfully');
    });

    it('should get all loans', async () => {
        const response = await request(app).get('/api/loans');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
