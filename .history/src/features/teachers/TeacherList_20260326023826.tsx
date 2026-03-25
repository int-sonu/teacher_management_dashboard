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

  const [editingTeacher, setEditingTeacher] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Teachers</h2>

      {/* EDIT FORM */}
      {editingTeacher && (
        <TeacherForm
          editData={editingTeacher}
          onClose={() => setEditingTeacher(null)}
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
                <button onClick={() => setEditingTeacher(t)}>
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