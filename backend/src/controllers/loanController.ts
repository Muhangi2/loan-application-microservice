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
        res.status(201).json({ loanId: newLoan._id, message: 'Loan application successful' });
    } catch (error) {
        next(error);
    }
};

// Get loan status by loanId
export const getLoanStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { loanId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(loanId)) {
            res.status(400).json({ message: 'Invalid loan ID' });
            return;
        }

        const loan = await Loan.findById(loanId);
        if (!loan) {
            res.status(404).json({ message: 'Loan not found' });
            return
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

        res.json(updatedLoan);
        return
    } catch (error) {
        next(error);
    }
};
