import { Link } from "react-scroll";

const Sidebar = ({ props }) => {
  const sections = [
    { name: "서론", to: "introduction", icon: "📖" },
    { name: "전체 분석", to: "total_topic_analysis", icon: "📊" },
    { name: "토픽별 분석", to: "analysisPerTopic", icon: "💬" },
    { name: "결론", to: "conclusion", icon: "📝" },
  ];

  return (
    <aside className="hidden lg:block w-56 flex-shrink-0">
      <div className="sticky top-24">
        <div className="glass-card rounded-2xl p-4">
          <p className="px-3 mb-3 text-xs font-semibold text-indigo-400/60 uppercase tracking-wider">메뉴</p>
          <nav className="space-y-1">
            {sections.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                smooth={true}
                duration={400}
                offset={-80}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-indigo-200/70 hover:text-white hover:bg-indigo-500/10 rounded-xl cursor-pointer transition-all"
                activeClass="text-white bg-gradient-to-r from-indigo-500/20 to-sky-500/20 border-l-2 border-indigo-400"
                spy={true}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="glass-card rounded-2xl p-4 mt-4">
          <p className="px-3 mb-3 text-xs font-semibold text-indigo-400/60 uppercase tracking-wider">토픽</p>
          <nav className="space-y-0.5 max-h-72 overflow-y-auto">
            {props.datas.map((topic, index) => (
              <Link
                to={topic.topic_name}
                smooth={true}
                duration={400}
                offset={-80}
                key={index}
                spy={true}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-indigo-200/70 hover:text-white hover:bg-indigo-500/10 rounded-lg cursor-pointer transition-all"
                activeClass="text-sky-300 bg-sky-500/15"
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-indigo-300 bg-indigo-500/20 rounded">
                  {index + 1}
                </span>
                <span className="truncate">{topic.topic_name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
