import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

const KeywordBar = ({ props }) => {
  return (
    <div className="bg-white rounded-md shadow-md px-2">
      <h1 className="mx-3 text-lg text-center my-1">
        {props.isPositive === true ? "Positive Keywords" : "Negative Keywords"}
      </h1>
      <BarChart width={300} height={300} data={props.data} layout="vertical">
        <YAxis type="category" dataKey={"name"} />
        <XAxis type="number" />
        <Tooltip cursor={{ fill: "none" }} />
        <Bar
          dataKey={"value"}
          fill={props.isPositive === true ? "#C3E855" : "#C9839D"}
        />
      </BarChart>
    </div>
  );
};
export default KeywordBar;
