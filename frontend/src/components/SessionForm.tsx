import React, { useState } from "react";
import axios from "axios";

const SessionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructorId: "",
    groupIds: "",
    date: "",
    startTime: "",
    duration: "",
    questions: [{ question: "" }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].question = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestionField = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: "" }],
    });
  };

  const removeQuestionField = (index: number) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert groupIds to an array (from comma-separated string)
    const sessionData = {
      ...formData,
      groupIds: formData.groupIds.split(",").map((id) => id.trim()),
      labSheet: formData.questions.map((q) => ({ question: q.question })), // Mapping questions properly
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/session",
        sessionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Session created successfully:", response.data);

      // Optional: Reset form data after successful submission
      setFormData({
        title: "",
        description: "",
        instructorId: "",
        groupIds: "",
        date: "",
        startTime: "",
        duration: "",
        questions: [{ question: "" }], // Reset questions array
      });

      alert("Session created successfully!");
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Error creating session");
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Create a New Session</h2>

      {/* Title */}
      <label className="block mb-2">
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      {/* Description */}
      <label className="block mb-2">
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-1"
        />
      </label>

      {/* Instructor ID */}
      <label className="block mb-2">
        Instructor ID:
        <input
          type="text"
          name="instructorId"
          value={formData.instructorId}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      {/* Group IDs */}
      <label className="block mb-2">
        Group IDs (comma-separated):
        <input
          type="text"
          name="groupIds"
          value={formData.groupIds}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-1"
          placeholder="e.g., 01.01, 01.02"
          required
        />
      </label>

      {/* Date */}
      <label className="block mb-2">
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      {/* Start Time */}
      <label className="block mb-2">
        Start Time:
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      {/* Duration */}
      <label className="block mb-2">
        Duration (in minutes):
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      {/* Lab Sheet (Dynamic Questions) */}
      <div className="mb-4">
        <h3 className="font-bold">Lab Sheet Questions:</h3>
        {formData.questions.map((q, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder={`Question ${index + 1}`}
              required
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeQuestionField(index)}
                className="ml-2 text-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestionField}
          className="mt-2 text-blue-600"
        >
          Add Question
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Create Session
      </button>
    </form>
  );
};

export default SessionForm;
