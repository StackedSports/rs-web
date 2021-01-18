import React from "react";
import Chart from "chart.js";

export default class Doughnut extends React.Component {
  componentDidMount() {
    var ctx = document.getElementById("myChart3");
    this.myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Recruite Messages", "Personal texts", "Total DM's"],
        datasets: [
          {
            data: [
              this.props.monthlyStats.total_recruits_messaged,
              this.props.monthlyStats.total_personal_texts,
              this.props.monthlyStats.total_dms,
            ],
            label: "Trends",
            lineTension: 0,
            fill: false,
            backgroundColor: "#19a5d3",
            backgroundColor: ["#c0504e", "#8bb14c", "#4f81bc"],
            hoverBackgroundColor: "#26a69a",
          },

          // {
          //   label: "Recruite Messages",
          //   data: this.props.monthlyStats
          //     ? this.props.monthlyStats.total_recruits_messaged
          //     : 0,
          //   lineTension: 0,
          //   fill: false,
          //   backgroundColor: "#19a5d3",
          //   hoverBackgroundColor: "#26a69a",
          // },
          // {
          //   label: "Personal texts",
          //   data: this.props.monthlyStats
          //     ? this.props.monthlyStats.total_personal_texts
          //     : 0,
          //   lineTension: 0,
          //   fill: false,
          //   backgroundColor: "#19a5d3",
          //   hoverBackgroundColor: "#26a69a",
          // },
          // {
          //   label: "Total DM's",
          //   data: this.props.monthlyStats
          //     ? this.props.monthlyStats.total_dms
          //     : 0,
          //   lineTension: 0,
          //   fill: false,
          //   backgroundColor: "#19a5d3",
          //   hoverBackgroundColor: "#26a69a",
          // },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          borderColor: "#202020",
          borderWidth: 2,
          backgroundColor: "#fafafa",
          cornerRadius: 2,
          yPadding: 10,
          bodyFontColor: "#0f0f0f",
        },
      },
    });
    console.log("this is coming here");
  }
  componentWillReceiveProps(nextProps) {
    this.myChart.data.datasets[0].data = nextProps.data;
    this.myChart.update();
  }
  render() {
    return (
      <canvas
        className={this.props.className}
        id="myChart3"
        width="1160"
        height="500"
      ></canvas>
    );
  }
}
