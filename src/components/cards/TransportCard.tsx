import { Train, Calendar } from 'lucide-react';
import StatusSelect from '../ui/StatusSelect';
import { Transport } from '@/types';

const statusOptions = [
  { value: 'need_check', label: '需要確認' },
  { value: 'checked', label: '已查好' },
  { value: 'purchased', label: '已購票' },
  { value: 'done', label: '已完成' },
];

export default function TransportCard({ item, onStatusChange }: { item: Transport, onStatusChange: (status: string) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3 border-l-4 border-l-blue-400">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start gap-2 max-w-[65%]">
          <Train size={20} className="text-blue-500 shrink-0 mt-0.5" />
          <h3 className="font-bold text-gray-800 leading-tight">{item.title}</h3>
        </div>
        <StatusSelect value={item.status} onChange={onStatusChange} options={statusOptions} />
      </div>

      <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-600 mb-2">
        <Calendar size={14} className="text-gray-400" />
        <span>{item.date}</span>
      </div>

      {item.note && (
        <div className="mt-2 text-sm text-gray-600 bg-blue-50/50 p-2 rounded">
          {item.note}
        </div>
      )}
    </div>
  );
}
