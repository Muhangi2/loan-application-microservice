import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import LoanApplicationForm from "../ui/LoadApplicationForm";

import { checkLoanStatus } from "../services/api";
import LoadStatusUpdate from "@/ui/LoadStatusUpdate";

const LoanApplication = () => {
  const [loanId, setLoanId] = useState("");
  const [loanStatus, setLoanStatus] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({});

  //   const handleUpdateSubmit = async (formData) => {
  //     if (!loanId) {
  //       toast.warn("Please enter a loan ID");
  //       return;
  //     }
  //     try {
  //       await updateLoanApplication(loanId, formData);
  //       toast.success("Loan application updated successfully");
  //     } catch (error) {
  //       toast.error("Failed to update loan application.");
  //     }
  //   };

  return (
    <div className="container mx-auto  p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Loan Application System
      </h1>

      <Tabs defaultValue="apply" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
          <TabsTrigger value="status">View Loan Status</TabsTrigger>
          <TabsTrigger value="update">Update Loan</TabsTrigger>
        </TabsList>
        <TabsContent value="apply">
          <Card>
            <CardHeader>
              <CardTitle>Apply for Loan</CardTitle>
              <CardDescription>
                Fill out the form to apply for a new loan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoanApplicationForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="status">
          <LoadStatusUpdate />
        </TabsContent>
        <TabsContent value="update">
          <Card>
            <CardHeader>
              <CardTitle>Update Loan</CardTitle>
              <CardDescription>
                Enter your loan ID and update your application details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={loanId}
                onChange={(e) => setLoanId(e.target.value)}
                placeholder="Enter Loan ID"
              />
              <LoanApplicationForm
              // onSubmit={handleUpdateSubmit}
              // initialValues={updateFormData}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoanApplication;
