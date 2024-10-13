import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import LoanApplicationForm from "../ui/LoadApplicationForm";
import LoadStatusUpdate from "@/ui/LoadStatusUpdate";

const LoanApplication = () => {
  return (
    <div className="container mx-auto  p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Loan Application System
      </h1>

      <Tabs defaultValue="apply" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
          <TabsTrigger value="status">View Loan Status</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default LoanApplication;
