import React from 'react';
import UserProfile from './UserProfile';
import LoginHistory from './LoginHistory';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
                    <div className="space-y-6">
                        <UserProfile />
                        <LoginHistory />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 