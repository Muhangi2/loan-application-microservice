import mongoose, { Document, Schema } from 'mongoose';

export interface ILoan extends Document {
  customerId: string;
  loanAmount: number;
  repaymentPeriod: number;  
  loanPurpose: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const LoanSchema: Schema = new Schema({
  customerId: { type: String, required: true, index: true }, 
  loanAmount: { type: Number, required: true },
  repaymentPeriod: { type: Number, required: true },
  loanPurpose: { type: String, required: true },
  status: { type: String, default: 'PENDING' },
}, { timestamps: true });


LoanSchema.index({ status: 1 });

export default mongoose.model<ILoan>('Loan', LoanSchema);
