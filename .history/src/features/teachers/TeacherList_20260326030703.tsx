import { useState, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTeacher, updateTeacher, fetchTeachers } from "./teacherSlice";

const TeacherForm = ({
  editData,
  onClose,
}: {
  editData?: any;
  onClose?: () => void;
}) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    age: "",
  });

  // 🔥 PREFILL EDIT
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        subject: editData.subject || "",
        email: editData.email || "",
        phone: editData.phone || "",
        address: editData.address || "",
        age: editData.age || "",
      });
    }
  }, [editData]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      subject: form.subject,
      email: form.email,
      phone: form.phone,
      address: form.address,
      age: Number(form.age),
    };

    if (editData) {
      await dispatch(updateTeacher({ id: editData.id, data: payload }));
    } else {
      await dispatch(addTeacher(payload));
    }

    await dispatch(fetchTeachers());

    onClose && onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editData ? "Edit Teacher" : "Add Teacher"}</h3>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />

      <button type="submit">{editData ? "Update" : "Add"}</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default TeacherForm;