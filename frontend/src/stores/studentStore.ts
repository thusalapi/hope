import create from "zustand";

interface Student {
  id: string;
  name: string;
  email: string;
  uploadedTime: string;
  aiGrade: string;
}

interface StudentStore {
  students: Student[];
  updateStudent: (id: string, data: Partial<Student>) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  students: [
    {
      id: "IT2201001",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      uploadedTime: "2024-08-15 10:15 AM",
      aiGrade: "A",
    },
    {
      id: "IT2201002",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      uploadedTime: "2024-08-15 10:30 AM",
      aiGrade: "B+",
    },
    {
      id: "IT2201003",
      name: "Carol Davis",
      email: "carol.davis@example.com",
      uploadedTime: "2024-08-15 11:00 AM",
      aiGrade: "A-",
    },
    {
      id: "IT2201004",
      name: "David Wilson",
      email: "david.wilson@example.com",
      uploadedTime: "2024-08-15 11:15 AM",
      aiGrade: "B",
    },
    {
      id: "IT2201005",
      name: "Eva Martinez",
      email: "eva.martinez@example.com",
      uploadedTime: "2024-08-15 11:30 AM",
      aiGrade: "A",
    },
    {
      id: "IT2201006",
      name: "Frank Harris",
      email: "frank.harris@example.com",
      uploadedTime: "2024-08-15 12:00 PM",
      aiGrade: "B+",
    },
  ],
  updateStudent: (id, data) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, ...data } : student
      ),
    })),
}));
