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
      labSheet: formData.questions.map((q) => ({ question: q.question })),
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
      setFormData({
        title: "",
        description: "",
        instructorId: "",
        groupIds: "",
        date: "",
        startTime: "",
        duration: "",
        questions: [{ question: "" }],
      });
      alert("Session created successfully!");
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Error creating session");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 p-8 bg-base-100 shadow-lg rounded-lg">
      <form className="form-control space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-center mb-6">
          Create a New Session
        </h2>

        {/* Title */}
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
        />

        {/* Description */}
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />

        {/* Instructor ID */}
        <label className="label">
          <span className="label-text">Instructor ID</span>
        </label>
        <input
          type="text"
          name="instructorId"
          value={formData.instructorId}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
        />

        {/* Group IDs */}
        <label className="label">
          <span className="label-text">Group IDs (comma-separated)</span>
        </label>
        <input
          type="text"
          name="groupIds"
          value={formData.groupIds}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          placeholder="e.g., 01.01, 01.02"
          required
        />

        {/* Date */}
        <label className="label">
          <span className="label-text">Date</span>
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
        />

        {/* Start Time */}
        <label className="label">
          <span className="label-text">Start Time</span>
        </label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
        />

        {/* Duration */}
        <label className="label">
          <span className="label-text">Duration (in minutes)</span>
        </label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
        />

        {/* Lab Sheet (Dynamic Questions) */}
        <div className="space-y-2">
          <label className="label">
            <span className="label-text">Lab Sheet Questions</span>
          </label>
          {formData.questions.map((q, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="input input-bordered w-full"
                placeholder={`Question ${index + 1}`}
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeQuestionField(index)}
                  className="btn btn-error btn-xs"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestionField}
            className="btn btn-outline btn-secondary mt-2"
          >
            Add Question
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-6">
          Create Session
        </button>
      </form>
    </div>
  );
};

export default SessionForm;
