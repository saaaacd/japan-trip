import { ChevronDown } from 'lucide-react';

type StatusSelectProps = {
  value: string;
  onChange: (newValue: string) => void;
  options: { value: string; label: string }[];
};

export default function StatusSelect({ value, onChange, options }: StatusSelectProps) {
  return (
    <div className="relative inline-block text-left">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent border border-gray-300 text-gray-700 py-1 pl-2 pr-6 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-500">
        <ChevronDown size={14} />
      </div>
    </div>
  );
}
