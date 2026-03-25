import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchTeachers,
  deleteTeacher,
} from "./teacherSlice";

const TeacherList = () => {
  const dispatch = useAppDispatch();
  const { teachers, loading } = useAppSelector((s) => s.teachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
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
              <button>Edit</button>
              <button onClick={() => dispatch(deleteTeacher(t.id))}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherList;