import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTeachers, deleteTeacher } from "./teacherSlice";
import { showToast } from "../toast/toastSlice";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, TablePagination, CircularProgress, Button, IconButton, Box, Typography 
} from "@mui/material";
import { Edit2, Trash2, Eye, Plus } from "lucide-react";

interface TeacherListProps {
  onEdit: (teacher: any) => void;
  onView: (teacher: any) => void;
  onAdd: () => void;
}

const TeacherList: React.FC<TeacherListProps> = ({ onEdit, onView, onAdd }) => {
  const dispatch = useAppDispatch();
  const { teachers, loading } = useAppSelector((s) => s.teachers);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchTeachers()).unwrap().catch((err: any) => {
      dispatch(showToast({ type: 'error', message: err.message || 'Failed to fetch teachers' }));
    });
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await dispatch(deleteTeacher(id)).unwrap();
        dispatch(showToast({ type: 'success', message: 'Teacher deleted successfully' }));
      } catch (err: any) {
        dispatch(showToast({ type: 'error', message: err.message || 'Failed to delete teacher' }));
      }
    }
  };

  const paginatedTeachers = Array.isArray(teachers) 
    ? teachers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" color="text.primary" fontWeight="bold">
          Teacher Directory
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Plus size={18} />}
          onClick={onAdd}
          sx={{ borderRadius: '8px' }}
        >
          Add Teacher
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="teachers table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                    <CircularProgress color="primary" />
                    <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                      Loading teachers...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : teachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                    <Typography variant="body1" color="text.secondary">
                      No teachers found. Click "Add Teacher" to create one.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTeachers.map((t) => (
                  <TableRow key={t.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{t.name}</TableCell>
                    <TableCell>{t.subject}</TableCell>
                    <TableCell>{t.email}</TableCell>
                    <TableCell>{t.phone}</TableCell>
                    <TableCell align="center">
                      <IconButton color="info" onClick={() => onView(t)} size="small" sx={{ mr: 1 }} title="View Details">
                        <Eye size={18} />
                      </IconButton>
                      <IconButton color="primary" onClick={() => onEdit(t)} size="small" sx={{ mr: 1 }} title="Edit">
                        <Edit2 size={18} />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(t.id)} size="small" title="Delete">
                        <Trash2 size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {!loading && teachers.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={teachers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: '1px solid', borderColor: 'divider' }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default TeacherList;