'use client';

import { useTripState } from '@/hooks/useTripState';
import TicketCard from '@/components/cards/TicketCard';
import { Ticket } from 'lucide-react';

export default function TicketsPage() {
  const { tickets, updateTicketStatus, isClient } = useTripState();

  if (!isClient) return <div className="p-6 text-center text-gray-500">載入中...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Ticket size={24} className="text-teal-600" />
          票券與預約
        </h1>
      </div>

      <div className="p-4">
        {tickets.map(ticket => (
          <TicketCard 
            key={ticket.id} 
            ticket={ticket} 
            onStatusChange={(status) => updateTicketStatus(ticket.id, status)} 
          />
        ))}
        {tickets.length === 0 && (
          <p className="text-center text-gray-500 mt-10">尚無票券資料</p>
        )}
      </div>
    </div>
  );
}
