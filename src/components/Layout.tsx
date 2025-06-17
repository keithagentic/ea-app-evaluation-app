import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', current: location.pathname === '/' },
    { name: 'Assessments', href: '/assessments', current: location.pathname.startsWith('/assessments') },
    { name: 'Applications', href: '/applications', current: location.pathname === '/applications' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  EA Evaluation Tool
                </h1>
              </Link>
            </div>
            <nav className="flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'text-sm font-medium transition-colors hover:text-gray-900',
                    {
                      'text-primary-600': item.current,
                      'text-gray-500': !item.current,
                    }
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}