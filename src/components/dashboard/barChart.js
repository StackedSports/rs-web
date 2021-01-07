import React from "react";
import { Bar } from "react-chartjs-2";

export default class Barchart extends React.Component {
  render() {
    console.log(
      "THis is the ",
      this.props.monthlyStats &&
        this.props.monthlyStats.total_messages_by_period
    );
    var lbl = [];
    var ds = [];
    const data =
      this.props.monthlyStats &&
      this.props.monthlyStats.total_messages_by_period;
    if (data) {
      lbl = [
        data[0][0],
        data[1][0],
        data[2][0],
        data[3][0],
        data[4][0],
        data[5][0],
        data[6][0],
      ];
      ds = [
        data[0][1],
        data[1][1],
        data[2][1],
        data[3][1],
        data[4][1],
        data[5][1],
        data[6][1],
      ];
    }
    const state = {
      labels: lbl,
      datasets: [
        {
          label: "messages",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: ds,
        },
      ],
    };
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
