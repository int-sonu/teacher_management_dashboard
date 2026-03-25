import type { Teacher } from '../../types/teacher';
import { BookOpen, Mail, Phone, Calendar, Hash, ShieldCheck, MapPin, User } from 'lucide-react';

interface TeacherDetailProps {
  teacher: Teacher;
}

const TeacherDetail: React.FC<TeacherDetailProps> = ({ teacher }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg shadow-indigo-500/20">
          {teacher.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{teacher.name}</h2>
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
            {teacher.subject} Specialist
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailItem 
          icon={<ShieldCheck className="text-emerald-400" size={18} />} 
          label="Verification Status" 
          value="Verified Academic" 
        />
        <DetailItem 
          icon={<Hash className="text-slate-400" size={18} />} 
          label="Employee ID" 
          value={`TEACH-${teacher.id}`} 
        />
        <DetailItem 
          icon={<Mail className="text-sky-400" size={18} />} 
          label="Email Address" 
          value={teacher.email || 'Not provided'} 
        />
        <DetailItem 
          icon={<Phone className="text-purple-400" size={18} />} 
          label="Phone Number" 
          value={teacher.phone || 'Not provided'} 
        />
        <DetailItem 
          icon={<Calendar className="text-amber-400" size={18} />} 
          label="Member Since" 
          value={teacher.joiningDate || 'Jan 2024'} 
        />
        <DetailItem 
          icon={<BookOpen className="text-indigo-400" size={18} />} 
          label="Department" 
          value="Academic Excellence" 
        />
        <DetailItem 
          icon={<MapPin className="text-pink-400" size={18} />} 
          label="Address" 
          value={teacher.address || 'Not provided'} 
        />
        <DetailItem 
          icon={<User className="text-orange-400" size={18} />} 
          label="Age" 
          value={teacher.age ? `${teacher.age} years` : 'Not provided'} 
        />
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Professional Biography</h4>
        <p className="text-slate-300 text-sm leading-relaxed">
          {teacher.name} is a dedicated educator specializing in {teacher.subject}. 
          With a passion for teaching and years of experience, they contribute significantly 
          to the academic growth of students.
        </p>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
    <div className="p-2.5 rounded-lg bg-black/20">
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-slate-200 font-medium">{value}</p>
    </div>
  </div>
);

export default TeacherDetail;
