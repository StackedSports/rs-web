import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },

  {
    name: "Aug",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/stacked-bar-chart-s47i2";
  render() {
    console.log(this.props, "jai mata di");
    return (
      <ResponsiveContainer width={550} height={250}>
        <BarChart
          width={550}
          height={250}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis axisLine={false} dataKey="name" />
          <YAxis axisLine={false} />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Bar barSize={6} dataKey="pv" stackId="a" fill="black" />
          <Bar barSize={6} dataKey="amt" stackId="a" fill="rgb(139, 177, 76)" />
          <Bar barSize={6} dataKey="pv" stackId="a" fill="rgb(0, 145, 255)" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
