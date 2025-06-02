'use client'

import { useRouter } from 'next/navigation'
import { Michroma } from "next/font/google"
import { useState, useEffect } from 'react'
import { account } from '@/lib/appwrite'
import dynamic from 'next/dynamic'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '../components/ui/resizable-navbar'
import AIInterview from '../components/AIInterview'
import LoginHistory from '@/app/components/LoginHistory'

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
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if it's a guest session
        const guestSession = localStorage.getItem('guestSession');
        if (guestSession === 'true') {
          setIsGuest(true);
          setUser({
            name: 'Guest User',
            email: 'guest@example.com',
            $createdAt: new Date().toISOString(),
            $id: 'guest'
          });
          setLoading(false);
          return;
        }

        // Regular user session
        const currentUser = await account.get()
        setUser(currentUser)
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      if (isGuest) {
        // Clear guest session
        localStorage.removeItem('guestSession');
        localStorage.removeItem('guestName');
      } else {
        // Regular user logout
        await account.deleteSession('current')
      }
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

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
        {/* Mobile Nav */}
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
      {/* Tab Content */}
      <main className="max-w-4xl mx-auto py-6 px-4">
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center mb-4 text-white text-3xl font-bold">
                {user?.name ? user.name[0].toUpperCase() : (user?.email ? user.email[0].toUpperCase() : '?')}
              </div>
              <h2 className="text-2xl font-bold mb-1">{user?.name || 'Anonymous'}</h2>
              <p className="text-gray-500 mb-2">{user?.email}</p>
              {!isGuest && (
                <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm text-gray-600 mb-2">
                  <span className="bg-gray-100 rounded px-3 py-1">Member since: {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
              )}
              {isGuest && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-yellow-700">
                  <p className="text-sm">You are currently using a guest account. Sign up to access all features!</p>
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {isGuest ? (
              <div className="p-4 bg-yellow-50 rounded-lg text-yellow-700">
                <p>Login history is only available for registered users.</p>
              </div>
            ) : (
              <LoginHistory />
            )}
          </div>
        )}
        {activeTab === 'ai' && (
          <AIInterview isGuest={isGuest} />
        )}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Security</h2>
            {isGuest ? (
              <div className="p-4 bg-yellow-50 rounded-lg text-yellow-700">
                <p>Security settings are only available for registered users.</p>
              </div>
            ) : (
              <p>Security settings will appear here SOON!!!!!!.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
// //Change Password Card
// function ChangePasswordCard() {
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setMessage('New passwords do not match');
//       return;
//     }
//     if (passwordData.newPassword.length < 8) {
//       setMessage('Password must be at least 8 characters long');
//       return;
//     }
//     setLoading(true);
//     try {
//       await account.updatePassword(passwordData.newPassword, passwordData.currentPassword);
//       setMessage('Password updated successfully');
//       setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
//     } catch (error) {
//       setMessage('Error updating password: ' + (error instanceof Error ? error.message : 'Unknown error'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
//       <h2 className="text-xl font-bold mb-4">Change Password</h2>
//       <form onSubmit={handlePasswordChange} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Current Password</label>
//           <input
//             type="password"
//             value={passwordData.currentPassword}
//             onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">New Password</label>
//           <input
//             type="password"
//             value={passwordData.newPassword}
//             onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
//           <input
//             type="password"
//             value={passwordData.confirmPassword}
//             onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           disabled={loading}
//         >
//           {loading ? 'Updating...' : 'Update Password'}
//         </button>
//       </form>
//       {message && (
//         <div className="mt-4 p-4 rounded-md bg-blue-50 text-blue-700">
//           {message}
//         </div>
//       )}
//     </div>
//   );
// } 