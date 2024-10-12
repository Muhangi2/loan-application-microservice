import React from "react";
import { LoanApplication } from "../types";

interface Props {
  loanApplication: LoanApplication;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
}

const LoanApplicationForm: React.FC<Props> = ({
  loanApplication,
  onInputChange,
  onSubmit,
  submitButtonText,
}) => (
  <form onSubmit={onSubmit} className="mb-8">
    <div className="mb-4">
      <label
        htmlFor="customerId"
        className="block text-sm font-medium text-gray-700"
      >
        Customer ID
      </label>
      <input
        type="text"
        id="customerId"
        name="customerId"
        value={loanApplication.customerId}
        onChange={onInputChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        required
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="loanAmount"
        className="block text-sm font-medium text-gray-700"
      >
        Loan Amount
      </label>
      <input
        type="number"
        id="loanAmount"
        name="loanAmount"
        value={loanApplication.loanAmount}
        onChange={onInputChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        required
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="repaymentPeriod"
        className="block text-sm font-medium text-gray-700"
      >
        Repayment Period (months)
      </label>
      <input
        type="number"
        id="repaymentPeriod"
        name="repaymentPeriod"
        value={loanApplication.repaymentPeriod}
        onChange={onInputChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        required
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="loanPurpose"
        className="block text-sm font-medium text-gray-700"
      >
        Loan Purpose
      </label>
      <textarea
        id="loanPurpose"
        name="loanPurpose"
        value={loanApplication.loanPurpose}
        onChange={onInputChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        required
      ></textarea>
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {submitButtonText}
    </button>
  </form>
);

export default LoanApplicationForm;
