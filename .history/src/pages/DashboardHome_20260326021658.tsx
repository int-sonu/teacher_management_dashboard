import React, { useEffect } from 'react';
import { Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTeachers } from '../features/teachers/teacherSlice';

const DashboardHome: React.FC = () => {
  const dispatch = useAppDispatch();

  const { teachers } = useAppSelector((state) => state.teachers);

  // ✅ fetch data
  useEffect(() => {
    if (teachers.length === 0) {
      dispatch(fetchTeachers());
    }
  }, [dispatch]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Welcome, Administrator
        </h1>
        <p className="text-slate-400 text-lg">
          Here's a summary of the academic ecosystem today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* ✅ DYNAMIC VALUE */}
        <StatCard
          icon={<Users className="text-indigo-400" size={24} />}
          label="Total Teachers"
          value={teachers.length.toString()}
          trend="Live data"
        />

        <StatCard
          icon={<CheckCircle className="text-emerald-400" size={24} />}
          label="Active Classes"
          value="156"
          trend="Currently live"
        />

        <StatCard
          icon={<Clock className="text-amber-400" size={24} />}
          label="Pending Approvals"
          value="07"
          trend="Require review"
        />

        <StatCard
          icon={<AlertTriangle className="text-red-400" size={24} />}
          label="System Alerts"
          value="02"
          trend="Action required"
        />
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}) => (
  <div className="glass-card flex flex-col gap-4 border border-white/5 hover:border-indigo-500/50">
    <div className="flex items-center justify-between">
      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
        {icon}
      </div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        {trend}
      </span>
    </div>
    <div>
      <h4 className="text-3xl font-black text-white">{value}</h4>
      <p className="text-sm font-medium text-slate-400 mt-1">{label}</p>
    </div>
  </div>
);

export default DashboardHome;