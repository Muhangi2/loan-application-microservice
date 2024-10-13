import { Request, Response, NextFunction, RequestHandler } from 'express';
import Loan from '../models/Loan';
import mongoose from 'mongoose';

// Create a loan application
export const applyLoan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { customerId, loanAmount, repaymentPeriod, loanPurpose } = req.body;


        const newLoan = new Loan({
            customerId,
            loanAmount,
            repaymentPeriod,
            loanPurpose
        });

        await newLoan.save();
        res.status(201).json({ loanId: newLoan._id, status: newLoan.status, message: 'Loan application successful', });
    } catch (error) {
        next(error);
    }
};

// Get loan status by loanId
export const getLoanStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const { loanId } = req.params;
        console.log(loanId, "loadId");
        if (!mongoose.Types.ObjectId.isValid(loanId)) {
            res.status(400).json({ message: 'Invalid loan ID' });
            return;
        }
        const loan = await Loan.findById(loanId).select('_id customerId loanAmount repaymentPeriod loanPurpose status');
        if (!loan) {
            res.status(404).json({ message: 'Loan not found' });
            return;
        }

        res.json(loan);
        return
    } catch (error) {
        next(error);
    }
};

// Update loan details by loanId
export const updateLoan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { loanId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(loanId)) {
            res.status(400).json({ message: 'Invalid loan ID' });
            return;
        }

        const updatedLoan = await Loan.findByIdAndUpdate(loanId, req.body, { new: true });
        if (!updatedLoan) {
            res.status(404).json({ message: 'Loan not found' });
            return
        }
        res.status(201).json({ loanId: updatedLoan._id, status: updatedLoan.status, message: 'Loan updated successfully', });

        return
    } catch (error) {
        next(error);
    }
};

//fetching all the loans
export const getAllLoans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const loans = await Loan.find().select('_id');
        if (loans.length === 0) {
            res.status(404).json({ message: 'No loans found' });
            return;
        }
        const loanIds = loans.map(loan => loan._id);
        res.status(200).json(loanIds);
    } catch (error) {
        next(error);
    }
};
