import React from "react";

const InstructorProfile: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 m-4">
      <div className="flex flex-col items-center">
        {/* Placeholder for Profile Picture */}
        <div className="w-24 h-24 mb-4 rounded-full bg-gray-200 overflow-hidden">
          <img
            src="../../../src/assets/avatar.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Name and Role */}
        <h2 className="text-lg font-semibold text-gray-900">
          Shehan Wickramasooriya
        </h2>
        <p className="text-sm text-gray-500">Instructor</p>

        {/* Additional Info */}
        <div className="mt-4 w-full">
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Sessions:</span>
            <span>12</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Students:</span>
            <span>150</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Email:</span>
            <span>shehan.w@sliit.lk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
