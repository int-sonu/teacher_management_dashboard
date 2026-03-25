import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeacherById } from "./teacherSlice";

const TeachersPage = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const { selectedTeacher } = useAppSelector((s) => s.teachers);

  useEffect(() => {
    dispatch(fetchTeacherById(id));
  }, [id]);

  return (
    <div>
      <h2>Teacher Detail</h2>

      {selectedTeacher ? (
        <>
          <p>Name: {selectedTeacher.name}</p>
          <p>Subject: {selectedTeacher.subject}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TeachersPage;