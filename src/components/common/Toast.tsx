import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { hideToast } from '../../features/toast/toastSlice';
import type { ToastMessage } from '../../features/toast/toastSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { messages } = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {messages.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onHide={(id) => dispatch(hideToast(id))} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem = ({ toast, onHide }: { toast: ToastMessage, onHide: (id: string) => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => onHide(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onHide]);

  const icons = {
    success: <CheckCircle className="text-emerald-400" size={20} />,
    error: <XCircle className="text-red-400" size={20} />,
    info: <Info className="text-sky-400" size={20} />,
  };

  const bgColors = {
    success: 'bg-emerald-500/10 border-emerald-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    info: 'bg-sky-500/10 border-sky-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      className={`glass-panel p-4 flex items-center gap-3 min-w-[320px] max-w-md shadow-2xl border ${bgColors[toast.type]}`}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm font-medium text-slate-200">{toast.message}</p>
      <button onClick={() => onHide(toast.id)} className="text-slate-400 hover:text-white">
        <X size={16} />
      </button>
    </motion.div>
  );
};

export default ToastContainer;
