import React, { useState } from 'react';
import { Role } from './types';
import { Layout } from './components/Layout';
import { AdminDashboard } from './features/AdminDashboard';
import { StudentDashboard } from './features/StudentDashboard';
import { TeacherDashboard } from './features/TeacherDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, Shield, Users, BookOpen } from 'lucide-react';

// Login Component with modern design
const LoginScreen: React.FC<{ onLogin: (role: Role) => void }> = ({ onLogin }) => {
  const [hoveredRole, setHoveredRole] = useState<Role | null>(null);

  const roles = [
    {
      role: Role.ADMIN,
      label: 'Administrator',
      icon: Shield,
      desc: 'System & User Management',
      gradient: 'from-slate-800 to-slate-900'
    },
    {
      role: Role.TEACHER,
      label: 'Teacher',
      icon: Users,
      desc: 'Classes & Content Management',
      gradient: 'from-secondary to-secondaryHover'
    },
    {
      role: Role.STUDENT,
      label: 'Student',
      icon: BookOpen,
      desc: 'Learning & Assessments',
      gradient: 'from-emerald-500 to-emerald-600'
    },
  ];

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-secondary/5"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl max-w-4xl w-full z-10 border border-white/50"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-secondary to-secondaryHover rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-secondary/30"
          >
            <GraduationCap className="text-white w-10 h-10" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-dark mb-4 tracking-tight"
          >
            Nexus <span className="text-secondary">LMS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted text-lg"
          >
            Select your portal to continue
          </motion.p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredRole(item.role)}
                onHoverEnd={() => setHoveredRole(null)}
                onClick={() => onLogin(item.role)}
                className="relative flex flex-col items-center text-center p-8 rounded-2xl border-2 border-transparent bg-white hover:border-secondary/30 hover:shadow-xl transition-all group overflow-hidden"
              >
                {/* Hover gradient background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredRole === item.role ? 0.05 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-5 text-white shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <Icon size={28} />
                </motion.div>

                {/* Text */}
                <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-secondary transition-colors">
                  {item.label}
                </h3>
                <p className="text-sm text-muted mb-4">{item.desc}</p>

                {/* Arrow indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: hoveredRole === item.role ? 1 : 0, x: hoveredRole === item.role ? 0 : -10 }}
                  className="flex items-center gap-2 text-secondary text-sm font-medium"
                >
                  Enter Portal <ArrowRight size={16} />
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-muted/60 text-sm mt-10"
        >
          Nexus Learning Management System v2.0
        </motion.p>
      </motion.div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  const handleLogin = (role: Role) => {
    setCurrentRole(role);
    setActiveSection('dashboard');
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setActiveSection('dashboard');
  };

  const renderDashboard = () => {
    switch (currentRole) {
      case Role.ADMIN:
        return <AdminDashboard activeSection={activeSection} setActiveSection={setActiveSection} />;
      case Role.STUDENT:
        return <StudentDashboard activeSection={activeSection} />;
      case Role.TEACHER:
        return <TeacherDashboard activeSection={activeSection} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode='wait'>
      {!currentRole ? (
        <LoginScreen key="login" onLogin={handleLogin} />
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Layout
            role={currentRole}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onLogout={handleLogout}
          >
            {renderDashboard()}
          </Layout>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
