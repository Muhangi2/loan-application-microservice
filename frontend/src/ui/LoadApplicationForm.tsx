import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { applyForLoan } from "../services/api";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    loanAmount: "",
    repaymentPeriod: "",
    loanPurpose: "",
  });
  const [loading, setLoading] = useState(false);

  const customers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];

  const handleCustomerSelect = (value: string) => {
    setFormData({ ...formData, customerName: value });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (
      !formData.customerName ||
      !formData.loanAmount ||
      !formData.repaymentPeriod ||
      !formData.loanPurpose
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all fields."); // Show error toast
      return;
    }

    setLoading(true);

    try {
      const application = {
        customerId: formData.customerName,
        loanAmount: parseFloat(formData.loanAmount),
        repaymentPeriod: parseInt(formData.repaymentPeriod, 10),
        loanPurpose: formData.loanPurpose,
      };
      console.log(application, "application");

      //@ts-ignore
      const response = await applyForLoan(application);
      console.log(response, "response");

      toast.success("Loan application submitted successfully!"); // Show success toast
    } catch (err) {
      toast.error("Failed to submit loan application."); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ToastContainer /> {/* Add ToastContainer */}
      {/* Customer Selection */}
      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name</Label>
        <Select onValueChange={handleCustomerSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Customers</SelectLabel>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.name}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Loan Amount */}
      <div className="space-y-2">
        <Label htmlFor="loanAmount">Loan Amount</Label>
        <Input
          type="number"
          id="loanAmount"
          name="loanAmount"
          onChange={handleChange}
          required
        />
      </div>
      {/* Repayment Period */}
      <div className="space-y-2">
        <Label htmlFor="repaymentPeriod">Repayment Period (months)</Label>
        <Input
          type="number"
          id="repaymentPeriod"
          name="repaymentPeriod"
          onChange={handleChange}
          required
        />
      </div>
      {/* Loan Purpose */}
      <div className="space-y-2">
        <Label htmlFor="loanPurpose">Loan Purpose</Label>
        <Textarea
          id="loanPurpose"
          name="loanPurpose"
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default LoanApplicationForm;
