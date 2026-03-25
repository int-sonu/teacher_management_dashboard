import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTeacher, fetchTeachers } from "./teacherSlice";

const TeacherForm = ({ onClose }: { onClose?: () => void }) => {
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

  // 🔥 HANDLE CHANGE
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 VALIDATION
  const validate = () => {
    const newErrors: any = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.subject) newErrors.subject = "Subject is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!form.email.includes("@"))
      newErrors.email = "Invalid email";

    if (!form.phone) newErrors.phone = "Phone required";

    if (!form.age) newErrors.age = "Age required";
    else if (isNaN(Number(form.age)))
      newErrors.age = "Age must be number";

    return newErrors;
  };

  // 🔥 SUBMIT
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(
      addTeacher({
        name: form.name,
        subject: form.subject,
        email: form.email,
        phone: form.phone,
        address: form.address,
        age: Number(form.age),
      })
    ).then(() => {
      dispatch(fetchTeachers()); // refresh list
    });

    setForm({
      name: "",
      subject: "",
      email: "",
      phone: "",
      address: "",
      age: "",
    });

    setErrors({});
    onClose && onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Teacher</h3>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <p style={{ color: "red" }}>{errors.name}</p>

      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
      />
      <p style={{ color: "red" }}>{errors.subject}</p>

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <p style={{ color: "red" }}>{errors.email}</p>

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />
      <p style={{ color: "red" }}>{errors.phone}</p>

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />
      <p style={{ color: "red" }}>{errors.age}</p>

      <button type="submit">Add Teacher</button>
    </form>
  );
};

export default TeacherForm;