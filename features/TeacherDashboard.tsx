import React, { useState } from 'react';
import {
   BookOpen, Video, FileText, Users,
   Clock, CheckCircle2, PlusCircle, Upload,
   PenTool, Calendar, Play, Eye,
   Edit2, Trash2, Send, UserCheck,
   ClipboardList, BarChart2, MessageSquare, LayoutGrid, List
} from 'lucide-react';
import { Card, Button, Badge, Tabs, Modal, Input, Select, Textarea, StatCard } from '../components/ui';
import { motion } from 'framer-motion';
import { mockStudents, mockCourses, mockAssignments, mockQuizzes, mockTimetable, mockSubjects, mockClassrooms, mockAttendance, mockDailyAssessments, mockInternalAssessments } from '../data/mockData';

export const TeacherDashboard: React.FC<{ activeSection: string }> = ({ activeSection }) => {
   const [activeTab, setActiveTab] = useState('courses');
   const [showModal, setShowModal] = useState(false);
   const [modalContent, setModalContent] = useState<'course' | 'material' | 'assignment' | 'quiz' | 'attendance' | 'assessment'>('course');
   const [timetableView, setTimetableView] = useState<'calendar' | 'list'>('calendar');

   // Dashboard Overview with Timetable
   const renderDashboard = () => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'];

      const timetableData: { [key: string]: { subject: string; class: string; room: string; color: string } } = {
         'Monday-08:00': { subject: 'Mathematics', class: '10-A', room: 'Room 201', color: 'bg-blue-100 text-blue-700 border-blue-200' },
         'Monday-10:00': { subject: 'Physics', class: '10-A', room: 'Lab 1', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
         'Tuesday-09:00': { subject: 'Mathematics', class: '10-B', room: 'Room 202', color: 'bg-blue-100 text-blue-700 border-blue-200' },
         'Tuesday-11:00': { subject: 'Physics', class: '9-A', room: 'Lab 1', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
         'Wednesday-08:00': { subject: 'Mathematics', class: '10-A', room: 'Room 201', color: 'bg-blue-100 text-blue-700 border-blue-200' },
         'Wednesday-14:00': { subject: 'Physics', class: '10-B', room: 'Lab 1', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
         'Thursday-09:00': { subject: 'Mathematics', class: '9-A', room: 'Room 203', color: 'bg-blue-100 text-blue-700 border-blue-200' },
         'Thursday-10:00': { subject: 'Physics', class: '10-A', room: 'Lab 1', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
         'Friday-08:00': { subject: 'Mathematics', class: '10-B', room: 'Room 202', color: 'bg-blue-100 text-blue-700 border-blue-200' },
         'Friday-11:00': { subject: 'Physics', class: '9-A', room: 'Lab 1', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      };

      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

      // Convert to list format
      const listSchedule = Object.entries(timetableData)
         .filter(([key]) => key.startsWith(today))
         .map(([key, value]) => ({
            time: key.split('-')[1],
            ...value,
            status: key.split('-')[1] < '10:00' ? 'completed' : key.split('-')[1] === '10:00' ? 'ongoing' : 'upcoming'
         }));

      return (
         <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <StatCard label="Today's Classes" value={4} icon={<Calendar size={24} />} color="bg-secondary" />
               <StatCard label="Pending Reviews" value={12} icon={<ClipboardList size={24} />} color="bg-blue-500" />
               <StatCard label="Active Courses" value={mockCourses.length} icon={<BookOpen size={24} />} color="bg-emerald-500" />
               <StatCard label="Total Students" value={85} icon={<Users size={24} />} color="bg-purple-500" />
            </div>

            {/* Timetable with View Toggle */}
            <Card>
               <div className="flex items-center justify-between mb-6">
                  <div>
                     <h3 className="text-xl font-bold text-dark">
                        {timetableView === 'calendar' ? 'My Weekly Schedule' : "Today's Classes"}
                     </h3>
                     <p className="text-sm text-muted">
                        {timetableView === 'calendar' ? 'Your teaching timetable for this week' : new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                     </p>
                  </div>
                  <div className="flex items-center gap-2">
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
                     <Button variant="outline" size="sm" icon={<Calendar size={16} />}>Full Timetable</Button>
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
                                             <p className="text-[10px] opacity-70">{slot.room}</p>
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
                           <div className="flex-1">
                              <h4 className="font-bold text-dark">{slot.subject}</h4>
                              <p className="text-sm text-muted">{slot.class} • {slot.room}</p>
                           </div>
                           <div className="flex items-center gap-2">
                              {slot.status === 'completed' && <Badge color="green">Done</Badge>}
                              {slot.status === 'ongoing' && (
                                 <>
                                    <Badge color="orange">In Progress</Badge>
                                    <Button size="sm" icon={<Video size={14} />}>Start</Button>
                                 </>
                              )}
                              {slot.status === 'upcoming' && <Badge color="gray">Upcoming</Badge>}
                           </div>
                        </motion.div>
                     )) : (
                        <div className="text-center py-8 text-muted">No classes scheduled for today</div>
                     )}
                  </div>
               )}
            </Card>

            {/* Quick Actions + Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <Card>
                  <h3 className="font-bold text-dark mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                     {[
                        { label: 'Mark Attendance', icon: UserCheck, color: 'bg-emerald-500' },
                        { label: 'Create Assignment', icon: PenTool, color: 'bg-blue-500' },
                        { label: 'Upload Material', icon: Upload, color: 'bg-purple-500' },
                        { label: 'Create Quiz', icon: FileText, color: 'bg-secondary' },
                     ].map((action, index) => (
                        <motion.button
                           key={action.label}
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: index * 0.1 }}
                           whileHover={{ scale: 1.03 }}
                           className="flex items-center gap-3 p-4 bg-primary rounded-xl hover:shadow-md transition-all"
                        >
                           <div className={`p-2 ${action.color} rounded-lg text-white`}>
                              <action.icon size={18} />
                           </div>
                           <span className="font-medium text-dark text-sm">{action.label}</span>
                        </motion.button>
                     ))}
                  </div>
               </Card>

               <Card>
                  <h3 className="font-bold text-dark mb-4">Needs Attention</h3>
                  <div className="space-y-3">
                     {[
                        { label: 'Unreviewed Assignments', count: 12, color: 'red' },
                        { label: 'Pending Quiz Grades', count: 8, color: 'yellow' },
                        { label: 'Student Messages', count: 3, color: 'blue' },
                     ].map((item, index) => (
                        <div key={item.label} className="flex items-center justify-between p-3 bg-primary rounded-lg">
                           <span className="text-dark">{item.label}</span>
                           <Badge color={item.color as any}>{item.count}</Badge>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>
         </div>
      );
   };

   // Student Management
   const renderStudentManagement = () => {
      const tabs = [
         { id: 'list', label: 'Student List', icon: <Users size={16} /> },
         { id: 'tracking', label: 'Daily Tracking', icon: <ClipboardList size={16} /> },
      ];

      return (
         <div className="space-y-6">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === 'list' && (
               <Card>
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="font-bold text-dark text-lg">My Students</h3>
                     <Select
                        value=""
                        onChange={() => { }}
                        options={[
                           { value: '10-A', label: 'Grade 10-A' },
                           { value: '10-B', label: 'Grade 10-B' },
                           { value: '9-A', label: 'Grade 9-A' },
                        ]}
                        placeholder="Filter by class"
                     />
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full">
                        <thead className="bg-primary">
                           <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Student</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Class</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Today's Status</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Avg. Grade</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {mockStudents.slice(0, 5).map((student, index) => (
                              <motion.tr
                                 key={student.id}
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: index * 0.05 }}
                                 className="border-t border-border hover:bg-primary/50 transition-colors"
                              >
                                 <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                          {student.name.split(' ').map(n => n[0]).join('')}
                                       </div>
                                       <div>
                                          <p className="font-medium text-dark">{student.name}</p>
                                          <p className="text-xs text-muted">Roll: {student.rollNumber}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-4 py-4">
                                    <Badge color="blue">Grade {student.grade}-{student.section}</Badge>
                                 </td>
                                 <td className="px-4 py-4">
                                    <Badge color={index === 2 ? 'red' : 'green'}>{index === 2 ? 'Absent' : 'Present'}</Badge>
                                 </td>
                                 <td className="px-4 py-4 font-bold text-dark">{85 + index}%</td>
                                 <td className="px-4 py-4">
                                    <Button size="sm" variant="ghost">View Profile</Button>
                                 </td>
                              </motion.tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </Card>
            )}

            {activeTab === 'tracking' && (
               <Card>
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="font-bold text-dark text-lg">Daily Student Tracking</h3>
                     <div className="flex gap-3">
                        <Select value="" onChange={() => { }} options={[{ value: '10-A', label: 'Grade 10-A' }]} placeholder="Select class" />
                        <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                     </div>
                  </div>
                  <div className="space-y-4">
                     {mockStudents.slice(0, 4).map((student, index) => (
                        <motion.div
                           key={student.id}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: index * 0.1 }}
                           className="p-4 bg-primary rounded-xl"
                        >
                           <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                 </div>
                                 <span className="font-medium text-dark">{student.name}</span>
                              </div>
                              <Badge color="blue">Grade {student.grade}-{student.section}</Badge>
                           </div>
                           <div className="grid grid-cols-3 gap-4">
                              <div>
                                 <label className="text-xs text-muted block mb-1">Behavior</label>
                                 <div className="flex gap-2">
                                    {['Excellent', 'Good', 'Needs Attention'].map((b) => (
                                       <button key={b} className="px-3 py-1 text-xs rounded-full border border-border hover:bg-secondary hover:text-white hover:border-secondary transition-all">
                                          {b}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                              <div>
                                 <label className="text-xs text-muted block mb-1">Participation</label>
                                 <div className="flex gap-2">
                                    {['Active', 'Passive', 'Absent'].map((p) => (
                                       <button key={p} className="px-3 py-1 text-xs rounded-full border border-border hover:bg-secondary hover:text-white hover:border-secondary transition-all">
                                          {p}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                              <div>
                                 <label className="text-xs text-muted block mb-1">Notes</label>
                                 <input type="text" placeholder="Add notes..." className="w-full px-3 py-1 text-sm rounded-lg border border-border focus:border-secondary outline-none" />
                              </div>
                           </div>
                        </motion.div>
                     ))}
                     <Button className="w-full">Save Daily Tracking</Button>
                  </div>
               </Card>
            )}
         </div>
      );
   };

   // Classroom & Subject Management
   const renderClassroomSubject = () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card>
            <h3 className="font-bold text-dark text-lg mb-4">My Classrooms</h3>
            <div className="space-y-3">
               {['Grade 10-A', 'Grade 10-B', 'Grade 9-A'].map((cls, index) => (
                  <motion.div
                     key={cls}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: index * 0.1 }}
                     className="flex items-center justify-between p-4 bg-primary rounded-xl hover:shadow-md transition-all cursor-pointer group"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary font-bold group-hover:bg-secondary group-hover:text-white transition-all">
                           {cls.split(' ')[1]}
                        </div>
                        <div>
                           <h4 className="font-bold text-dark">{cls}</h4>
                           <p className="text-sm text-muted">{28 + index} Students</p>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <Button size="sm" variant="ghost">View Roster</Button>
                        <Button size="sm" variant="outline">Timetable</Button>
                     </div>
                  </motion.div>
               ))}
            </div>
         </Card>

         <Card>
            <h3 className="font-bold text-dark text-lg mb-4">My Subjects</h3>
            <div className="space-y-3">
               {['Mathematics', 'Physics'].map((subject, index) => (
                  <motion.div
                     key={subject}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: index * 0.1 }}
                     className="p-4 bg-primary rounded-xl"
                  >
                     <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-dark">{subject}</h4>
                        <Badge color="blue">{3 - index} Classes</Badge>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {['10-A', '10-B', '9-A'].slice(0, 3 - index).map(cls => (
                           <span key={cls} className="px-3 py-1 bg-white rounded-full text-sm text-dark border border-border">
                              Grade {cls}
                           </span>
                        ))}
                     </div>
                  </motion.div>
               ))}
            </div>
         </Card>
      </div>
   );

   // Content Management (Courses, Materials, Assignments, Quizzes)
   const renderContentManagement = () => {
      const tabs = [
         { id: 'courses', label: 'Courses', icon: <BookOpen size={16} /> },
         { id: 'materials', label: 'Materials', icon: <FileText size={16} /> },
         { id: 'assignments', label: 'Assignments', icon: <PenTool size={16} /> },
         { id: 'quizzes', label: 'Quizzes', icon: <ClipboardList size={16} /> },
      ];

      const openModal = (type: typeof modalContent) => {
         setModalContent(type);
         setShowModal(true);
      };

      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
               <Button icon={<PlusCircle size={18} />} onClick={() => openModal(activeTab as any)}>
                  Create {activeTab === 'courses' ? 'Course' : activeTab === 'materials' ? 'Material' : activeTab === 'assignments' ? 'Assignment' : 'Quiz'}
               </Button>
            </div>

            {activeTab === 'courses' && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockCourses.map((course, index) => (
                     <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                     >
                        <Card className="hover:border-secondary/30 group">
                           <div className="flex items-start justify-between mb-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                 <BookOpen size={24} />
                              </div>
                              <Badge color="green">{course.studentIds.length} Students</Badge>
                           </div>
                           <h4 className="font-bold text-dark text-lg mb-2">{course.title}</h4>
                           <p className="text-sm text-muted mb-4 line-clamp-2">{course.description}</p>
                           <div className="flex items-center gap-2 text-xs text-muted mb-4">
                              <span className="px-2 py-1 bg-primary rounded-full">Grade {course.grade}</span>
                              <span className="px-2 py-1 bg-primary rounded-full">{course.materialIds.length} Materials</span>
                           </div>
                           <div className="flex gap-2">
                              <Button size="sm" variant="outline" icon={<Eye size={14} />}>View</Button>
                              <Button size="sm" variant="ghost" icon={<Edit2 size={14} />}>Edit</Button>
                           </div>
                        </Card>
                     </motion.div>
                  ))}
               </div>
            )}

            {activeTab === 'materials' && (
               <div className="space-y-4">
                  {[
                     { type: 'video', title: 'Introduction to Algebra', course: 'Algebra Fundamentals', date: 'Jan 2' },
                     { type: 'document', title: 'Practice Problems Set', course: 'Algebra Fundamentals', date: 'Jan 3' },
                     { type: 'link', title: 'Python Tutorial Link', course: 'Intro to Programming', date: 'Jan 11' },
                  ].map((material, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                     >
                        <Card className="hover:border-secondary/30">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${material.type === 'video' ? 'bg-purple-100 text-purple-600' :
                                    material.type === 'document' ? 'bg-blue-100 text-blue-600' :
                                       'bg-emerald-100 text-emerald-600'
                                    }`}>
                                    {material.type === 'video' ? <Video size={24} /> :
                                       material.type === 'document' ? <FileText size={24} /> :
                                          <Upload size={24} />}
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-dark">{material.title}</h4>
                                    <p className="text-sm text-muted">{material.course} • {material.date}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Badge color={material.type === 'video' ? 'blue' : material.type === 'document' ? 'gray' : 'green'}>
                                    {material.type}
                                 </Badge>
                                 <Button size="sm" variant="ghost" icon={<Edit2 size={14} />}>Edit</Button>
                                 <Button size="sm" variant="ghost" className="text-rose-600" icon={<Trash2 size={14} />}>Delete</Button>
                              </div>
                           </div>
                        </Card>
                     </motion.div>
                  ))}
               </div>
            )}

            {activeTab === 'assignments' && (
               <div className="space-y-4">
                  {mockAssignments.map((assignment, index) => (
                     <motion.div
                        key={assignment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                     >
                        <Card className="hover:border-secondary/30">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                                    <PenTool size={24} />
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-dark">{assignment.title}</h4>
                                    <p className="text-sm text-muted">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-4">
                                 <div className="text-center">
                                    <p className="text-2xl font-bold text-dark">2/{assignment.studentIds.length}</p>
                                    <p className="text-xs text-muted">Submitted</p>
                                 </div>
                                 <Button size="sm" variant="outline" icon={<Eye size={14} />}>View Submissions</Button>
                              </div>
                           </div>
                        </Card>
                     </motion.div>
                  ))}
               </div>
            )}

            {activeTab === 'quizzes' && (
               <div className="space-y-4">
                  {mockQuizzes.map((quiz, index) => (
                     <motion.div
                        key={quiz.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                     >
                        <Card className="hover:border-secondary/30">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                                    <ClipboardList size={24} />
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-dark">{quiz.title}</h4>
                                    <p className="text-sm text-muted">{quiz.questions.length} Questions • {quiz.duration} mins</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-4">
                                 <Badge color="yellow">Due: {new Date(quiz.dueDate).toLocaleDateString()}</Badge>
                                 <Button size="sm" variant="outline" icon={<Eye size={14} />}>Preview</Button>
                                 <Button size="sm" variant="ghost" icon={<Edit2 size={14} />}>Edit</Button>
                              </div>
                           </div>
                        </Card>
                     </motion.div>
                  ))}
               </div>
            )}

            {/* Create Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`Create ${modalContent}`} size="lg">
               <form className="space-y-4">
                  <Input label="Title" placeholder={`Enter ${modalContent} title`} />
                  {modalContent === 'course' && (
                     <>
                        <Textarea label="Description" placeholder="Course description" rows={3} />
                        <Select label="Subject" value="" onChange={() => { }} options={mockSubjects.map(s => ({ value: s.id, label: s.name }))} placeholder="Select subject" />
                        <Select label="Target Grade" value="" onChange={() => { }} options={[{ value: '10', label: 'Grade 10' }]} placeholder="Select grade" />
                     </>
                  )}
                  {modalContent === 'material' && (
                     <>
                        <Select label="Type" value="" onChange={() => { }} options={[{ value: 'video', label: 'Video' }, { value: 'document', label: 'Document' }, { value: 'link', label: 'External Link' }]} placeholder="Select type" />
                        <Input label="URL / Upload" placeholder="Enter URL or upload file" />
                        <Select label="Course" value="" onChange={() => { }} options={mockCourses.map(c => ({ value: c.id, label: c.title }))} placeholder="Select course" />
                        <Textarea label="Description" placeholder="Brief description" rows={2} />
                     </>
                  )}
                  {modalContent === 'assignment' && (
                     <>
                        <Textarea label="Instructions" placeholder="Assignment instructions" rows={4} />
                        <Select label="Course" value="" onChange={() => { }} options={mockCourses.map(c => ({ value: c.id, label: c.title }))} placeholder="Select course" />
                        <Input label="Due Date" type="date" />
                     </>
                  )}
                  {modalContent === 'quiz' && (
                     <>
                        <Select label="Course" value="" onChange={() => { }} options={mockCourses.map(c => ({ value: c.id, label: c.title }))} placeholder="Select course" />
                        <Input label="Duration (minutes)" type="number" placeholder="45" />
                        <Input label="Due Date" type="date" />
                        <p className="text-sm text-muted">After creating, you can add questions to the quiz.</p>
                     </>
                  )}
                  <div className="flex justify-end gap-3 pt-4">
                     <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                     <Button type="submit">Create {modalContent}</Button>
                  </div>
               </form>
            </Modal>
         </div>
      );
   };

   // Attendance
   const renderAttendance = () => {
      const tabs = [
         { id: 'mark', label: 'Mark Attendance', icon: <UserCheck size={16} /> },
         { id: 'overview', label: 'Overview', icon: <BarChart2 size={16} /> },
      ];

      return (
         <div className="space-y-6">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === 'mark' && (
               <Card>
                  <div className="flex items-center justify-between mb-6">
                     <div>
                        <h3 className="font-bold text-dark text-lg">Mark Attendance</h3>
                        <p className="text-sm text-muted">Select a class and mark attendance for today</p>
                     </div>
                     <div className="flex gap-3">
                        <Select value="" onChange={() => { }} options={[{ value: '10-A', label: 'Grade 10-A' }, { value: '10-B', label: 'Grade 10-B' }]} placeholder="Select class" />
                        <Select value="" onChange={() => { }} options={[{ value: 'sub1', label: 'Mathematics' }, { value: 'sub2', label: 'Physics' }]} placeholder="Select subject" />
                     </div>
                  </div>
                  <div className="space-y-3 mb-6">
                     {mockStudents.slice(0, 5).map((student, index) => (
                        <motion.div
                           key={student.id}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: index * 0.05 }}
                           className="flex items-center justify-between p-4 bg-primary rounded-xl"
                        >
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                 {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-medium text-dark">{student.name}</span>
                           </div>
                           <div className="flex gap-3">
                              {[
                                 { label: 'Present', color: 'emerald' },
                                 { label: 'Absent', color: 'rose' },
                                 { label: 'Late', color: 'amber' },
                              ].map((status) => (
                                 <label key={status.label} className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name={`attendance-${student.id}`} className={`w-4 h-4 text-${status.color}-500 focus:ring-${status.color}-500`} defaultChecked={status.label === 'Present'} />
                                    <span className="text-sm text-dark">{status.label}</span>
                                 </label>
                              ))}
                           </div>
                        </motion.div>
                     ))}
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl mb-4">
                     <span className="font-medium text-emerald-700">Summary: 4 Present | 1 Absent | 0 Late</span>
                  </div>
                  <Button className="w-full">Submit Attendance</Button>
               </Card>
            )}

            {activeTab === 'overview' && (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                     <h3 className="font-bold text-dark mb-4">Attendance Trends</h3>
                     <div className="h-48 flex items-center justify-center bg-primary rounded-xl text-muted">
                        [Attendance Chart Placeholder]
                     </div>
                  </Card>
                  <Card>
                     <h3 className="font-bold text-dark mb-4">Students Below 75%</h3>
                     <div className="space-y-3">
                        {[
                           { name: 'Michael Brown', percentage: 68 },
                           { name: 'Emily Davis', percentage: 72 },
                        ].map((student, index) => (
                           <div key={index} className="flex items-center justify-between p-3 bg-rose-50 rounded-lg">
                              <div>
                                 <p className="font-medium text-dark">{student.name}</p>
                                 <p className="text-sm text-rose-600">{student.percentage}% Attendance</p>
                              </div>
                              <Button size="sm" variant="outline" icon={<Send size={14} />}>Notify Parent</Button>
                           </div>
                        ))}
                     </div>
                  </Card>
               </div>
            )}
         </div>
      );
   };

   // Assessments
   const renderAssessments = () => {
      const tabs = [
         { id: 'daily', label: 'Daily Assessments', icon: <ClipboardList size={16} /> },
         { id: 'internal', label: 'Internal Assessments', icon: <FileText size={16} /> },
      ];

      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
               <Button icon={<PlusCircle size={18} />}>Create Assessment</Button>
            </div>

            {activeTab === 'daily' && (
               <Card>
                  <h3 className="font-bold text-dark mb-6">Daily Assessment Entry</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <Select label="Class" value="" onChange={() => { }} options={[{ value: '10-A', label: 'Grade 10-A' }]} placeholder="Select class" />
                     <Select label="Subject" value="" onChange={() => { }} options={[{ value: 'sub1', label: 'Mathematics' }]} placeholder="Select subject" />
                     <Input label="Topic" placeholder="e.g., Quadratic Equations" />
                     <Input label="Max Marks" type="number" placeholder="5" />
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full">
                        <thead className="bg-primary">
                           <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Student</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Marks</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Notes</th>
                           </tr>
                        </thead>
                        <tbody>
                           {mockStudents.slice(0, 4).map((student, index) => (
                              <tr key={student.id} className="border-t border-border">
                                 <td className="px-4 py-3 font-medium text-dark">{student.name}</td>
                                 <td className="px-4 py-3">
                                    <input type="number" className="w-16 px-2 py-1 rounded-lg border border-border text-center focus:border-secondary outline-none" placeholder="0" />
                                    <span className="text-muted ml-2">/ 5</span>
                                 </td>
                                 <td className="px-4 py-3">
                                    <input type="text" className="w-full px-2 py-1 rounded-lg border border-border focus:border-secondary outline-none" placeholder="Add notes..." />
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
                  <Button className="mt-6">Save Assessment</Button>
               </Card>
            )}

            {activeTab === 'internal' && (
               <div className="space-y-4">
                  {mockInternalAssessments.map((assessment, index) => (
                     <motion.div
                        key={assessment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                     >
                        <Card className="hover:border-secondary/30">
                           <div className="flex items-center justify-between">
                              <div>
                                 <div className="flex items-center gap-3 mb-2">
                                    <h4 className="font-bold text-dark text-lg">{assessment.title}</h4>
                                    <Badge color={assessment.type === 'mid-term' ? 'orange' : 'blue'}>{assessment.type}</Badge>
                                 </div>
                                 <p className="text-sm text-muted">Date: {assessment.date} • Max Marks: {assessment.maxMarks}</p>
                              </div>
                              <div className="flex items-center gap-6">
                                 <div className="text-center">
                                    <p className="text-2xl font-bold text-dark">{assessment.records.length}/{assessment.records.length}</p>
                                    <p className="text-xs text-muted">Graded</p>
                                 </div>
                                 <div className="text-center">
                                    <p className="text-2xl font-bold text-emerald-600">
                                       {Math.round(assessment.records.reduce((a, b) => a + b.marks, 0) / assessment.records.length)}%
                                    </p>
                                    <p className="text-xs text-muted">Average</p>
                                 </div>
                                 <Button size="sm" variant="outline" icon={<Eye size={14} />}>View Grades</Button>
                              </div>
                           </div>
                        </Card>
                     </motion.div>
                  ))}
               </div>
            )}
         </div>
      );
   };

   // Main render
   const renderContent = () => {
      switch (activeSection) {
         case 'student-management':
            return renderStudentManagement();
         case 'classroom-subject':
            return renderClassroomSubject();
         case 'content-management':
            return renderContentManagement();
         case 'attendance':
            return renderAttendance();
         case 'assessments':
            return renderAssessments();
         default:
            return renderDashboard();
      }
   };

   const getSectionTitle = () => {
      switch (activeSection) {
         case 'student-management': return 'Student Management';
         case 'classroom-subject': return 'Classroom & Subject';
         case 'content-management': return 'Content Management';
         case 'attendance': return 'Attendance';
         case 'assessments': return 'Assessments';
         default: return 'Teacher Dashboard';
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="space-y-6"
      >
         <div>
            <h1 className="text-3xl font-bold text-dark">{getSectionTitle()}</h1>
            <p className="text-muted mt-1">
               {activeSection === 'dashboard' ? 'Welcome back! Here\'s your teaching overview.' :
                  `Manage your ${getSectionTitle().toLowerCase()} efficiently.`}
            </p>
         </div>

         {renderContent()}
      </motion.div>
   );
};
