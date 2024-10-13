import React, { useState, useEffect } from "react";
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
import { checkLoanStatus, fetchAllLoans } from "../services/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLoanApplication } from "../services/api";

const LoadStatusUpdate = () => {
  const [selectedLoanId, setSelectedLoanId] = useState("");
  const [loanStatus, setLoanStatus] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    loanAmount: 0,
    repaymentPeriod: 0,
  });
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [loanIds, setLoanIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const ids = await fetchAllLoans();
        setLoanIds(ids);
      } catch (error) {
        console.error("Error fetching loan IDs:", error);
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
      toast.error("Failed to fetch loan status.");
    }
  };

  const handleUpdateLoan = async () => {
    if (!selectedLoanId) {
      toast.warn("Please select a loan ID to update");
      return;
    }
    setIsUpdateDialogOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const Response = await updateLoanApplication(
      selectedLoanId,
      updateFormData
    );
    console.log(Response, "Response");
    toast.success("Loan updated successfully!");
    setLoading(false);
    setIsUpdateDialogOpen(false);
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
                  <p>Loan Amount: ${loanStatus.loanAmount}</p>
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
              {/* Include your update form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <ToastContainer />

                {/* Loan Amount */}
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <Input
                    type="number"
                    id="loanAmount"
                    name="loanAmount"
                    value={updateFormData.loanAmount}
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
                    value={updateFormData.repaymentPeriod}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Loan Purpose */}
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
