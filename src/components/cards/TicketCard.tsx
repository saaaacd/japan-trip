import { Ticket as TicketIcon, Calendar, MapPin, ExternalLink } from 'lucide-react';
import StatusSelect from '../ui/StatusSelect';
import { Ticket } from '@/types';

const statusOptions = [
  { value: 'not_started', label: '未開始' },
  { value: 'reserved', label: '已預約' },
  { value: 'purchased', label: '已購買' },
  { value: 'need_check', label: '需要確認' },
  { value: 'sold_out', label: '已售完' },
  { value: 'cancelled', label: '已取消' },
];

export default function TicketCard({ ticket, onStatusChange }: { ticket: Ticket, onStatusChange: (status: string) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <TicketIcon size={20} className="text-teal-500 shrink-0" />
          <h3 className="font-bold text-gray-800 leading-tight">{ticket.title}</h3>
        </div>
        <StatusSelect value={ticket.status} onChange={onStatusChange} options={statusOptions} />
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
        {ticket.date && (
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-gray-400" />
            <span>{ticket.date}</span>
          </div>
        )}
        {ticket.city && (
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-400" />
            <span>{ticket.city}</span>
          </div>
        )}
      </div>

      <div className="mt-3 text-sm">
        <span className="text-gray-500">平台：</span>
        <span className="font-medium text-gray-700">{ticket.platform || '尚未填寫'}</span>
      </div>

      {ticket.note && (
        <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded">
          {ticket.note}
        </div>
      )}

      {ticket.url ? (
        <a href={ticket.url} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-1 w-full bg-teal-50 hover:bg-teal-100 text-teal-700 py-2 rounded text-sm font-medium transition-colors">
          <ExternalLink size={14} /> 前往票券/預約頁面
        </a>
      ) : (
        <button disabled className="mt-3 w-full bg-gray-50 text-gray-400 py-2 rounded text-sm cursor-not-allowed">
          無連結
        </button>
      )}
    </div>
  );
}
