import React from "react";
import Sidebar from "../components/InstructorDashboard/Sidebar";
import SessionForm from "../components/InstructorDashboard/SessionForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSession: React.FC = () => {
  return (
    <div className="flex">
      <ToastContainer />
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="container mx-auto flex ml-64">
        <SessionForm />
      </div>
    </div>
  );
};

export default CreateSession;
