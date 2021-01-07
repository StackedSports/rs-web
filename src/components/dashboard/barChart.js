import React from "react";
import { Bar } from "react-chartjs-2";

const state = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 40, 70],
    },
  ],
};

export default class Barchart extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          width={100}
          height={33}
          options={{
            title: {
              display: false,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}
