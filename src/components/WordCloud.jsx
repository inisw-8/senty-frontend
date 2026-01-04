import ReactWordcloud from "react-wordcloud";

const options = {
  colors: ["#818cf8", "#38bdf8", "#a78bfa", "#67e8f9", "#c4b5fd"],
  enableTooltip: true,
  deterministic: true,
  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
  fontSizes: [14, 48],
  fontWeight: "600",
  padding: 2,
  rotations: 2,
  rotationAngles: [0, 0],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 300,
};

const SimpleWordcloud = ({ props }) => {
  return (
    <div className="glass-card rounded-2xl p-4 h-full flex flex-col">
      <p className="text-xs font-medium text-indigo-300/60 uppercase tracking-wider text-center mb-2">
        키워드
      </p>
      <div className="flex-1 min-h-[140px]">
        <ReactWordcloud words={props.data} options={options} />
      </div>
    </div>
  );
};

export default SimpleWordcloud;
