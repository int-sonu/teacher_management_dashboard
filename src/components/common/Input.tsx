import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label htmlFor={props.id || props.name} className="text-sm font-medium text-slate-300">{label}</label>}
      <input 
        id={props.id || props.name}
        className={`glass-input px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-indigo-500/20 w-full bg-slate-900/50 text-slate-200 ${
          error ? 'border-red-500/50' : 'border-white/10'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};

export default Input;
