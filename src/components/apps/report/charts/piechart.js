import React, { PureComponent } from "react";
import { Cell, Pie, PieChart,Legend,Tooltip } from "recharts";

const data = [
  { name: "Accomplished", value: 14 },
  { name: "Pending", value: 6 },
];
const COLORS = ["#58B19F", "#E74C3C"];



function Piepage({PieInfo}){
  console.log(PieInfo)
    return (
      <PieChart
        width={800}
        height={400}
        // onMouseEnter={this.onPieEnter} 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >

        <Pie
          data={PieInfo}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={100}/>
      </PieChart>
    );
  }
export default Piepage