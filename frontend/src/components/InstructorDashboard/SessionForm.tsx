import React from "react";
import { Formik, Field, Form, FieldArray, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Define types for form values
interface Question {
  question: string;
}

interface FormValues {
  title: string;
  description: string;
  instructorId: string;
  groupIds: string;
  date: string;
  startTime: string;
  duration: string;
  questions: Question[];
}

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  instructorId: Yup.string().required("Instructor ID is required"),
  groupIds: Yup.string()
    .required("Group IDs are required")
    .matches(/^[\d.,\s]+$/, "Group IDs must be comma-separated numbers"),
  date: Yup.date().required("Date is required").nullable(),
  startTime: Yup.string().required("Start Time is required"),
  duration: Yup.number()
    .required("Duration is required")
    .positive("Duration must be positive"),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
      })
    )
    .min(1, "At least one question is required"),
});

const SessionForm: React.FC = () => {
  const navigate = useNavigate();

  const displaySuccessToast = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const displayErrorToast = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const sessionData = {
      ...values,
      groupIds: values.groupIds.split(",").map((id) => id.trim()),
      labSheet: values.questions.map((q) => ({ question: q.question })),
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
      displaySuccessToast("Session created successfully!");
      resetForm();
      setTimeout(() => {
        navigate("/instructorSessions");
      }, 3000);
    } catch (error) {
      console.error("Error creating session:", error);
      displayErrorToast("Something went wrong!");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 mb-10 p-8 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">
        Create a New Session
      </h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          instructorId: "",
          groupIds: "",
          date: "",
          startTime: "",
          duration: "",
          questions: [{ question: "" }],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values }) => (
          <Form className="space-y-6">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <div className="flex items-center space-x-2">
                <Field
                  name="title"
                  type="text"
                  className="input input-bordered w-full bg-gray-200 border-gray-300 h-12"
                />
              </div>
              {errors.title && touched.title && (
                <div className="text-red-500 text-xs mt-1">{errors.title}</div>
              )}
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <div className="flex items-center space-x-2">
                <Field
                  name="description"
                  type="text"
                  className="input input-bordered w-full bg-gray-200 border-gray-300 h-12"
                />
              </div>
            </div>

            {/* Instructor ID */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Instructor ID</span>
              </label>
              <div className="flex items-center space-x-2">
                <Field
                  name="instructorId"
                  type="text"
                  className="input input-bordered w-full bg-gray-200 border-gray-300 h-12"
                />
              </div>
              {errors.instructorId && touched.instructorId && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.instructorId}
                </div>
              )}
            </div>

            {/* Group IDs */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Group IDs (comma-separated)</span>
              </label>
              <div className="flex items-center space-x-2">
                <Field
                  name="groupIds"
                  type="text"
                  className="input input-bordered w-full bg-gray-200 border-gray-300 h-12"
                  placeholder="e.g., 01.01, 01.02"
                />
              </div>
              {errors.groupIds && touched.groupIds && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.groupIds}
                </div>
              )}
            </div>

            {/* Date and Start Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date and Start Time</span>
              </label>
              <div className="flex space-x-4">
                <Field
                  name="date"
                  type="date"
                  className="input input-bordered w-full bg-gray-200 border-gray-300 h-12"
                />
                <Field
                  name="startTime"
                  type="time"
                  className="input input-bordered w-full bg-gray-200 border-gray-300 h-12"
                />
              </div>
              {errors.date && touched.date && (
                <div className="text-red-500 text-xs mt-1">{errors.date}</div>
              )}
              {errors.startTime && touched.startTime && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.startTime}
                </div>
              )}
            </div>

            {/* Duration */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Duration (in minutes)</span>
              </label>
              <div className="flex items-center space-x-2">
                <Field
                  name="duration"
                  type="number"
                  className="input input-bordered w-full bg-gray-200 border-gray-300 h-12"
                />
              </div>
              {errors.duration && touched.duration && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.duration}
                </div>
              )}
            </div>

            {/* Lab Sheet (Dynamic Questions) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Lab Sheet Questions</span>
              </label>
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <div className="space-y-2">
                    {values.questions.map((q, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Field
                          name={`questions.${index}.question`}
                          type="text"
                          className="input input-bordered w-full bg-gray-200 border-gray-300 h-12"
                          placeholder={`Question ${index + 1}`}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="btn btn-error btn-s"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ question: "" })}
                      className="btn btn-outline btn-primary mt-2"
                    >
                      Add Question
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full mt-6">
              Create Session
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SessionForm;
