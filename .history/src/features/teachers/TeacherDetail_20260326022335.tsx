import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeacherById } from "./teacherSlice";

const TeacherDetail = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const { selectedTeacher } = useAppSelector((s) => s.teachers);

  useEffect(() => {
    dispatch(fetchTeacherById(id));
  }, [id]);

  if (!selectedTeacher) return <p>No Data</p>;

  return (
    <div>
      <h3>Teacher Detail</h3>
      <p>Name: {selectedTeacher.name}</p>
      <p>Subject: {selectedTeacher.subject}</p>
    </div>
  );
};

export default TeacherDetail;