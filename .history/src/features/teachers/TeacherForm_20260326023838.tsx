import { useState, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTeacher, updateTeacher } from "./teacherSlice";

interface Props {
  editData?: any;
  onClose?: () => void;
}

const TeacherForm = ({ editData, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");

  // 🔥 PREFILL (THIS IS THE KEY REQUIREMENT)
  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setSubject(editData.subject || "");
    }
  }, [editData]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 🔥 VALIDATION
    if (!name || !subject) {
      setError("All fields are required");
      return;
    }

    if (editData) {
      // 🔥 UPDATE
      dispatch(
        updateTeacher({
          id: editData.id,
          data: { id: editData.id, name, subject },
        })
      );
    } else {
      // ADD
      dispatch(addTeacher({ id: 0, name, subject }));
    }

    setName("");
    setSubject("");
    setError("");

    onClose && onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{editData ? "Edit Teacher" : "Add Teacher"}</h3>

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

      <button type="submit">
        {editData ? "Update" : "Add"}
      </button>

      {editData && (
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TeacherForm;