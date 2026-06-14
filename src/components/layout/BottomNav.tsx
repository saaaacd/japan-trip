'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Hotel, Ticket, Train } from 'lucide-react';
import clsx from 'clsx';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '首頁', icon: Home },
    { href: '/itinerary', label: '行程', icon: Map },
    { href: '/hotels', label: '住宿', icon: Hotel },
    { href: '/tickets', label: '票券', icon: Ticket },
    { href: '/transport', label: '交通', icon: Train },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={clsx(
                  'flex flex-col items-center justify-center w-full h-full space-y-1',
                  isActive ? 'text-primary font-medium' : 'text-gray-500 hover:text-gray-900'
                )}
              >
                <Icon size={24} className={isActive ? 'text-primary' : ''} />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
