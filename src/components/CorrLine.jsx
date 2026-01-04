import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur px-4 py-3 rounded-xl border border-indigo-500/20 text-sm">
        <p className="font-medium text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-indigo-200" style={{ color: entry.stroke }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CorrLine = ({ props }) => {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-white">감성 · 주가지수 상관관계</p>
        <span className="text-xs px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
          window = {props.max_corr_window_size}일
        </span>
      </div>
      <ResponsiveContainer height={260}>
        <LineChart data={props.data}>
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10, fill: '#818cf8' }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(99, 102, 241, 0.2)' }}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#818cf8' }}
            tickLine={false}
            axisLine={false}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '16px' }}
            formatter={(value) => <span className="text-xs text-indigo-300/70">{value}</span>}
          />
          <Line type="monotone" dataKey="sentiment" stroke="#6366f1" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="snp500" stroke="#f43f5e" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="nasdaq100" stroke="#38bdf8" strokeWidth={2} dot={false} />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CorrLine;
