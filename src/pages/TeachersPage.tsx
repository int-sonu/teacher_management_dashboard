import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import TeacherList from '../features/teachers/TeacherList';
import TeacherForm from '../features/teachers/TeacherForm';
import TeacherDetail from '../features/teachers/TeacherDetail';
import type { Teacher } from '../types/teacher';
import { fetchTeachers, fetchTeacherById } from '../features/teachers/teacherSlice';
import { showToast } from '../features/toast/toastSlice';
import { Dialog, DialogContent, DialogTitle, Box, IconButton } from '@mui/material';
import { X } from 'lucide-react';

const TeachersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsFormOpen(true);
  };

  const handleView = async (teacher: Teacher) => {
    try {
      const resultAction = await dispatch(fetchTeacherById(teacher.id)).unwrap();
      setViewingTeacher(resultAction);
      setIsDetailOpen(true);
    } catch (e: any) {
      dispatch(showToast({ type: 'error', message: e.message || "Failed to load teacher details" }));
    }
  };

  const handleAdd = () => {
    setEditingTeacher(null);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingTeacher(null);
    dispatch(fetchTeachers());
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      <TeacherList 
        onEdit={handleEdit} 
        onView={handleView} 
        onAdd={handleAdd} 
      />

      <Dialog 
        open={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
            {editingTeacher ? 'Update Academic Profile' : 'Register New Teacher'}
          </Box>
          <IconButton onClick={() => setIsFormOpen(false)} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderTop: 0, borderBottom: 0 }}>
          <TeacherForm 
            teacher={editingTeacher} 
            onSuccess={handleFormSuccess} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      <Dialog 
        open={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
            Teacher Profile
          </Box>
          <IconButton onClick={() => setIsDetailOpen(false)} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderTop: 0, borderBottom: 0 }}>
          {viewingTeacher && <TeacherDetail teacher={viewingTeacher} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TeachersPage;
