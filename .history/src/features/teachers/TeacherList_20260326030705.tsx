import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeachers, deleteTeacher } from "./teacherSlice";
import TeacherForm from "./TeacherForm";

const TeacherList = () => {
  const dispatch = useAppDispatch();
  const { teachers } = useAppSelector((s) => s.teachers);

  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setShowForm(true);
          setEditingTeacher(null);
        }}
      >
        Add Teacher
      </button>

      {(showForm || editingTeacher) && (
        <TeacherForm
          editData={editingTeacher}
          onClose={() => {
            setShowForm(false);
            setEditingTeacher(null);
          }}
        />
      )}

      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.subject}</td>
              <td>{t.email}</td>
              <td>{t.phone}</td>
              <td>{t.age}</td>

              <td>
                <button onClick={() => setEditingTeacher(t)}>Edit</button>
                <button onClick={() => dispatch(deleteTeacher(t.id!))}>
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