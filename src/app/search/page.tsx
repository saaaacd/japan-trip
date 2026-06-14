'use client';

import { useState, useMemo } from 'react';
import { useTripState } from '@/hooks/useTripState';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const { trip, hotels, tickets, transport, isClient } = useTripState();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const matches: any[] = [];

    // Search Trip
    trip.forEach(day => {
      if (day.date.includes(q) || day.city.includes(q) || day.title.toLowerCase().includes(q)) {
        matches.push({ type: 'day', label: '行程日期', title: `${day.date} ${day.title}`, link: '/itinerary' });
      }
      day.items.forEach(item => {
        if (
          item.title.toLowerCase().includes(q) ||
          item.location?.toLowerCase().includes(q) ||
          item.note?.toLowerCase().includes(q)
        ) {
          matches.push({ type: 'itinerary', label: `行程 (${day.date})`, title: item.title, desc: item.location || item.note, link: '/itinerary' });
        }
      });
    });

    // Search Hotels
    hotels.forEach(hotel => {
      if (
        hotel.name.toLowerCase().includes(q) ||
        hotel.city.toLowerCase().includes(q) ||
        hotel.address?.toLowerCase().includes(q) ||
        hotel.note?.toLowerCase().includes(q)
      ) {
        matches.push({ type: 'hotel', label: '住宿', title: hotel.name, desc: hotel.checkIn, link: '/hotels' });
      }
    });

    // Search Tickets
    tickets.forEach(ticket => {
      if (
        ticket.title.toLowerCase().includes(q) ||
        ticket.city?.toLowerCase().includes(q) ||
        ticket.note?.toLowerCase().includes(q)
      ) {
        matches.push({ type: 'ticket', label: '票券', title: ticket.title, desc: ticket.date, link: '/tickets' });
      }
    });

    // Search Transport
    transport.forEach(trans => {
      if (
        trans.title.toLowerCase().includes(q) ||
        trans.date.includes(q) ||
        trans.note?.toLowerCase().includes(q)
      ) {
        matches.push({ type: 'transport', label: '交通', title: trans.title, desc: trans.date, link: '/transport' });
      }
    });

    return matches;
  }, [query, trip, hotels, tickets, transport]);

  if (!isClient) return <div className="p-6 text-center text-gray-500">載入中...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30 shadow-sm flex items-center gap-3">
        <Link href="/" className="text-gray-500 hover:text-primary">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="搜尋城市、景點、飯店、票券..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary rounded-full py-2 pl-10 pr-4 text-sm"
            autoFocus
          />
          <SearchIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {query.trim() && results.length === 0 && (
          <p className="text-center text-gray-500 mt-10">找不到與「{query}」相關的結果</p>
        )}
        
        {results.map((item, index) => (
          <Link href={item.link} key={index} className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-primary transition-colors">
            <span className="text-xs font-bold text-primary mb-1 block">{item.label}</span>
            <h3 className="font-bold text-gray-800">{item.title}</h3>
            {item.desc && <p className="text-sm text-gray-500 mt-1">{item.desc}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
