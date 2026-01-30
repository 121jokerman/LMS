import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';

// --- Card ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hover = true }) => (
  <motion.div
    whileHover={hover && onClick ? { y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
    className={`bg-white rounded-2xl shadow-card border border-border p-6 ${className} ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', icon, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-secondary text-white hover:bg-secondaryHover focus:ring-secondary shadow-lg shadow-secondary/25",
    secondary: "bg-dark text-white hover:bg-dark/90 focus:ring-dark",
    outline: "border-2 border-border text-dark bg-transparent hover:bg-primary focus:ring-secondary",
    ghost: "text-muted hover:bg-primary hover:text-dark focus:ring-secondary",
    danger: "bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
};

// --- Badge ---
interface BadgeProps {
  children: React.ReactNode;
  color?: 'green' | 'red' | 'blue' | 'yellow' | 'gray' | 'orange';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'blue', size = 'md' }) => {
  const colors = {
    green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    red: 'bg-rose-100 text-rose-700 border-rose-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    yellow: 'bg-amber-100 text-amber-700 border-amber-200',
    gray: 'bg-slate-100 text-slate-700 border-slate-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${colors[color]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-40"
          />
          {/* Modal Container - Centered with Flexbox */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full ${sizes[size]} bg-white rounded-2xl shadow-2xl overflow-hidden`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-bold text-dark">{title}</h2>
                <button onClick={onClose} className="p-2 text-muted hover:text-dark hover:bg-primary rounded-lg transition-all">
                  <X size={20} />
                </button>
              </div>
              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Tabs ---
interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex gap-2 p-1 bg-primary rounded-xl border border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
            ? 'bg-white text-dark shadow-sm'
            : 'text-muted hover:text-dark'
            }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-dark">{label}</label>}
    <input
      className={`w-full px-4 py-2.5 rounded-xl border border-border bg-white text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all ${error ? 'border-rose-500' : ''} ${className}`}
      {...props}
    />
    {error && <p className="text-sm text-rose-500">{error}</p>}
  </div>
);

// --- Select ---
interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ label, value, onChange, options, placeholder }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-dark">{label}</label>}
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-dark appearance-none focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
    </div>
  </div>
);

// --- Textarea ---
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, className = '', ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-dark">{label}</label>}
    <textarea
      className={`w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none ${className}`}
      {...props}
    />
  </div>
);

// --- Stat Card ---
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  positive?: boolean;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, positive, color = 'bg-secondary' }) => (
  <Card className="relative overflow-hidden">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted mb-1">{label}</p>
        <p className="text-3xl font-bold text-dark">{value}</p>
        {trend && (
          <p className={`text-sm mt-2 flex items-center gap-1 ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {positive ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
      {icon && (
        <div className={`p-3 ${color} rounded-xl text-white`}>
          {icon}
        </div>
      )}
    </div>
    <div className={`absolute bottom-0 left-0 right-0 h-1 ${color}`} />
  </Card>
);

// --- Empty State ---
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-muted mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-dark mb-2">{title}</h3>
    <p className="text-muted mb-6 max-w-sm">{description}</p>
    {action}
  </div>
);

// --- Table ---
interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
}

export function Table<T extends { id: string }>({ data, columns, onRowClick }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full">
        <thead className="bg-primary">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 text-left text-sm font-semibold text-dark">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onRowClick?.(item)}
              className={`border-t border-border bg-white hover:bg-primary/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-sm text-dark">
                  {col.render ? col.render(item) : String((item as any)[col.key])}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
