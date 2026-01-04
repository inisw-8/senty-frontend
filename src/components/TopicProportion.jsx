import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TopicProportion = ({ props }) => {
  const topic_names = ["기타", "Apple", "메타버스", "GPU", "개인비서", "스마트폰", "컨텐츠", "AI", "Apps", "주식"];
  const COLORS = ["#64748b", "#22c55e", "#ec4899", "#6366f1", "#eab308", "#f97316", "#a855f7", "#ef4444", "#38bdf8", "#14b8a6"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const sorted = [...payload].sort((a, b) => b.value - a.value);
      return (
        <div className="bg-slate-900/95 backdrop-blur px-4 py-3 rounded-xl border border-indigo-500/20 text-sm max-h-56 overflow-y-auto">
          <p className="font-medium text-white mb-2 pb-2 border-b border-indigo-500/20">
            {payload[0].payload.date}
          </p>
          {sorted.slice(0, 6).map((item, i) => {
            const idx = parseInt(item.dataKey.replace('topic', ''));
            return (
              <div key={i} className="flex justify-between gap-6 py-1">
                <span className="text-indigo-300/70">{topic_names[idx]}</span>
                <span className="font-medium" style={{ color: item.stroke }}>
                  {(item.value * 100).toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="text-sm font-medium text-white mb-4">날짜별 토픽 분포</p>
      <ResponsiveContainer height={280}>
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
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '16px' }}
            formatter={(value) => {
              const idx = parseInt(value.replace('topic', ''));
              return <span className="text-xs text-indigo-300/60">{topic_names[idx]}</span>;
            }}
          />
          {[...Array(10).keys()].map((i) => (
            <Line
              key={i}
              type="monotone"
              dataKey={`topic${i}`}
              stroke={COLORS[i]}
              strokeWidth={1.5}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicProportion;
