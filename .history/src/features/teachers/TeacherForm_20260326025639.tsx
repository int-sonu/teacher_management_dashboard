import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTeacher, fetchTeachers } from "./teacherSlice";

// ✅ TypeScript interface
interface FormData {
  name: string;
  subject: string;
  email: string;
  phone: string;
  address: string;
  age: string;
}

const TeacherForm = ({ onClose }: { onClose?: () => void }) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<FormData>({
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    age: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // 🔥 HANDLE CHANGE + CLEAR ERROR
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors((prev: any) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  // 🔥 VALIDATION
  const validate = () => {
    const newErrors: any = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.subject) newErrors.subject = "Subject is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!form.email.includes("@"))
      newErrors.email = "Invalid email";

    if (!form.phone) newErrors.phone = "Phone is required";
    else if (form.phone.length < 10)
      newErrors.phone = "Phone must be at least 10 digits";

    if (!form.age) newErrors.age = "Age is required";
    else if (isNaN(Number(form.age)))
      newErrors.age = "Age must be a number";

    return newErrors;
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        addTeacher({
          name: form.name,
          subject: form.subject,
          email: form.email,
          phone: form.phone,
          address: form.address,
          age: Number(form.age),
        })
      );

      await dispatch(fetchTeachers()); // refresh list

      // RESET FORM
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
    } catch (err) {
      console.error("Error adding teacher:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
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

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Teacher"}
      </button>

      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default TeacherForm;