import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Play, 
  Pause, 
  Square,
  Plus,
  CheckCircle
} from 'lucide-react';
import { User } from '../../types';

interface TimeTrackingProps {
  user: User;
}

interface TimeEntry {
  id: string;
  project: string;
  description: string;
  date: string;
  hours: number;
  status: 'draft' | 'submitted';
}

export function TimeTracking({ user }: TimeTrackingProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [currentSession, setCurrentSession] = useState({ 
    project: '', 
    description: '', 
    startTime: null as Date | null,
    elapsedTime: 0
  });
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualEntry, setManualEntry] = useState({
    project: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    hours: ''
  });

  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    {
      id: '1',
      project: 'Project Alpha',
      description: 'Frontend development and bug fixes',
      date: '2025-01-10',
      hours: 8,
      status: 'submitted'
    },
    {
      id: '2',
      project: 'Project Beta',
      description: 'Database optimization',
      date: '2025-01-09',
      hours: 6,
      status: 'submitted'
    },
    {
      id: '3',
      project: 'Project Alpha',
      description: 'Code review and testing',
      date: '2025-01-08',
      hours: 4,
      status: 'draft'
    }
  ]);

  const projects = [
    'Project Alpha',
    'Project Beta', 
    'Project Gamma',
    'Internal Tools',
    'Admin Tasks'
  ];

  const startTracking = () => {
    if (currentSession.project && currentSession.description) {
      setIsTracking(true);
      setCurrentSession({
        ...currentSession,
        startTime: new Date(),
        elapsedTime: 0
      });
    }
  };

  const pauseTracking = () => {
    setIsTracking(false);
  };

  const stopTracking = () => {
    if (currentSession.startTime && currentSession.elapsedTime > 0) {
      const hours = Math.round(currentSession.elapsedTime / 3600 * 100) / 100;
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        project: currentSession.project,
        description: currentSession.description,
        date: new Date().toISOString().split('T')[0],
        hours,
        status: 'draft'
      };
      
      setTimeEntries([newEntry, ...timeEntries]);
      setCurrentSession({ project: '', description: '', startTime: null, elapsedTime: 0 });
      setIsTracking(false);
    }
  };

  const addManualEntry = () => {
    if (manualEntry.project && manualEntry.description && manualEntry.hours) {
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        project: manualEntry.project,
        description: manualEntry.description,
        date: manualEntry.date,
        hours: parseFloat(manualEntry.hours),
        status: 'draft'
      };
      
      setTimeEntries([newEntry, ...timeEntries]);
      setManualEntry({
        project: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        hours: ''
      });
      setShowManualEntry(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && currentSession.startTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const start = currentSession.startTime!.getTime();
        setCurrentSession(prev => ({
          ...prev,
          elapsedTime: Math.floor((now - start) / 1000)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, currentSession.startTime]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Time Tracking</h1>
        <p className="text-gray-600 mt-2">Track your work hours and manage time entries.</p>
      </div>

      {/* Active Timer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Session</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-2">
                Project *
              </label>
              <select
                id="project"
                value={currentSession.project}
                onChange={(e) => setCurrentSession({ ...currentSession, project: e.target.value })}
                disabled={isTracking}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">Select a project</option>
                {projects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Task Description *
              </label>
              <input
                type="text"
                id="description"
                value={currentSession.description}
                onChange={(e) => setCurrentSession({ ...currentSession, description: e.target.value })}
                disabled={isTracking}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100"
                placeholder="What are you working on?"
              />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-gray-900 mb-2">
                {formatTime(currentSession.elapsedTime)}
              </div>
              <p className="text-sm text-gray-500">Elapsed Time</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            {!isTracking ? (
              <button
                onClick={startTracking}
                disabled={!currentSession.project || !currentSession.description}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start</span>
              </button>
            ) : (
              <>
                <button
                  onClick={pauseTracking}
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 flex items-center space-x-2"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </button>
                <button
                  onClick={stopTracking}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 flex items-center space-x-2"
                >
                  <Square className="w-5 h-5" />
                  <span>Stop & Save</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Manual Entry */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Manual Entry</h2>
          <button
            onClick={() => setShowManualEntry(!showManualEntry)}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Manual Entry</span>
          </button>
        </div>

        {showManualEntry && (
          <div className="space-y-6 border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label htmlFor="manual-project" className="block text-sm font-medium text-gray-700 mb-2">
                  Project *
                </label>
                <select
                  id="manual-project"
                  value={manualEntry.project}
                  onChange={(e) => setManualEntry({ ...manualEntry, project: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select project</option>
                  {projects.map(project => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="manual-date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  id="manual-date"
                  value={manualEntry.date}
                  onChange={(e) => setManualEntry({ ...manualEntry, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="manual-hours" className="block text-sm font-medium text-gray-700 mb-2">
                  Hours *
                </label>
                <input
                  type="number"
                  id="manual-hours"
                  step="0.25"
                  min="0"
                  value={manualEntry.hours}
                  onChange={(e) => setManualEntry({ ...manualEntry, hours: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={addManualEntry}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700"
                >
                  Add Entry
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="manual-description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <input
                type="text"
                id="manual-description"
                value={manualEntry.description}
                onChange={(e) => setManualEntry({ ...manualEntry, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Describe the work done..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Time Entries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Time Entries</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {timeEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.project}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.hours}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      entry.status === 'submitted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {entry.status === 'submitted' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}