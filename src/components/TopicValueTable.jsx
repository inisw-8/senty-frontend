const TopicValueTable = ({ props }) => {
  const getValueStyle = (value) => {
    if (typeof value === 'number') {
      if (value < 0) return 'text-rose-400';
      if (value > 0.3) return 'text-emerald-400';
    }
    return 'text-indigo-200';
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-indigo-500/10">
        <p className="text-sm font-medium text-white">{props.title}</p>
        <p className="text-xs text-indigo-300/50">{props.description}</p>
      </div>
      
      <div className="max-h-44 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-900/90 backdrop-blur">
            <tr>
              {props.headers.map((header, index) => (
                <th key={index} className="px-4 py-2 text-left text-xs font-medium text-indigo-400/60 uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-500/5">
            {props.datas.map((data, index) => (
              <tr key={index} className="hover:bg-indigo-500/5 transition-colors">
                <td className="px-4 py-2 text-indigo-100">
                  {data.topic_name || data.text}
                </td>
                <td className={`px-4 py-2 text-right font-medium ${getValueStyle(data.value)}`}>
                  {data.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopicValueTable;
