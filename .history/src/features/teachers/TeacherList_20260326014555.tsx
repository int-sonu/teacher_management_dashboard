import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTeachers, deleteTeacher } from './teacherSlice';
import { showToast } from '../toast/toastSlice';
import type { Teacher } from '../../types/teacher';
import { Edit2, Trash2, Eye, UserPlus, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { motion, AnimatePresence } from 'framer-motion';

interface TeacherListProps {
  onEdit: (teacher: Teacher) => void;
  onView: (teacher: Teacher) => void;
  onAdd: () => void;
}

const TeacherList: React.FC<TeacherListProps> = ({ onEdit, onView, onAdd }) => {
  const dispatch = useAppDispatch();
  const { teachers, loading, error } = useAppSelector((state) => state.teachers);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteTeacher(deleteId)).unwrap();
      dispatch(showToast({ type: 'success', message: 'Teacher removed successfully' }));
      setDeleteId(null);
    } catch (err) {
      dispatch(showToast({ type: 'error', message: 'Failed to delete teacher' }));
    } finally {
      setIsDeleting(false);
    }
  };

  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const paginatedTeachers = teachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading && teachers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-12 h-12 border-4 border-[#3424c2] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 animate-pulse font-medium">Synchronizing records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 bg-red-50 relative rounded-2xl border-red-200 text-center flex flex-col items-center gap-4">
        <div className="p-4 bg-red-500/20 rounded-full text-red-400">
          <AlertCircle size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Connection Failed</h3>
          <p className="text-red-400/80 max-w-xs mx-auto text-sm">{error}</p>
        </div>
        <Button onClick={() => dispatch(fetchTeachers())} variant="secondary">Retry Connection</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Teacher Directory</h2>
          <p className="text-slate-500 font-medium">Manage faculty members and their specializations.</p>
        </div>
        <Button onClick={onAdd} className="px-6 py-3 shadow-xl">
          <UserPlus size={18} />
          Register Teacher
        </Button>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f4f7fe] text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-5">Teacher Profile</th>
                <th className="px-8 py-5">Core Subject</th>
                <th className="px-8 py-5 text-right">Administrative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {paginatedTeachers.map((teacher, index) => (
                  <motion.tr 
                    key={teacher.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#3424c2]/10 text-[#3424c2] flex items-center justify-center font-bold">
                          {teacher.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{teacher.name}</p>
                          <p className="text-xs text-slate-400 font-medium tracking-tight">ID: {teacher.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-full bg-[#f97316]/10 text-[#f97316] text-xs font-bold shrink-0">
                        {teacher.subject}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        <ActionButton icon={<Eye size={16} />} onClick={() => onView(teacher)} color="indigo" label="View" />
                        <ActionButton icon={<Edit2 size={16} />} onClick={() => onEdit(teacher)} color="amber" label="Edit" />
                        <ActionButton icon={<Trash2 size={16} />} onClick={() => setDeleteId(teacher.id)} color="red" label="Delete" />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {teachers.length === 0 && !loading && (
            <div className="p-16 text-center text-slate-400 italic font-medium">
              No teachers registered in the system.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="px-8 py-5 bg-white border-t border-slate-50 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Record <span className="text-[#3424c2]">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-[#3424c2]">{Math.min(currentPage * itemsPerPage, teachers.length)}</span>
            </p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-slate-500 hover:text-white disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-1.5">
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 min-w-[32px] px-2 rounded-lg text-xs font-black transition-all ${
                      currentPage === i + 1 
                        ? 'bg-[#3424c2] text-white shadow-md' 
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-slate-500 hover:text-white disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={deleteId !== null} 
        onClose={() => setDeleteId(null)} 
        title="Confirm Deletion"
      >
        <div className="space-y-6">
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-4">
            <AlertCircle className="text-red-500 shrink-0" size={24} />
            <div>
              <p className="text-slate-800 font-bold mb-1">Permanently delete record?</p>
              <p className="text-xs text-red-600 font-medium leading-relaxed">
                This action cannot be undone. All data associated with this teacher will be removed from the primary database.
              </p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="danger" isLoading={isDeleting} onClick={confirmDelete}>Confirm Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const ActionButton = ({ icon, onClick, color, label }: { icon: React.ReactNode, onClick: () => void, color: string, label: string }) => {
  const colors: Record<string, string> = {
    indigo: 'hover:text-[#3424c2] hover:bg-[#3424c2]/10',
    amber: 'hover:text-amber-600 hover:bg-amber-500/10',
    red: 'hover:text-red-600 hover:bg-red-500/10',
  };
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 text-slate-400 font-bold text-xs rounded-lg transition-all ${colors[color]}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default TeacherList;
