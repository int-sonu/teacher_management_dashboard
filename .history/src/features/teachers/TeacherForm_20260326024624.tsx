import { useState, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTeacher, updateTeacher, fetchTeachers } from "./teacherSlice";

interface Props {
  editData?: any;
  onClose?: () => void;
}

const TeacherForm = ({ editData, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");

  // 🔥 PREFILL (EDIT)
  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setSubject(editData.subject || "");
    }
  }, [editData]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name || !subject) {
      setError("All fields required");
      return;
    }

    if (editData) {
      dispatch(
        updateTeacher({
          id: editData.id,
          data: { name, subject },
        })
      ).then(() => dispatch(fetchTeachers()));
    } else {
      dispatch(
        addTeacher({
          name,
          subject,
          email: "test@gmail.com",
          phone: "1234567890",
          address: "Kochi",
          age: 25,
        })
      ).then(() => dispatch(fetchTeachers()));
    }

    setName("");
    setSubject("");
    setError("");

    onClose && onClose();
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>{editData ? "Edit Teacher" : "Add Teacher"}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit">
          {editData ? "Update" : "Add"}
        </button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;