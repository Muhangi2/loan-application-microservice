import React from "react";
import "./App.css";
import LoanApplicationPage from "./pages/LoanApplicationPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="text-xl font-bold mb-2">
        <LoanApplicationPage />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
