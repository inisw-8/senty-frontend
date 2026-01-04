import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#f43f5e", "#6366f1"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur px-3 py-2 rounded-lg border border-indigo-500/20 text-sm">
        <p className="font-medium text-white">{payload[0].name}</p>
        <p className="text-indigo-200">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const SentimentDist = ({ props }) => {
  return (
    <div className="glass-card rounded-2xl p-4">
      <p className="text-xs font-medium text-indigo-300/60 uppercase tracking-wider text-center mb-2">
        감성 분포
      </p>
      <ResponsiveContainer height={180}>
        <PieChart>
          <Pie
            data={props.sentiment_dist}
            dataKey="value"
            cx="50%"
            cy="45%"
            outerRadius={55}
            innerRadius={30}
            paddingAngle={3}
            label={({ value }) => `${value}%`}
            labelLine={false}
          >
            {props.sentiment_dist.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom"
            height={30}
            formatter={(value) => <span className="text-xs text-indigo-300/70">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentDist;
