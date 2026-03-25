import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addTeacher, updateTeacher } from './teacherSlice';
import { showToast } from '../toast/toastSlice';
import type { Teacher, TeacherFormData } from '../../types/teacher';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { User, BookOpen, Mail, Phone, ShieldAlert, MapPin, CalendarClock } from 'lucide-react';

interface TeacherFormProps {
  teacher?: Teacher | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ teacher, onSuccess, onCancel }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<TeacherFormData>({
    name: '',
    subject: '',
    email: '',
    phone: '',
    address: '',
    age: undefined,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof TeacherFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name,
        subject: teacher.subject,
        email: teacher.email || '',
        phone: teacher.phone || '',
        address: teacher.address || '',
        age: teacher.age,
      });
    } else {
      setFormData({
        name: '',
        subject: '',
        email: '',
        phone: '',
        address: '',
        age: undefined,
      });
      setErrors({});
    }
  }, [teacher]);

  const validate = () => {
    const newErrors: Partial<Record<keyof TeacherFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Academic name is required';
    if (!formData.subject.trim()) newErrors.subject = 'Core subject is required';
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format: academic@institution.edu';
    }
    
    if (formData.age && (formData.age < 18 || formData.age > 100)) {
      newErrors.age = 'Must be between 18 and 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (teacher) {
        await dispatch(updateTeacher({ id: teacher.id, data: formData })).unwrap();
        dispatch(showToast({ type: 'success', message: 'Profile synchronized successfully' }));
      } else {
        await dispatch(addTeacher(formData)).unwrap();
        dispatch(showToast({ type: 'success', message: 'Academic registration complete' }));
      }
      onSuccess();
    } catch (err: any) {
      const msg = err?.message || 'Academic server communication error';
      setApiError(msg);
      dispatch(showToast({ type: 'error', message: msg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {apiError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-xs text-red-400 font-bold uppercase tracking-wider">
          <ShieldAlert size={16} />
          {apiError}
        </div>
      )}

      <div className="space-y-5">
        <div className="relative group">
          <div className="absolute left-3 top-[38px] pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <User size={18} />
          </div>
          <Input 
            id="name"
            label="Academic Full Name"
            placeholder="Dr. Alexander Wright"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            className="pl-10"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-3 top-[38px] pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <BookOpen size={18} />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="subject" className="text-sm font-medium text-slate-300">Expertise Domain</label>
            <select
              id="subject"
              className={`glass-input px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-indigo-500/20 w-full pl-10 bg-slate-900/50 text-slate-200 ${errors.subject ? 'border-red-500/50' : 'border-white/10'}`}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            >
              <option value="" className="bg-slate-900 text-slate-400">Select expertise domain...</option>
              {['English', 'Maths', 'IT', 'Physics', 'Chemistry', 'Biology'].map(sub => (
                <option key={sub} value={sub} className="bg-slate-900 text-slate-200">{sub}</option>
              ))}
            </select>
            {errors.subject && <span className="text-xs text-red-400">{errors.subject}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative group">
            <div className="absolute left-3 top-[38px] pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
              <Mail size={18} />
            </div>
            <Input 
              id="email"
              label="Official Email"
              type="email"
              placeholder="alex.w@university.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              className="pl-10"
            />
          </div>

          <div className="relative group">
            <div className="absolute left-3 top-[38px] pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
              <Phone size={18} />
            </div>
            <Input 
              id="phone"
              label="Contact Reference"
              placeholder="+1 (555) 900-1234"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative group">
            <div className="absolute left-3 top-[38px] pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
              <MapPin size={18} />
            </div>
            <Input 
              id="address"
              label="Residential Address"
              placeholder="123 Faculty Row, Campus"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              error={errors.address}
              className="pl-10"
            />
          </div>

          <div className="relative group">
            <div className="absolute left-3 top-[38px] pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
              <CalendarClock size={18} />
            </div>
            <Input 
              id="age"
              label="Age"
              type="number"
              placeholder="35"
              value={formData.age || ''}
              onChange={(e) => setFormData({ ...formData, age: e.target.value ? Number(e.target.value) : undefined })}
              error={errors.age}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-6 justify-end border-t border-white/5">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
          disabled={isSubmitting}
          className="font-bold text-xs uppercase tracking-widest"
        >
          Discard
        </Button>
        <Button 
          type="submit" 
          isLoading={isSubmitting}
          className="min-w-[140px] font-black text-xs uppercase tracking-[0.1em]"
        >
          {teacher ? 'Update Profile' : 'Finalize Registration'}
        </Button>
      </div>
    </form>
  );
};

export default TeacherForm;
