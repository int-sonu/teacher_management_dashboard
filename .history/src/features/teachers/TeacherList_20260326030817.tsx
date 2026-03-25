import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTeacher, updateTeacher, fetchTeachers } from "./teacherSlice";

const TeacherForm = ({ open, setOpen, editData }: any) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    age: "",
  });

  // PREFILL
  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm({
        name: "",
        subject: "",
        email: "",
        phone: "",
        address: "",
        age: "",
      });
    }
  }, [editData]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      age: Number(form.age),
    };

    if (editData) {
      await dispatch(updateTeacher({ id: editData.id, data: payload }));
    } else {
      await dispatch(addTeacher(payload));
    }

    await dispatch(fetchTeachers());
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>
        {editData ? "Edit Teacher" : "Add Teacher"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
          <TextField label="Subject" name="subject" value={form.subject} onChange={handleChange} />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
          <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <TextField label="Address" name="address" value={form.address} onChange={handleChange} />
          <TextField label="Age" name="age" value={form.age} onChange={handleChange} />

          <Button variant="contained" onClick={handleSubmit}>
            {editData ? "Update" : "Add"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherForm;