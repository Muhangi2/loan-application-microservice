// src/components/LoadStatusUpdate.tsx

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  checkLoanStatus,
  fetchAllLoans,
  updateLoanApplication,
} from "../services/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoanResponse, LoanUpdate } from "../types";

const LoadStatusUpdate: React.FC = () => {
  const [selectedLoanId, setSelectedLoanId] = useState<string>("");
  const [loanStatus, setLoanStatus] = useState<LoanResponse | null>(null);
  const [updateFormData, setUpdateFormData] = useState<Partial<LoanUpdate>>({
    loanAmount: undefined,
    repaymentPeriod: undefined,
  });
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState<boolean>(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [loanIds, setLoanIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const ids = await fetchAllLoans();
        setLoanIds(ids);
      } catch (error) {
        console.error("Error fetching loan IDs:", error);
        toast.error("Error fetching loan IDs.");
      }
    };

    fetchLoans();
  }, []);

  const handleStatusCheck = async () => {
    if (!selectedLoanId) {
      toast.warn("Please select a loan ID");
      return;
    }
    try {
      const response = await checkLoanStatus(selectedLoanId);
      setLoanStatus(response);
      setIsStatusDialogOpen(true);
    } catch (error) {
      console.error("Error fetching loan status:", error);
      toast.error("Failed to fetch loan status.");
    }
  };

  const handleUpdateLoan = () => {
    if (!selectedLoanId) {
      toast.warn("Please select a loan ID to update");
      return;
    }
    setIsUpdateDialogOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: value === "" ? undefined : Number(value),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedLoanId) {
      toast.warn("Please select a loan ID to update");
      return;
    }

    const dataToUpdate: Partial<LoanUpdate> = {};
    if (updateFormData.loanAmount !== undefined)
      dataToUpdate.loanAmount = updateFormData.loanAmount;
    if (updateFormData.repaymentPeriod !== undefined)
      dataToUpdate.repaymentPeriod = updateFormData.repaymentPeriod;

    if (Object.keys(dataToUpdate).length === 0) {
      toast.warn("Please provide at least one field to update.");
      return;
    }

    setLoading(true);
    try {
      await updateLoanApplication(selectedLoanId, dataToUpdate);
      toast.success("Loan updated successfully!");
      setIsUpdateDialogOpen(false);
      // Optionally, refresh loan status or data here
    } catch (error) {
      console.error("Error updating loan:", error);
      toast.error("Failed to update loan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>View Loan Status</CardTitle>
          <CardDescription>
            Select your loan ID to check the status or update the loan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <select
              value={selectedLoanId}
              onChange={(e) => setSelectedLoanId(e.target.value)}
              className="border rounded-md p-2"
            >
              <option value="">Select Loan ID</option>
              {loanIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
            <Button onClick={handleStatusCheck}>Check Status</Button>
            <Button onClick={handleUpdateLoan}>Update Loan</Button>
          </div>
        </CardContent>
      </Card>

      {/* Loan Status Modal */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loan Status</DialogTitle>
            <DialogDescription>
              {loanStatus && (
                <>
                  <p>Status: {loanStatus.status}</p>
                  <p>Customer ID: {loanStatus.customerId}</p>
                  <p>Loan Amount: {loanStatus.loanAmount}</p>
                  <p>Repayment Period: {loanStatus.repaymentPeriod} months</p>
                  <p>Loan Purpose: {loanStatus.loanPurpose}</p>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsStatusDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Loan Modal */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Loan</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit} className="space-y-4">
                <ToastContainer />

                {/* Loan Amount */}
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <Input
                    type="number"
                    id="loanAmount"
                    name="loanAmount"
                    value={
                      updateFormData.loanAmount !== undefined
                        ? updateFormData.loanAmount
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Repayment Period */}
                <div className="space-y-2">
                  <Label htmlFor="repaymentPeriod">
                    Repayment Period (months)
                  </Label>
                  <Input
                    type="number"
                    id="repaymentPeriod"
                    name="repaymentPeriod"
                    value={
                      updateFormData.repaymentPeriod !== undefined
                        ? updateFormData.repaymentPeriod
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsUpdateDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default LoadStatusUpdate;
