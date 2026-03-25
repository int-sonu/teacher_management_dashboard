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

  // 🔥 PREFILL WHEN EDIT
  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setSubject(editData.subject);
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
          data: { id: editData.id, name, subject },
        })
      );
    } else {
      dispatch(addTeacher({ id: 0, name, subject }));
    }

    setName("");
    setSubject("");
    setError("");

    onClose && onClose(); // close after edit
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