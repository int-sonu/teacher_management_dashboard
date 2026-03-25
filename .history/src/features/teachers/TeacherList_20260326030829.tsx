import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeachers, deleteTeacher } from "./teacherSlice";
import TeacherForm from "./TeacherForm";

const TeacherList = () => {
  const dispatch = useAppDispatch();
  const { teachers } = useAppSelector((s) => s.teachers);

  const [open, setOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Teacher Dashboard
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
          setEditingTeacher(null);
        }}
      >
        Add Teacher
      </Button>

      <TeacherForm open={open} setOpen={setOpen} editData={editingTeacher} />

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {teachers.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.subject}</TableCell>
              <TableCell>{t.email}</TableCell>
              <TableCell>{t.phone}</TableCell>
              <TableCell>{t.age}</TableCell>

              <TableCell>
                <Button
                  color="secondary"
                  onClick={() => {
                    setEditingTeacher(t);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  color="error"
                  onClick={() => dispatch(deleteTeacher(t.id!))}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TeacherList;