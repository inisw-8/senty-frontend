const TopicName = ({ props }) => {
  if (props.isPositive === true) {
    return (
      <div className="bg-lightlightgreen mx-auto rounded-2xl w-1/4 h-10 flex flex-row items-center justify-center my-3">
        <p className="text-2xl text-white font-bold text-center">
          {props.topic_name}
        </p>
      </div>
    );
  }
  return (
    <div className="bg-sweetpotato mx-auto rounded-2xl h-10 w-1/4 flex flex-row items-center justify-center my-3">
      <p className="text-2xl text-white font-bold text-center">
        {props.topic_name}
      </p>
    </div>
  );
};
export default TopicName;
