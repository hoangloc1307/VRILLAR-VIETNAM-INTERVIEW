import { useId } from "react";

interface Props {
  label?: string;
  options?: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function Select({
  label,
  options = [],
  value,
  onChange,
}: Props) {
  const id = useId();
  return (
    <div className="flex flex-col">
      <label className="font-medium empty:hidden" htmlFor={id}>
        {label}
      </label>
      <select
        className="border border-slate-500 rounded outline-none"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
