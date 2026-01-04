const BigCharacter = ({ props }) => {
  return (
    <div className="glass-card rounded-2xl p-5 text-center">
      <p className="text-xs font-medium text-indigo-300/60 uppercase tracking-wider mb-2">
        {props.title}
      </p>
      <p className="text-3xl font-bold text-white tracking-tight">
        {typeof props.content === 'number' ? props.content.toLocaleString() : props.content}
      </p>
    </div>
  );
};

export default BigCharacter;
