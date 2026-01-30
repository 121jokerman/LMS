import React, { useState } from 'react';
import {
  BookOpen, Play, FileText, Clock, Calendar,
  CheckCircle2, Award, Upload, Eye, Download,
  ChevronRight, AlertCircle, BarChart2, LayoutGrid, List
} from 'lucide-react';
import { Card, Button, Badge, Tabs, StatCard, Modal } from '../components/ui';
import { motion } from 'framer-motion';
import { mockCourses, mockAssignments, mockQuizzes, mockMaterials } from '../data/mockData';

export const StudentDashboard: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const [activeTab, setActiveTab] = useState('courses');
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timetableView, setTimetableView] = useState<'calendar' | 'list'>('calendar');

  // Dashboard with Timetable
  const renderDashboard = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'];

    const timetableData: { [key: string]: { subject: string; teacher: string; room: string; color: string } } = {
      'Monday-08:00': { subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 201', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      'Monday-09:00': { subject: 'English', teacher: 'Ms. Johnson', room: 'Room 105', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      'Monday-11:00': { subject: 'Physics', teacher: 'Mr. Smith', room: 'Lab 1', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      'Tuesday-08:00': { subject: 'Chemistry', teacher: 'Mr. Brown', room: 'Lab 2', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      'Tuesday-10:00': { subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 201', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      'Tuesday-14:00': { subject: 'CS', teacher: 'Ms. Davis', room: 'Computer Lab', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      'Wednesday-09:00': { subject: 'English', teacher: 'Ms. Johnson', room: 'Room 105', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      'Wednesday-11:00': { subject: 'Biology', teacher: 'Mr. Brown', room: 'Lab 3', color: 'bg-green-100 text-green-700 border-green-200' },
      'Thursday-08:00': { subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 201', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      'Thursday-10:00': { subject: 'Physics', teacher: 'Mr. Smith', room: 'Lab 1', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      'Thursday-15:00': { subject: 'History', teacher: 'Ms. Johnson', room: 'Room 302', color: 'bg-orange-100 text-orange-700 border-orange-200' },
      'Friday-09:00': { subject: 'Chemistry', teacher: 'Mr. Brown', room: 'Lab 2', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      'Friday-11:00': { subject: 'CS', teacher: 'Ms. Davis', room: 'Computer Lab', color: 'bg-rose-100 text-rose-700 border-rose-200' },
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
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-secondary to-secondaryHover text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Welcome back, Alex!</h2>
            <p className="opacity-90 mb-4">You have 2 pending assignments and 1 quiz due today.</p>
            <Button variant="secondary" className="bg-white text-secondary hover:bg-white/90">
              View Assignments
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Attendance Rate" value="95%" icon={<Calendar size={24} />} color="bg-emerald-500" positive trend="+2% this month" />
          <StatCard label="Average Grade" value="A-" icon={<Award size={24} />} color="bg-secondary" />
          <StatCard label="Courses Enrolled" value={4} icon={<BookOpen size={24} />} color="bg-blue-500" />
          <StatCard label="Pending Tasks" value={3} icon={<Clock size={24} />} color="bg-amber-500" />
        </div>

        {/* Timetable with View Toggle */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-dark">
                {timetableView === 'calendar' ? 'My Weekly Schedule' : "Today's Classes"}
              </h3>
              <p className="text-sm text-muted">
                {timetableView === 'calendar' ? 'Your class timetable for this week' : new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
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
                              <p className="text-[10px] opacity-80">{slot.room}</p>
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
                  <div className="flex-1">
                    <h4 className="font-bold text-dark">{slot.subject}</h4>
                    <p className="text-sm text-muted">{slot.teacher} • {slot.room}</p>
                  </div>
                  {slot.status === 'completed' && <Badge color="green">Done</Badge>}
                  {slot.status === 'ongoing' && <Badge color="orange">In Progress</Badge>}
                  {slot.status === 'upcoming' && <Badge color="gray">Upcoming</Badge>}
                </motion.div>
              )) : (
                <div className="text-center py-8 text-muted">No classes scheduled for today</div>
              )}
            </div>
          )}
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <h3 className="font-bold text-dark text-lg mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {[
              { title: 'Chapter 4 Problem Set', type: 'assignment', due: 'Tomorrow', urgent: true },
              { title: 'Physics Unit Test', type: 'quiz', due: 'In 3 days', urgent: false },
              { title: 'Essay: Shakespeare Analysis', type: 'assignment', due: 'Feb 10', urgent: false },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-xl ${item.urgent ? 'bg-rose-50 border border-rose-200' : 'bg-primary'}`}
              >
                <div className="flex items-center gap-3">
                  {item.urgent && <AlertCircle className="text-rose-500" size={20} />}
                  <div>
                    <p className="font-medium text-dark">{item.title}</p>
                    <p className="text-sm text-muted">{item.type} • Due: {item.due}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-muted" />
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  // Courses & Learning
  const renderCourses = () => {
    const tabs = [
      { id: 'courses', label: 'My Courses', icon: <BookOpen size={16} /> },
      { id: 'materials', label: 'Materials', icon: <FileText size={16} /> },
      { id: 'lesson-plans', label: 'Lesson Plans', icon: <Calendar size={16} /> },
    ];

    return (
      <div className="space-y-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:border-secondary/30 group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <BookOpen size={24} />
                    </div>
                    <Badge color="green">In Progress</Badge>
                  </div>
                  <h4 className="font-bold text-dark text-lg mb-2">{course.title}</h4>
                  <p className="text-sm text-muted mb-4 line-clamp-2">{course.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted">Progress</span>
                      <span className="font-medium text-dark">{60 + index * 10}%</span>
                    </div>
                    <div className="h-2 bg-primary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${60 + index * 10}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="h-full bg-secondary rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted mb-4">
                    <span>{course.materialIds.length} Materials</span>
                    <span>•</span>
                    <span>Grade {course.grade}</span>
                  </div>

                  <Button className="w-full" icon={<Play size={16} />}>Continue Learning</Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-4">
            {[
              { type: 'video', title: 'Introduction to Algebra', course: 'Algebra Fundamentals', duration: '45 min', progress: 80 },
              { type: 'document', title: 'Practice Problems Set', course: 'Algebra Fundamentals', pages: 12, progress: 100 },
              { type: 'video', title: 'Newton\'s Laws Explained', course: 'Mechanics & Motion', duration: '32 min', progress: 50 },
              { type: 'link', title: 'Python Tutorial', course: 'Intro to Programming', progress: 30 },
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
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${material.type === 'video' ? 'bg-purple-100 text-purple-600' :
                        material.type === 'document' ? 'bg-blue-100 text-blue-600' :
                          'bg-emerald-100 text-emerald-600'
                        }`}>
                        {material.type === 'video' ? <Play size={24} /> :
                          material.type === 'document' ? <FileText size={24} /> :
                            <BookOpen size={24} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-dark">{material.title}</h4>
                        <p className="text-sm text-muted">{material.course}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-24 h-1.5 bg-primary rounded-full overflow-hidden">
                            <div className="h-full bg-secondary rounded-full" style={{ width: `${material.progress}%` }} />
                          </div>
                          <span className="text-xs text-muted">{material.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge color={
                        material.type === 'video' ? 'blue' :
                          material.type === 'document' ? 'gray' : 'green'
                      }>
                        {material.type === 'video' ? material.duration :
                          material.type === 'document' ? `${material.pages} pages` : 'External'}
                      </Badge>
                      <Button size="sm" icon={material.progress === 100 ? <CheckCircle2 size={14} /> : <Play size={14} />}>
                        {material.progress === 100 ? 'Review' : 'Continue'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'lesson-plans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Week 1: Algebra Basics', topics: ['Variables', 'Equations', 'Expressions'], completed: true },
              { title: 'Week 2: Linear Equations', topics: ['Graphing', 'Slope', 'Intercepts'], completed: true },
              { title: 'Week 3: Quadratic Equations', topics: ['Factoring', 'Quadratic Formula', 'Applications'], completed: false },
              { title: 'Week 4: Functions', topics: ['Domain', 'Range', 'Graphs'], completed: false },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={plan.completed ? 'border-emerald-200 bg-emerald-50/30' : ''}>
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-dark">{plan.title}</h4>
                    {plan.completed ? (
                      <Badge color="green" size="sm">Completed</Badge>
                    ) : (
                      <Badge color="yellow" size="sm">In Progress</Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    {plan.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={16} className={plan.completed ? 'text-emerald-500' : 'text-gray-300'} />
                        <span className="text-sm text-dark">{topic}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Assignments & Quizzes
  const renderAssignments = () => {
    const tabs = [
      { id: 'assignments', label: 'Assignments', icon: <FileText size={16} /> },
      { id: 'quizzes', label: 'Quizzes', icon: <Clock size={16} /> },
    ];

    return (
      <div className="space-y-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'assignments' && (
          <div className="space-y-4">
            {mockAssignments.map((assignment, index) => {
              const submitted = index === 0;
              const daysLeft = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              const urgent = daysLeft <= 2;

              return (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`hover:border-secondary/30 ${urgent && !submitted ? 'border-rose-200 bg-rose-50/30' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${submitted ? 'bg-emerald-100 text-emerald-600' :
                          urgent ? 'bg-rose-100 text-rose-600' :
                            'bg-secondary/10 text-secondary'
                          }`}>
                          {submitted ? <CheckCircle2 size={24} /> : <FileText size={24} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-dark text-lg">{assignment.title}</h4>
                          <p className="text-sm text-muted">Due: {new Date(assignment.dueDate).toLocaleDateString()} {urgent && !submitted && '(Tomorrow!)'}</p>
                        </div>
                      </div>
                      {submitted ? (
                        <Badge color="green">Submitted</Badge>
                      ) : urgent ? (
                        <Badge color="red">Due Soon</Badge>
                      ) : (
                        <Badge color="yellow">Pending</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted mb-4 line-clamp-2">{assignment.instructions}</p>

                    {submitted ? (
                      <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                        <div>
                          <p className="font-medium text-emerald-700">Submitted on Jan 30, 2026</p>
                          <p className="text-sm text-emerald-600">Grade: 92/100 - Excellent work!</p>
                        </div>
                        <Button variant="outline" size="sm" icon={<Eye size={14} />}>View Feedback</Button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <Button className="flex-1" icon={<Upload size={16} />}>Upload Submission</Button>
                        <Button variant="outline">View Details</Button>
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="space-y-4">
            {mockQuizzes.map((quiz, index) => {
              const completed = index === 1;

              return (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={completed ? 'border-emerald-200' : 'hover:border-secondary/30'}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${completed ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'
                          }`}>
                          {completed ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-dark text-lg">{quiz.title}</h4>
                          <p className="text-sm text-muted">
                            {quiz.questions.length} Questions • {quiz.duration} minutes
                          </p>
                          <p className="text-sm text-muted">Due: {new Date(quiz.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {completed ? (
                          <>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-emerald-600">85%</p>
                              <p className="text-xs text-muted">Score</p>
                            </div>
                            <Badge color="green">Completed</Badge>
                          </>
                        ) : (
                          <>
                            <Badge color="yellow">Not Started</Badge>
                            <Button icon={<Play size={16} />} onClick={() => setShowQuizModal(true)}>
                              Start Quiz
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Quiz Modal */}
        <Modal isOpen={showQuizModal} onClose={() => setShowQuizModal(false)} title="Algebra Mid-Term Practice" size="lg">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Badge color="blue">Question {currentQuestion + 1} of 3</Badge>
              <div className="flex items-center gap-2 text-muted">
                <Clock size={16} />
                <span>44:30 remaining</span>
              </div>
            </div>
            <div className="h-1 bg-primary rounded-full overflow-hidden mb-6">
              <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / 3) * 100}%` }} />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-dark mb-6">What is the quadratic formula?</h3>
            <div className="space-y-3">
              {[
                'x = -b ± √(b²-4ac) / 2a',
                'x = b ± √(b²+4ac) / 2a',
                'x = -b ± √(b²-4ac) / a',
              ].map((option, index) => (
                <label key={index} className="flex items-center gap-4 p-4 bg-primary rounded-xl cursor-pointer hover:bg-secondary/10 transition-all border-2 border-transparent has-[:checked]:border-secondary has-[:checked]:bg-secondary/10">
                  <input type="radio" name="answer" className="w-5 h-5 text-secondary focus:ring-secondary" />
                  <span className="text-dark">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(c => c - 1)}>
              Previous
            </Button>
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${currentQuestion === i ? 'bg-secondary text-white' : 'bg-primary text-dark hover:bg-secondary/20'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            {currentQuestion === 2 ? (
              <Button onClick={() => setShowQuizModal(false)}>Submit Quiz</Button>
            ) : (
              <Button onClick={() => setCurrentQuestion(c => c + 1)}>Next</Button>
            )}
          </div>
        </Modal>
      </div>
    );
  };

  // Attendance View
  const renderAttendance = () => {
    const daysInMonth = 31;
    const attendanceData = Array.from({ length: daysInMonth }, (_, i) => {
      if (i === 4 || i === 5 || i === 11 || i === 12 || i === 18 || i === 19 || i === 25 || i === 26) return 'weekend';
      if (i === 8) return 'absent';
      if (i === 15) return 'late';
      return 'present';
    });

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard label="Attendance Rate" value="95%" icon={<Calendar size={24} />} color="bg-emerald-500" />
          <StatCard label="Days Present" value={19} icon={<CheckCircle2 size={24} />} color="bg-blue-500" />
          <StatCard label="Days Absent" value={1} icon={<AlertCircle size={24} />} color="bg-rose-500" />
          <StatCard label="Days Late" value={1} icon={<Clock size={24} />} color="bg-amber-500" />
        </div>

        {/* Calendar View */}
        <Card>
          <h3 className="font-bold text-dark text-lg mb-6">January 2026</h3>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted py-2">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before the 1st */}
            {[...Array(3)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {/* Actual days */}
            {attendanceData.map((status, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium ${status === 'present' ? 'bg-emerald-100 text-emerald-700' :
                  status === 'absent' ? 'bg-rose-100 text-rose-700' :
                    status === 'late' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-400'
                  }`}
              >
                {index + 1}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
            {[
              { label: 'Present', color: 'bg-emerald-500' },
              { label: 'Absent', color: 'bg-rose-500' },
              { label: 'Late', color: 'bg-amber-500' },
              { label: 'Weekend', color: 'bg-gray-300' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  // Performance View
  const renderPerformance = () => (
    <div className="space-y-6">
      {/* Overall Performance Card */}
      <Card className="bg-gradient-to-r from-secondary to-secondaryHover text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Overall Performance</h3>
            <p className="opacity-90">You're doing great! Keep up the excellent work.</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold">A-</p>
            <p className="text-sm opacity-75">91% Average</p>
          </div>
        </div>
      </Card>

      {/* Subject-wise Performance */}
      <Card>
        <h3 className="font-bold text-dark text-lg mb-6">Subject-wise Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Daily Avg</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Internal</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Overall</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dark">Grade</th>
              </tr>
            </thead>
            <tbody>
              {[
                { subject: 'Mathematics', daily: 92, internal: 88, overall: 90, grade: 'A' },
                { subject: 'Physics', daily: 85, internal: 82, overall: 83, grade: 'B+' },
                { subject: 'English', daily: 88, internal: 90, overall: 89, grade: 'A-' },
                { subject: 'Computer Science', daily: 95, internal: 92, overall: 94, grade: 'A' },
              ].map((row, index) => (
                <motion.tr
                  key={row.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-border hover:bg-primary/50 transition-colors"
                >
                  <td className="px-4 py-4 font-medium text-dark">{row.subject}</td>
                  <td className="px-4 py-4">{row.daily}%</td>
                  <td className="px-4 py-4">{row.internal}%</td>
                  <td className="px-4 py-4 font-bold text-dark">{row.overall}%</td>
                  <td className="px-4 py-4">
                    <Badge color={row.grade.startsWith('A') ? 'green' : 'blue'}>{row.grade}</Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Assessments */}
      <Card>
        <h3 className="font-bold text-dark text-lg mb-6">Recent Assessment Results</h3>
        <div className="space-y-4">
          {[
            { title: 'Unit Test 1 - Mathematics', date: 'Jan 20', score: 23, maxScore: 25, grade: 'A' },
            { title: 'Daily Quiz - Physics', date: 'Jan 25', score: 4, maxScore: 5, grade: 'A-' },
            { title: 'Mid-Term - English', date: 'Jan 28', score: 88, maxScore: 100, grade: 'B+' },
          ].map((assessment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-primary rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <Award size={24} className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium text-dark">{assessment.title}</h4>
                  <p className="text-sm text-muted">{assessment.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-dark">{assessment.score}/{assessment.maxScore}</p>
                  <p className="text-sm text-muted">{Math.round((assessment.score / assessment.maxScore) * 100)}%</p>
                </div>
                <Badge color={assessment.grade.startsWith('A') ? 'green' : 'blue'}>{assessment.grade}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Progress Graph Placeholder */}
      <Card>
        <h3 className="font-bold text-dark text-lg mb-4">Progress Over Time</h3>
        <div className="h-48 flex items-center justify-center bg-primary rounded-xl text-muted">
          <BarChart2 size={48} className="opacity-50" />
          <span className="ml-4">Progress Chart (grades over time)</span>
        </div>
      </Card>
    </div>
  );

  // Main render
  const renderContent = () => {
    switch (activeSection) {
      case 'courses':
        return renderCourses();
      case 'assignments':
        return renderAssignments();
      case 'attendance':
        return renderAttendance();
      case 'performance':
        return renderPerformance();
      default:
        return renderDashboard();
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'courses': return 'Courses & Learning';
      case 'assignments': return 'Assignments & Quizzes';
      case 'attendance': return 'My Attendance';
      case 'performance': return 'Academic Performance';
      default: return 'Student Dashboard';
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
          {activeSection === 'dashboard' ? 'Keep learning, keep growing!' :
            `Track your ${getSectionTitle().toLowerCase()}.`}
        </p>
      </div>

      {renderContent()}
    </motion.div>
  );
};
