const SectionTitle = ({ props }) => {
  switch (props.sectionId) {
    case 0:
      return (
        <div className="mx-auto bg-lightgreen flex items-center justify-center rounded-2xl h-20 w-full my-3">
          <p className="text-3xl font-bold text-white">전체 토픽 분석</p>
        </div>
      );

    case 1:
      return (
        <div className="mx-auto bg-lightgreen flex items-center justify-center rounded-2xl h-20 w-full my-3">
          <p className="text-3xl font-bold text-white">토픽별 감성 분석</p>
        </div>
      );

    case 2:
      return (
        <div className="mx-auto bg-lightgreen flex items-center justify-center rounded-2xl h-20 w-full my-3">
          <p className="text-3xl font-bold text-white">상관관계 분석</p>
        </div>
      );

    // default:
    //   return <div>something error!</div>;
  }
};
export default SectionTitle;
