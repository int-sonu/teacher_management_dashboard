import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchTeachers,
  deleteTeacher,
} from "./teacherSlice";
import TeacherForm from "./TeacherForm";

const TeacherList = () => {
  const dispatch = useAppDispatch();
  const { teachers, loading } = useAppSelector((s) => s.teachers);

  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Teacher Dashboard</h2>

      {/* 🔥 ADD BUTTON */}
      <button onClick={() => {
        setShowForm(true);
        setEditingTeacher(null);
      }}>
        Add Teacher
      </button>

      {/* 🔥 FORM (ADD + EDIT) */}
      {(showForm || editingTeacher) && (
        <TeacherForm
          editData={editingTeacher}
          onClose={() => {
            setShowForm(false);
            setEditingTeacher(null);
          }}
        />
      )}

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.subject}</td>
              <td>
                <button onClick={() => {
                  setEditingTeacher(t);
                  setShowForm(true);
                }}>
                  Edit
                </button>

                <button onClick={() => dispatch(deleteTeacher(t.id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherList;