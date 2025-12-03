import React from 'react';
import { useState } from 'react';
import { Header } from '../components/Header';
import { DoctorHeader } from '../components/DoctorHeader';
import { PatientSidebar } from '../components/PatientSidebar';
import { DoctorSidebar } from '../components/DoctorSidebar';
import { Send, Paperclip, Search, MoreVertical, Archive, Trash2, Circle } from 'lucide-react';
import { PageType, UserRole } from '../App';

interface MessagesPageProps {
  userRole: UserRole;
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

interface Message {
  id: string;
  sender: string;
  senderRole: string;
  subject: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  avatar: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

const conversations: Message[] = [
  {
    id: '1',
    sender: 'Dr. Emily Carter',
    senderRole: 'Breast Imaging Specialist',
    subject: 'Follow-up on Recent Screening Results',
    preview: 'Hi Sarah, I wanted to follow up on your recent screening results. Everything looks normal...',
    timestamp: '10:30 AM',
    unread: true,
    avatar: 'EC',
  },
  {
    id: '2',
    sender: 'Medical Center Admin',
    senderRole: 'Administration',
    subject: 'Appointment Confirmation',
    preview: 'Your appointment has been confirmed for November 30th at 10:00 AM...',
    timestamp: 'Yesterday',
    unread: true,
    avatar: 'MA',
  },
  {
    id: '3',
    sender: 'Dr. Michael Chen',
    senderRole: 'Oncology Radiologist',
    subject: 'Annual Screening Reminder',
    preview: "It's time for your annual breast cancer screening. Please schedule an appointment...",
    timestamp: '2 days ago',
    unread: false,
    avatar: 'MC',
  },
];

const chatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Dr. Emily Carter',
    text: 'Hi Sarah, I wanted to follow up on your recent screening results.',
    timestamp: '10:28 AM',
    isMe: false,
  },
  {
    id: '2',
    sender: 'Dr. Emily Carter',
    text: 'Everything looks normal, but I noticed a small area that we should monitor.',
    timestamp: '10:29 AM',
    isMe: false,
  },
  {
    id: '3',
    sender: 'Sarah Johnson',
    text: 'Thank you for letting me know, Dr. Carter. Should I schedule a follow-up appointment?',
    timestamp: '10:32 AM',
    isMe: true,
  },
  {
    id: '4',
    sender: 'Dr. Emily Carter',
    text: "Yes, let's schedule something in about 3 months. In the meantime, please continue with monthly self-examinations.",
    timestamp: '10:35 AM',
    isMe: false,
  },
];

export function MessagesPage({ userRole, onLogout, onNavigate }: MessagesPageProps) {
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Handle send message logic
      setMessageText('');
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' ? true : 
                         filter === 'unread' ? conv.unread : false;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {userRole === 'doctor' ? (
        <DoctorHeader onLogout={onLogout} />
      ) : (
        <Header onLogout={onLogout} />
      )}
      
      <div className="flex">
        {userRole === 'doctor' ? (
          <DoctorSidebar onNavigate={onNavigate} activePage="messages" />
        ) : (
          <PatientSidebar onNavigate={onNavigate} activePage="messages" />
        )}
        
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto h-[calc(100vh-200px)]">
            <div className="mb-6">
              <h1 className="text-blue-900 mb-2">Messages</h1>
              <p className="text-blue-600">Communicate securely with your healthcare team</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden h-full grid grid-cols-3">
              {/* Conversations List */}
              <div className="col-span-1 border-r border-blue-100 flex flex-col">
                {/* Search & Filters */}
                <div className="p-4 border-b border-blue-100 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search messages..."
                      className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    {['all', 'unread', 'archived'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f as typeof filter)}
                        className={`px-3 py-1 rounded-lg text-sm transition-colors capitalize ${
                          filter === f
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full p-4 border-b border-blue-100 hover:bg-blue-50 transition-colors text-left ${
                        selectedConversation === conv.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          conv.unread 
                            ? 'bg-gradient-to-br from-blue-500 to-pink-500 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {conv.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className={`text-sm truncate ${conv.unread ? 'text-blue-900' : 'text-gray-700'}`}>
                              {conv.sender}
                            </h4>
                            <span className="text-xs text-blue-600 ml-2 flex-shrink-0">{conv.timestamp}</span>
                          </div>
                          <p className="text-xs text-blue-600 mb-1">{conv.senderRole}</p>
                          <p className={`text-sm truncate ${conv.unread ? 'text-blue-700' : 'text-gray-500'}`}>
                            {conv.preview}
                          </p>
                        </div>
                        {conv.unread && (
                          <Circle className="text-blue-600 flex-shrink-0" size={12} fill="currentColor" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="col-span-2 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 text-white flex items-center justify-center">
                      EC
                    </div>
                    <div>
                      <h3 className="text-blue-900">Dr. Emily Carter</h3>
                      <p className="text-sm text-blue-600">Breast Imaging Specialist</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                      <Archive size={20} className="text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                      <Trash2 size={20} className="text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                      <MoreVertical size={20} className="text-blue-600" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${msg.isMe ? 'order-2' : 'order-1'}`}>
                        <div className={`p-4 rounded-xl ${
                          msg.isMe 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p>{msg.text}</p>
                        </div>
                        <p className={`text-xs text-blue-600 mt-1 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-blue-100">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="p-3 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Paperclip size={20} className="text-blue-600" />
                    </button>
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-2"
                    >
                      <Send size={20} />
                      Send
                    </button>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    All messages are encrypted and HIPAA compliant
                  </p>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
