import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTeacher } from "./teacherSlice";

const TeacherForm = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name || !subject) {
      setError("All fields required");
      return;
    }

    dispatch(addTeacher({ id: 0, name, subject }));
    setName("");
    setSubject("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Teacher</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default TeacherForm;