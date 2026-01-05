
import React from 'react';
import { Home, Search, Calendar, MessageSquare, User as UserIcon } from 'lucide-react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { User, UserRole } from './types';
import HomeView from './views/HomeView';
import ExploreView from './views/ExploreView';
import ScheduleView from './views/ScheduleView';
import MessagesView from './views/MessagesView';
import ProfileView from './views/ProfileView';

// Mock Current User
const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  avatar: 'https://picsum.photos/seed/alex/200',
  role: UserRole.STUDENT,
  institution: 'State University',
  major: 'Computer Science',
  rating: 4.8,
  bio: 'Junior CS major looking to master Algorithms and Data Structures.',
  subjects: ['Calculus', 'Python', 'Algorithms'],
  isVerified: false
};

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={22} />, label: 'Home', path: '/' },
    { icon: <Search size={22} />, label: 'Explore', path: '/explore' },
    { icon: <Calendar size={22} />, label: 'Schedule', path: '/schedule' },
    { icon: <MessageSquare size={22} />, label: 'Messages', path: '/messages' },
    { icon: <UserIcon size={22} />, label: 'Profile', path: '/profile' },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex justify-between items-center z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] md:hidden">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${
              location.pathname === item.path ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 p-6 flex-col z-50">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <BookOpen className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Academia
          </span>
        </div>
        <div className="space-y-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all font-medium ${
                location.pathname === item.path 
                  ? 'text-indigo-600 bg-indigo-50 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-auto p-4 bg-slate-50 rounded-2xl">
          <p className="text-xs text-slate-500 font-medium mb-1">Signed in as</p>
          <p className="text-sm font-bold text-slate-900 truncate">{MOCK_USER.name}</p>
        </div>
      </nav>
    </>
  );
};

import { BookOpen } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 md:pl-64">
      <div className="max-w-5xl mx-auto min-h-screen bg-white md:shadow-sm pb-24 md:pb-8 relative">
        {children}
      </div>
      <Navigation />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeView user={MOCK_USER} />} />
          <Route path="/explore" element={<ExploreView />} />
          <Route path="/schedule" element={<ScheduleView />} />
          <Route path="/messages" element={<MessagesView />} />
          <Route path="/profile" element={<ProfileView user={MOCK_USER} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
