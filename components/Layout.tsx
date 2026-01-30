import React, { useState } from 'react';
import {
  LayoutDashboard, Users, BookOpen,
  Settings, LogOut, Bell, Search,
  Calendar, GraduationCap, ClipboardList,
  FileText, BarChart3, UserCheck, FolderOpen,
  CheckSquare, Award, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Role } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  role: Role;
  activeSection: string;
  setActiveSection: (s: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

// Navigation configuration by role
const getNavItems = (role: Role) => {
  switch (role) {
    case Role.ADMIN:
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'user-management', label: 'User Management', icon: Users },
        { id: 'academic-management', label: 'Academic Management', icon: BookOpen },
        { id: 'classroom-management', label: 'Classroom Management', icon: Calendar },
      ];
    case Role.TEACHER:
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'student-management', label: 'Student Management', icon: Users },
        { id: 'classroom-subject', label: 'Classroom & Subject', icon: FolderOpen },
        { id: 'content-management', label: 'Content Management', icon: FileText },
        { id: 'attendance', label: 'Attendance', icon: UserCheck },
        { id: 'assessments', label: 'Assessments', icon: ClipboardList },
      ];
    case Role.STUDENT:
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'courses', label: 'Courses & Learning', icon: BookOpen },
        { id: 'assignments', label: 'Assignments & Quizzes', icon: CheckSquare },
        { id: 'attendance', label: 'Attendance', icon: UserCheck },
        { id: 'performance', label: 'Performance', icon: Award },
      ];
    default:
      return [];
  }
};

// Get role display info
const getRoleInfo = (role: Role) => {
  switch (role) {
    case Role.ADMIN:
      return { title: 'Administrator', color: 'bg-slate-800' };
    case Role.TEACHER:
      return { title: 'Teacher', color: 'bg-secondary' };
    case Role.STUDENT:
      return { title: 'Student', color: 'bg-emerald-500' };
    default:
      return { title: 'User', color: 'bg-gray-500' };
  }
};

export const Layout: React.FC<LayoutProps> = ({ role, activeSection, setActiveSection, onLogout, children }) => {
  const navItems = getNavItems(role);
  const roleInfo = getRoleInfo(role);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-primary overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 288 }}
        animate={{ width: sidebarCollapsed ? 80 : 288 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white border-r border-border flex flex-col shadow-soft z-20 relative"
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-border rounded-full shadow-md flex items-center justify-center text-muted hover:text-dark hover:bg-primary transition-all z-30"
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Logo */}
        <div className={`p-6 flex items-center gap-3 border-b border-border ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
            className="w-10 h-10 bg-gradient-to-br from-secondary to-secondaryHover rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
          >
            <GraduationCap className="text-white w-5 h-5" />
          </motion.div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="font-bold text-xl text-dark tracking-tight">Nexus</span>
                <span className="font-bold text-xl text-secondary ml-1">LMS</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto py-6 ${sidebarCollapsed ? 'px-2' : 'px-4'} space-y-1`}>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveSection(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 ${sidebarCollapsed ? 'justify-center px-2' : 'px-4'} py-3.5 rounded-xl text-sm font-medium transition-all duration-200 relative group ${isActive
                  ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                  : 'text-muted hover:bg-primary hover:text-dark'
                  }`}
              >
                {/* Active indicator */}
                {isActive && !sidebarCollapsed && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-muted group-hover:text-secondary'}`} />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className={`p-4 border-t border-border space-y-3 ${sidebarCollapsed ? 'px-2' : ''}`}>
          {/* Current User */}
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center px-0 py-2' : 'px-3 py-2'} bg-primary/50 rounded-xl`}>
            <div className={`w-10 h-10 ${roleInfo.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
              {role[0]}
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 min-w-0 overflow-hidden"
                >
                  <p className="text-sm font-semibold text-dark truncate">Demo User</p>
                  <p className="text-xs text-muted">{roleInfo.title}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            title={sidebarCollapsed ? 'Sign Out' : undefined}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-center gap-2'} px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all border border-rose-100`}
          >
            <LogOut size={16} />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <motion.header
          initial={{ y: -64 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="h-16 bg-white/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8 z-10"
        >
          {/* Search Bar */}
          <div className="flex items-center gap-3 text-muted bg-primary px-4 py-2.5 rounded-xl w-80 border border-border focus-within:ring-2 focus-within:ring-secondary/20 focus-within:border-secondary/30 transition-all">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent border-none outline-none text-sm text-dark w-full placeholder-muted"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 text-muted hover:text-dark hover:bg-primary rounded-xl transition-all"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </motion.button>

            {/* Current Date */}
            <div className="hidden lg:block text-right px-4 border-l border-border">
              <p className="text-sm font-semibold text-dark">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <p className="text-xs text-muted">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        </motion.header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
