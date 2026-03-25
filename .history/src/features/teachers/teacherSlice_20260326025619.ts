import { useState, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTeacher, updateTeacher, fetchTeachers } from "./teacherSlice";

interface Props {
  editData?: any;
  onClose?: () => void;
}

const TeacherForm = ({ editData, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    age: "",
  });

  const [errors, setErrors] = useState<any>({});

  // 🔥 PREFILL (EDIT)
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

  // 🔥 HANDLE CHANGE
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 VALIDATION
  const validate = () => {
    const err: any = {};

    if (!form.name) err.name = "Name required";
    if (!form.subject) err.subject = "Subject required";

    if (!form.email) err.email = "Email required";
    else if (!form.email.includes("@")) err.email = "Invalid email";

    if (!form.phone) err.phone = "Phone required";

    if (!form.age) err.age = "Age required";
    else if (isNaN(Number(form.age))) err.age = "Must be number";

    return err;
  };

  // 🔥 SUBMIT
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      name: form.name,
      subject: form.subject,
      email: form.email,
      phone: form.phone,
      address: form.address,
      age: Number(form.age),
    };

    if (editData) {
      // 🔥 UPDATE (PUT)
      dispatch(
        updateTeacher({
          id: editData.id,
          data: payload,
        })
      ).then(() => dispatch(fetchTeachers()));
    } else {
      // ADD
      dispatch(addTeacher(payload)).then(() =>
        dispatch(fetchTeachers())
      );
    }

    setErrors({});
    onClose && onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editData ? "Edit Teacher" : "Add Teacher"}</h3>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <p style={{ color: "red" }}>{errors.name}</p>

      <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" />
      <p style={{ color: "red" }}>{errors.subject}</p>

      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <p style={{ color: "red" }}>{errors.email}</p>

      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
      <p style={{ color: "red" }}>{errors.phone}</p>

      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />

      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
      <p style={{ color: "red" }}>{errors.age}</p>

      <button type="submit">
        {editData ? "Update" : "Add"}
      </button>

      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default TeacherForm;