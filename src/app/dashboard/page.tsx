'use client'

import { useRouter } from 'next/navigation'
import { Michroma } from "next/font/google"
import { useState, useEffect } from 'react'
import { account } from '@/lib/appwrite'
import dynamic from 'next/dynamic'
import {
  Navbar,
  NavBody,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '../components/ui/resizable-navbar'
import AIInterview from '../components/AIInterview'
import { Clock, RefreshCw } from 'lucide-react'

const michroma = Michroma({ 
  weight: '400',
  subsets: ['latin'],
})

// Disable SSR for this component
const DashboardContent = dynamic(() => Promise.resolve(Dashboard), {
  ssr: false,
})

export default function DashboardPage() {
  return <DashboardContent />;
}

interface UserProfile {
  email: string;
  lastLogin: string;
}

interface LoginHistory {
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: string;
}

type User = {
  name?: string;
  email?: string;
  $createdAt?: string;
  $id?: string;
};

const navItems = [
  { name: "Profile", value: "profile" },
  { name: "History", value: "history" },
  { name: "AI Interview", value: "ai" },
  { name: "Security", value: "security" },
];

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('ai');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get()
        setUser(currentUser)
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  const handleLogout = async () => {
    try {
      await account.deleteSession('current')
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const fetchLoginHistory = async () => {
    setHistoryLoading(true);
    setHistoryError('');
    try {
      const session = await account.getSession('current');
      const response = await fetch('/api/users/history', {
        headers: {
          'x-session-id': session.$id
        }
      });
      const data = await response.json();
      setLoginHistory(Array.isArray(data) ? data : []);
    } catch (error) {
      setHistoryError('Failed to fetch login history');
      console.error('History fetch error:', error);
      setLoginHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchLoginHistory();
    }
  }, [activeTab]);

  if (loading) {
    return (
      <div className={`min-h-screen bg-white flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={`relative px-4 py-2 text-neutral-600 dark:text-neutral-300 rounded ${activeTab === item.value ? 'bg-gray-100 dark:bg-neutral-800' : ''}`}
                style={{ outline: 'none', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary" onClick={handleLogout}>Sign Out</NavbarButton>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setActiveTab(item.value);
                  setIsMobileMenuOpen(false);
                }}
                className="relative text-gray-600 hover:text-gray-900 w-full text-left py-2"
              >
                {item.name}
              </button>
            ))}
            <NavbarButton
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              variant="primary"
              className="w-full"
            >
              Sign Out
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <main className="max-w-4xl mx-auto py-6 px-4">
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center mb-4 text-white text-3xl font-bold">
                {user?.name ? user.name[0].toUpperCase() : (user?.email ? user.email[0].toUpperCase() : '?')}
              </div>
              <h2 className="text-2xl font-bold mb-1">{user?.name || 'Anonymous'}</h2>
              <p className="text-gray-500 mb-2">{user?.email}</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm text-gray-600 mb-2">
                <span className="bg-gray-100 rounded px-3 py-1">Member since: {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'history' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Login History</h2>
              <p className="text-sm text-gray-500">
                Updates will appear here Soon!!!!.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button 
                    onClick={() => fetchLoginHistory()}
                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>

                {historyLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : historyError ? (
                  <div className="text-red-600 text-center p-4 bg-red-50 rounded-lg">
                    {historyError}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            IP Address
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Device & Browser
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {loginHistory.map((entry, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(entry.timestamp).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {entry.ipAddress}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {entry.userAgent}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                entry.status === 'success' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {entry.status === 'success' ? 'Success' : 'Failed'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'ai' && (
          <AIInterview />
        )}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Security</h2>
            <p>Security settings will appear here Soon!!!!.</p>
          </div>
        )}
      </main>
    </div>
  );
} 