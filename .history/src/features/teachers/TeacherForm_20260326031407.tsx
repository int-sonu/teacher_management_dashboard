import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTeacher, updateTeacher, fetchTeachers } from "./teacherSlice";

// 1. Define strict Interfaces
interface TeacherPayload {
  name: string;
  subject: string;
  email: string;
  phone: string;
  address: string;
  age: number;
}

interface Teacher extends TeacherPayload {
  id: number;
}

interface TeacherFormProps {
  editData?: Teacher | null;
  onClose: () => void;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ editData, onClose }) => {
  const dispatch = useAppDispatch();
  
  // State for form and validation errors
  const [form, setForm] = useState<TeacherPayload>({
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    age: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TeacherPayload, string>>>({});

  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name,
        subject: editData.subject,
        email: editData.email,
        phone: editData.phone,
        address: editData.address,
        age: editData.age,
      });
    }
  }, [editData]);

  // 2. Add Validation Logic
  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (form.age <= 0) newErrors.age = "Age must be greater than 0";
    // Basic email regex
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return; // Stop if validation fails

    try {
      if (editData) {
        await dispatch(updateTeacher({ id: editData.id, data: form })).unwrap();
      } else {
        await dispatch(addTeacher(form)).unwrap();
      }
      
      await dispatch(fetchTeachers());
      onClose();
    } catch (error) {
      console.error("Failed to save teacher:", error);
      // You could set a global error state here
    }
  };

  return (
    <div className="form-container">
      <h3>{editData ? "Edit Teacher" : "Add New Teacher"}</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" />
          {errors.subject && <span className="error">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        </div>

        <div className="form-group">
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
        </div>

        <div className="form-group">
          <input name="age" type="number" value={form.age || ""} onChange={handleChange} placeholder="Age" />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {editData ? "Update Details" : "Register Teacher"}
          </button>
          <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;