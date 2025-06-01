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

  if (loading) {
    return (
      <div className={`min-h-screen bg-white flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white ">
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
          <div>
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            {user && (
              <div className="space-y-2">
                <p><span className="font-semibold">Name:</span> {user.name || 'Anonymous'}</p>
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Member since:</span> {user.$createdAt ? new Date(user.$createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
            )}
          </div>
        )}
        {activeTab === 'history' && (
          <div>
            <h2 className="text-xl font-bold mb-4">History</h2>
            <p>Your past interview attempts will appear here.</p>
          </div>
        )}
        {activeTab === 'ai' && (
          <AIInterview />
        )}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Security</h2>
            <p>Security settings will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
} 