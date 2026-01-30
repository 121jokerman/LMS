import React, { useState } from 'react';
import {
  Users, Shield, UserPlus, BookOpen,
  Calendar, Plus, Edit2, Trash2, Search,
  GraduationCap, Clock, CheckCircle, XCircle,
  ChevronRight, Layers, Settings, LayoutGrid, List
} from 'lucide-react';
import { Card, Button, Badge, Tabs, Modal, Input, Select, Textarea, Table, StatCard } from '../components/ui';
import { motion } from 'framer-motion';
import { mockTeachers, mockStudents, mockAdmins, mockSubjects, mockClassrooms } from '../data/mockData';

// Admin Dashboard Component
export const AdminDashboard: React.FC<{ activeSection: string; setActiveSection: (s: string) => void }> = ({ activeSection, setActiveSection }) => {
  const [activeTab, setActiveTab] = useState('teachers');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [searchQuery, setSearchQuery] = useState('');
  const [timetableView, setTimetableView] = useState<'calendar' | 'list'>('calendar');

  // Dashboard Overview
  const renderDashboard = () => {
    // Weekly timetable data
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'];

    const timetableData: { [key: string]: { subject: string; teacher: string; class: string; color: string } } = {
      'Monday-08:00': { subject: 'Math', teacher: 'Mr. Smith', class: '10-A', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      'Monday-09:00': { subject: 'English', teacher: 'Ms. Johnson', class: '10-B', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      'Monday-10:00': { subject: 'Physics', teacher: 'Mr. Smith', class: '9-A', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      'Tuesday-08:00': { subject: 'Chemistry', teacher: 'Mr. Brown', class: '10-A', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      'Tuesday-09:00': { subject: 'Math', teacher: 'Mr. Smith', class: '10-B', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      'Tuesday-11:00': { subject: 'CS', teacher: 'Ms. Davis', class: '11-A', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      'Wednesday-08:00': { subject: 'English', teacher: 'Ms. Johnson', class: '10-A', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      'Wednesday-10:00': { subject: 'Biology', teacher: 'Mr. Brown', class: '9-A', color: 'bg-green-100 text-green-700 border-green-200' },
      'Wednesday-14:00': { subject: 'History', teacher: 'Ms. Johnson', class: '10-B', color: 'bg-orange-100 text-orange-700 border-orange-200' },
      'Thursday-08:00': { subject: 'Physics', teacher: 'Mr. Smith', class: '10-A', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      'Thursday-09:00': { subject: 'Math', teacher: 'Mr. Smith', class: '9-A', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      'Thursday-11:00': { subject: 'CS', teacher: 'Ms. Davis', class: '10-A', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      'Friday-08:00': { subject: 'Chemistry', teacher: 'Mr. Brown', class: '10-B', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      'Friday-10:00': { subject: 'English', teacher: 'Ms. Johnson', class: '9-A', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      'Friday-14:00': { subject: 'Math', teacher: 'Mr. Smith', class: '11-A', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    };

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    // Convert to list format for list view
    const listSchedule = Object.entries(timetableData)
      .filter(([key]) => key.startsWith(today))
      .map(([key, value]) => ({
        time: key.split('-')[1],
        ...value,
        status: key.split('-')[1] < '10:00' ? 'completed' : key.split('-')[1] === '10:00' ? 'ongoing' : 'upcoming'
      }));

    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Teachers" value={mockTeachers.length} icon={<Users size={24} />} color="bg-secondary" />
          <StatCard label="Total Students" value={mockStudents.length} icon={<GraduationCap size={24} />} color="bg-emerald-500" />
          <StatCard label="Subjects" value={mockSubjects.length} icon={<BookOpen size={24} />} color="bg-blue-500" />
          <StatCard label="Classrooms" value={mockClassrooms.length} icon={<Layers size={24} />} color="bg-purple-500" />
        </div>

        {/* Timetable with View Toggle */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-dark">
                {timetableView === 'calendar' ? 'Weekly School Timetable' : "Today's Schedule"}
              </h3>
              <p className="text-sm text-muted">
                {timetableView === 'calendar' ? 'Overview of all classes this week' : new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="flex items-center bg-primary rounded-lg p-1">
                <button
                  onClick={() => setTimetableView('calendar')}
                  className={`p-2 rounded-md transition-all ${timetableView === 'calendar' ? 'bg-secondary text-white shadow-sm' : 'text-muted hover:text-dark'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setTimetableView('list')}
                  className={`p-2 rounded-md transition-all ${timetableView === 'list' ? 'bg-secondary text-white shadow-sm' : 'text-muted hover:text-dark'}`}
                >
                  <List size={18} />
                </button>
              </div>
              <Button variant="outline" size="sm" icon={<Calendar size={16} />} onClick={() => setActiveSection('classroom-management')}>
                Manage
              </Button>
            </div>
          </div>

          {timetableView === 'calendar' ? (
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-6 gap-2 mb-2">
                  <div className="p-3 text-center font-semibold text-muted text-sm">Time</div>
                  {days.map(day => (
                    <div key={day} className={`p-3 text-center font-semibold text-sm rounded-lg ${day === today ? 'bg-secondary text-white' : 'bg-primary text-dark'}`}>
                      {day}
                    </div>
                  ))}
                </div>
                {timeSlots.map((time, timeIndex) => (
                  <motion.div key={time} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: timeIndex * 0.05 }} className="grid grid-cols-6 gap-2 mb-2">
                    <div className="p-3 text-center font-medium text-dark bg-primary rounded-lg text-sm">{time}</div>
                    {days.map(day => {
                      const slot = timetableData[`${day}-${time}`];
                      return (
                        <div key={`${day}-${time}`} className={`p-2 rounded-lg border-2 min-h-[70px] transition-all hover:scale-[1.02] cursor-pointer ${slot ? slot.color : 'bg-gray-50 border-gray-100'}`}>
                          {slot && (
                            <div className="text-center">
                              <p className="font-bold text-xs">{slot.subject}</p>
                              <p className="text-[10px] opacity-80">{slot.class}</p>
                              <p className="text-[10px] opacity-70 truncate">{slot.teacher}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {listSchedule.length > 0 ? listSchedule.map((slot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl ${slot.status === 'ongoing' ? 'bg-secondary/10 border-2 border-secondary' : 'bg-primary'}`}
                >
                  <div className="text-center min-w-[80px]">
                    <p className="font-bold text-dark">{slot.time}</p>
                  </div>
                  <div className={`w-1 h-12 rounded-full ${slot.status === 'completed' ? 'bg-emerald-500' : slot.status === 'ongoing' ? 'bg-secondary' : 'bg-gray-300'}`} />
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-bold text-dark">{slot.class}</p>
                    </div>
                    <div>
                      <p className="font-medium text-dark">{slot.subject}</p>
                      <p className="text-sm text-muted">{slot.teacher}</p>
                    </div>
                    <div className="flex items-center justify-end">
                      {slot.status === 'completed' && <Badge color="green">Done</Badge>}
                      {slot.status === 'ongoing' && <Badge color="orange">In Progress</Badge>}
                      {slot.status === 'upcoming' && <Badge color="gray">Upcoming</Badge>}
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-8 text-muted">No classes scheduled for today</div>
              )}
            </div>
          )}
        </Card>

        {/* Quick Actions & Recent Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-bold text-dark mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add Teacher', icon: UserPlus, action: () => setActiveSection('user-management'), color: 'bg-secondary' },
                { label: 'Add Student', icon: GraduationCap, action: () => setActiveSection('user-management'), color: 'bg-emerald-500' },
                { label: 'Create Subject', icon: BookOpen, action: () => setActiveSection('academic-management'), color: 'bg-blue-500' },
                { label: 'Manage Timetable', icon: Calendar, action: () => setActiveSection('classroom-management'), color: 'bg-purple-500' },
              ].map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={item.action}
                  className="flex items-center gap-3 p-4 rounded-xl bg-primary border border-border hover:border-secondary/30 hover:shadow-md transition-all group"
                >
                  <div className={`p-2 ${item.color} rounded-lg text-white`}>
                    <item.icon size={18} />
                  </div>
                  <span className="font-medium text-dark text-sm">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-dark">Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              {[
                { action: 'New student enrolled', user: 'Alex Johnson', time: '2 mins ago', type: 'success' },
                { action: 'Timetable updated', user: 'Admin', time: '15 mins ago', type: 'info' },
                { action: 'Subject assigned', user: 'Mr. Smith', time: '1 hour ago', type: 'info' },
                { action: 'Class section created', user: 'Admin', time: '2 hours ago', type: 'success' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-primary rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                    <div>
                      <p className="font-medium text-dark text-sm">{item.action}</p>
                      <p className="text-xs text-muted">{item.user}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  // User Management Section
  const renderUserManagement = () => {
    const tabs = [
      { id: 'teachers', label: 'Teachers', icon: <Users size={16} /> },
      { id: 'students', label: 'Students', icon: <GraduationCap size={16} /> },
      { id: 'admins', label: 'Admins', icon: <Shield size={16} /> },
      { id: 'roles', label: 'Roles & Permissions', icon: <Settings size={16} /> },
    ];

    const openAddModal = () => {
      setModalType('add');
      setShowModal(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <Button onClick={openAddModal} icon={<Plus size={18} />}>
            Add {activeTab === 'teachers' ? 'Teacher' : activeTab === 'students' ? 'Student' : 'Admin'}
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-border">
          <Search size={18} className="text-muted" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-dark placeholder-muted"
          />
        </div>

        {/* User Cards Grid */}
        {activeTab === 'teachers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTeachers.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:border-secondary/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-dark">{teacher.name}</h4>
                        <p className="text-sm text-muted">{teacher.email}</p>
                      </div>
                    </div>
                    <Badge color="orange">Teacher</Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-muted">
                      <span className="font-medium text-dark">Subjects:</span> {teacher.subjects.join(', ')}
                    </p>
                    <p className="text-sm text-muted">
                      <span className="font-medium text-dark">Classes:</span> {teacher.classrooms.join(', ')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" icon={<Edit2 size={14} />}>Edit</Button>
                    <Button size="sm" variant="ghost" className="text-rose-600 hover:bg-rose-50" icon={<Trash2 size={14} />}>Delete</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStudents.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:border-secondary/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-dark">{student.name}</h4>
                        <p className="text-sm text-muted">Roll: {student.rollNumber}</p>
                      </div>
                    </div>
                    <Badge color="green">Grade {student.grade}-{student.section}</Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-muted">
                      <span className="font-medium text-dark">Email:</span> {student.email}
                    </p>
                    <p className="text-sm text-muted">
                      <span className="font-medium text-dark">Parent:</span> {student.parentName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" icon={<Edit2 size={14} />}>Edit</Button>
                    <Button size="sm" variant="ghost" className="text-rose-600 hover:bg-rose-50" icon={<Trash2 size={14} />}>Delete</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAdmins.map((admin, index) => (
              <motion.div
                key={admin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:border-secondary/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold">
                        {admin.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-dark">{admin.name}</h4>
                        <p className="text-sm text-muted">{admin.email}</p>
                      </div>
                    </div>
                    <Badge color="gray">Admin</Badge>
                  </div>
                  <p className="text-sm text-muted mb-4">
                    <span className="font-medium text-dark">Department:</span> {admin.department}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" icon={<Edit2 size={14} />}>Edit</Button>
                    <Button size="sm" variant="ghost" className="text-rose-600 hover:bg-rose-50" icon={<Trash2 size={14} />}>Delete</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'roles' && (
          <Card>
            <h3 className="text-lg font-bold text-dark mb-6">Role Permissions</h3>
            <div className="space-y-6">
              {['Teacher', 'Student'].map((role) => (
                <div key={role} className="p-6 bg-primary rounded-xl">
                  <h4 className="font-bold text-dark mb-4">{role} Permissions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'View Students', checked: role === 'Teacher' },
                      { label: 'Mark Attendance', checked: role === 'Teacher' },
                      { label: 'Create Courses', checked: role === 'Teacher' },
                      { label: 'Create Quizzes', checked: role === 'Teacher' },
                      { label: 'View Courses', checked: true },
                      { label: 'Submit Assignments', checked: role === 'Student' },
                      { label: 'Take Quizzes', checked: role === 'Student' },
                      { label: 'View Grades', checked: true },
                    ].map((perm) => (
                      <label key={perm.label} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" defaultChecked={perm.checked} className="w-4 h-4 rounded text-secondary focus:ring-secondary" />
                        <span className="text-dark">{perm.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <Button>Save Permissions</Button>
            </div>
          </Card>
        )}

        {/* Add/Edit Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`${modalType === 'add' ? 'Add' : 'Edit'} ${activeTab.slice(0, -1)}`} size="md">
          <form className="space-y-4">
            <Input label="Full Name" placeholder="Enter full name" />
            <Input label="Email" type="email" placeholder="email@school.edu" />
            <Input label="Phone" placeholder="555-0000" />
            {activeTab === 'teachers' && (
              <Select
                label="Subjects"
                value=""
                onChange={() => { }}
                options={mockSubjects.map(s => ({ value: s.id, label: s.name }))}
                placeholder="Select subjects"
              />
            )}
            {activeTab === 'students' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Grade"
                    value=""
                    onChange={() => { }}
                    options={[{ value: '9', label: 'Grade 9' }, { value: '10', label: 'Grade 10' }, { value: '11', label: 'Grade 11' }]}
                    placeholder="Select grade"
                  />
                  <Select
                    label="Section"
                    value=""
                    onChange={() => { }}
                    options={[{ value: 'A', label: 'Section A' }, { value: 'B', label: 'Section B' }]}
                    placeholder="Select section"
                  />
                </div>
                <Input label="Parent Name" placeholder="Enter parent name" />
                <Input label="Parent Phone" placeholder="555-0000" />
              </>
            )}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit">{modalType === 'add' ? 'Add' : 'Save Changes'}</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // Academic Management Section
  const renderAcademicManagement = () => {
    const tabs = [
      { id: 'subjects', label: 'Subjects', icon: <BookOpen size={16} /> },
      { id: 'teacher-assign', label: 'Teacher Assignments', icon: <Users size={16} /> },
      { id: 'student-enroll', label: 'Student Enrollments', icon: <GraduationCap size={16} /> },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <Button icon={<Plus size={18} />}>Create Subject</Button>
        </div>

        {activeTab === 'subjects' && (
          <div className="space-y-4">
            {mockSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:border-secondary/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg">
                        {subject.code}
                      </div>
                      <div>
                        <h4 className="font-bold text-dark text-lg">{subject.name}</h4>
                        <p className="text-sm text-muted">{subject.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-dark">{subject.teacherIds.length}</p>
                        <p className="text-xs text-muted">Teachers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-dark">{subject.grades.length}</p>
                        <p className="text-xs text-muted">Grades</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" icon={<Edit2 size={14} />}>Edit</Button>
                        <Button size="sm" variant="ghost" className="text-rose-600" icon={<Trash2 size={14} />}>Delete</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'teacher-assign' && (
          <Card>
            <h3 className="font-bold text-dark mb-6">Assign Subjects to Teachers</h3>
            <div className="space-y-4">
              <Select
                label="Select Subject"
                value=""
                onChange={() => { }}
                options={mockSubjects.map(s => ({ value: s.id, label: s.name }))}
                placeholder="Choose a subject"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark">Select Teachers</label>
                <div className="grid grid-cols-2 gap-3">
                  {mockTeachers.map(teacher => (
                    <label key={teacher.id} className="flex items-center gap-3 p-3 bg-primary rounded-xl cursor-pointer hover:bg-secondary/10 transition-all">
                      <input type="checkbox" className="w-4 h-4 rounded text-secondary focus:ring-secondary" />
                      <span className="text-dark">{teacher.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button>Assign Subject</Button>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'student-enroll' && (
          <Card>
            <h3 className="font-bold text-dark mb-6">Enroll Students to Subjects</h3>
            <div className="space-y-4">
              <Select
                label="Select Subject"
                value=""
                onChange={() => { }}
                options={mockSubjects.map(s => ({ value: s.id, label: s.name }))}
                placeholder="Choose a subject"
              />
              <Select
                label="Select Class"
                value=""
                onChange={() => { }}
                options={mockClassrooms.flatMap(c => c.sections.map(s => ({ value: `${c.grade}-${s.name}`, label: `Grade ${c.grade} - Section ${s.name}` })))}
                placeholder="Choose a class"
              />
              <div className="flex justify-end pt-4">
                <Button>Enroll Class</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  };

  // Classroom Management Section
  const renderClassroomManagement = () => {
    const tabs = [
      { id: 'classrooms', label: 'Classrooms', icon: <Layers size={16} /> },
      { id: 'student-assign', label: 'Student Assignment', icon: <GraduationCap size={16} /> },
      { id: 'teacher-assign', label: 'Teacher Assignment', icon: <Users size={16} /> },
      { id: 'timetable', label: 'Timetable Builder', icon: <Calendar size={16} /> },
    ];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00'];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          {activeTab === 'classrooms' && <Button icon={<Plus size={18} />}>Create Classroom</Button>}
        </div>

        {activeTab === 'classrooms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockClassrooms.map((classroom, index) => (
              <motion.div
                key={classroom.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:border-secondary/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-dark">{classroom.name}</h3>
                    <Badge color="blue">Grade {classroom.grade}</Badge>
                  </div>
                  <div className="space-y-3 mb-4">
                    {classroom.sections.map(section => (
                      <div key={section.id} className="flex items-center justify-between p-3 bg-primary rounded-lg">
                        <span className="font-medium text-dark">Section {section.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge color="green" size="sm">{section.studentCount} Students</Badge>
                          <ChevronRight size={16} className="text-muted" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="w-full" icon={<Plus size={14} />}>
                    Add Section
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'timetable' && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-dark text-lg">Timetable Builder</h3>
                <p className="text-sm text-muted">Click on empty slots to assign classes</p>
              </div>
              <div className="flex gap-3">
                <Select
                  value=""
                  onChange={() => { }}
                  options={mockClassrooms.flatMap(c => c.sections.map(s => ({ value: `${c.grade}-${s.name}`, label: `Grade ${c.grade}-${s.name}` })))}
                  placeholder="Select class"
                />
                <Button>Publish Timetable</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header */}
                <div className="grid grid-cols-6 gap-2 mb-2">
                  <div className="p-3 font-bold text-dark text-center">Time</div>
                  {days.map(day => (
                    <div key={day} className="p-3 font-bold text-dark text-center bg-primary rounded-lg">{day}</div>
                  ))}
                </div>
                {/* Time Slots */}
                {times.map(time => (
                  <div key={time} className="grid grid-cols-6 gap-2 mb-2">
                    <div className="p-4 text-dark text-center font-medium bg-primary rounded-lg">{time}</div>
                    {days.map(day => (
                      <motion.button
                        key={`${day}-${time}`}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 border-2 border-dashed border-border rounded-xl text-muted hover:border-secondary hover:bg-secondary/5 transition-all min-h-[60px] flex items-center justify-center"
                      >
                        <Plus size={18} />
                      </motion.button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {(activeTab === 'student-assign' || activeTab === 'teacher-assign') && (
          <Card>
            <h3 className="font-bold text-dark mb-6">
              {activeTab === 'student-assign' ? 'Assign Students to Classes' : 'Assign Teachers to Classes'}
            </h3>
            <div className="space-y-4">
              <Select
                label="Select Classroom"
                value=""
                onChange={() => { }}
                options={mockClassrooms.flatMap(c => c.sections.map(s => ({ value: `${c.grade}-${s.name}`, label: `Grade ${c.grade} - Section ${s.name}` })))}
                placeholder="Choose a class"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark">
                  Select {activeTab === 'student-assign' ? 'Students' : 'Teachers'}
                </label>
                <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  {(activeTab === 'student-assign' ? mockStudents : mockTeachers).map(user => (
                    <label key={user.id} className="flex items-center gap-3 p-3 bg-primary rounded-xl cursor-pointer hover:bg-secondary/10 transition-all">
                      <input type="checkbox" className="w-4 h-4 rounded text-secondary focus:ring-secondary" />
                      <span className="text-dark">{user.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button>Save Assignments</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  };

  // Main render based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'user-management':
        return renderUserManagement();
      case 'academic-management':
        return renderAcademicManagement();
      case 'classroom-management':
        return renderClassroomManagement();
      default:
        return renderDashboard();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">
            {activeSection === 'dashboard' ? 'Admin Dashboard' :
              activeSection === 'user-management' ? 'User Management' :
                activeSection === 'academic-management' ? 'Academic Management' :
                  'Classroom Management'}
          </h1>
          <p className="text-muted mt-1">
            {activeSection === 'dashboard' ? 'Welcome back, Administrator. Here\'s your overview.' :
              activeSection === 'user-management' ? 'Manage teachers, students, and admins' :
                activeSection === 'academic-management' ? 'Configure subjects and assignments' :
                  'Organize classrooms, sections, and timetables'}
          </p>
        </div>
      </div>

      {renderContent()}
    </motion.div>
  );
};
