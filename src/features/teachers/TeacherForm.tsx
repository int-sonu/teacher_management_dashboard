import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTeacher, updateTeacher } from "./teacherSlice";
import { showToast } from "../toast/toastSlice";
import { Box, Button, TextField, Grid, CircularProgress } from "@mui/material";

interface TeacherFormProps {
  teacher?: any | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ teacher, onSuccess, onCancel }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    age: "",
  });

  useEffect(() => {
    if (teacher) {
      setForm({
        name: teacher.name || "",
        subject: teacher.subject || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        address: teacher.address || "",
        age: teacher.age ? teacher.age.toString() : "",
      });
    }
  }, [teacher]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10,}$/.test(form.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = "Invalid phone number";
    }

    if (!form.age || isNaN(Number(form.age)) || Number(form.age) <= 0) {
      newErrors.age = "Valid age is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      dispatch(showToast({ type: 'error', message: 'Please fix the form errors before submitting' }));
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        name: form.name.trim(),
        subject: form.subject.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        age: Number(form.age),
      };

      if (teacher && teacher.id) {
        await dispatch(updateTeacher({ id: teacher.id, data: payload })).unwrap();
        dispatch(showToast({ type: 'success', message: 'Teacher updated successfully!' }));
      } else {
        await dispatch(addTeacher(payload)).unwrap();
        dispatch(showToast({ type: 'success', message: 'Teacher added successfully!' }));
      }

      onSuccess();
    } catch (error: any) {
      dispatch(showToast({ type: 'error', message: error.message || 'Failed to save teacher' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          error={!!errors.subject}
          helperText={errors.subject}
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          disabled={loading}
          sx={{ gridColumn: { sm: 'span 2' } }}
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          error={!!errors.age}
          helperText={errors.age}
          disabled={loading}
        />
      </Box>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onCancel} color="inherit" disabled={loading} variant="outlined">
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {teacher ? "Update Teacher" : "Add Teacher"}
        </Button>
      </Box>
    </Box>
  );
};

export default TeacherForm;