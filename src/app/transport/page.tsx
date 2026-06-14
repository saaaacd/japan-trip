'use client';

import { useTripState } from '@/hooks/useTripState';
import TransportCard from '@/components/cards/TransportCard';
import { Train } from 'lucide-react';

export default function TransportPage() {
  const { transport, updateTransportStatus, isClient } = useTripState();

  if (!isClient) return <div className="p-6 text-center text-gray-500">載入中...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Train size={24} className="text-blue-600" />
          交通資訊
        </h1>
      </div>

      <div className="p-4">
        {transport.map(item => (
          <TransportCard 
            key={item.id} 
            item={item} 
            onStatusChange={(status) => updateTransportStatus(item.id, status)} 
          />
        ))}
        {transport.length === 0 && (
          <p className="text-center text-gray-500 mt-10">尚無交通資料</p>
        )}
      </div>
    </div>
  );
}
