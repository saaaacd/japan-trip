import clsx from 'clsx';

type BadgeProps = {
  status: string;
  className?: string;
};

const statusConfig: Record<string, { label: string; colorClass: string }> = {
  // Itinerary & Tickets & Hotels
  not_started: { label: '未開始', colorClass: 'bg-gray-100 text-gray-700' },
  in_progress: { label: '進行中', colorClass: 'bg-blue-100 text-blue-700' },
  done: { label: '已完成', colorClass: 'bg-green-100 text-green-700' },
  cancelled: { label: '已取消', colorClass: 'bg-red-100 text-red-700' },
  reserved: { label: '已預約', colorClass: 'bg-indigo-100 text-indigo-700' },
  need_check: { label: '需要確認', colorClass: 'bg-yellow-100 text-yellow-800' },
  purchased: { label: '已購買', colorClass: 'bg-teal-100 text-teal-700' },
  sold_out: { label: '已售完', colorClass: 'bg-red-100 text-red-700' },
  // Transport specific
  checked: { label: '已查好', colorClass: 'bg-blue-100 text-blue-700' },
  // Hotel specific
  not_booked: { label: '未預訂', colorClass: 'bg-gray-100 text-gray-700' },
};

export default function Badge({ status, className }: BadgeProps) {
  const config = statusConfig[status] || { label: status, colorClass: 'bg-gray-100 text-gray-700' };

  return (
    <span className={clsx('px-2 py-1 text-[10px] font-medium rounded-full', config.colorClass, className)}>
      {config.label}
    </span>
  );
}
