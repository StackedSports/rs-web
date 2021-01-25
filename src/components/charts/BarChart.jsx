import React from "react";
import Chart from "chart.js";

export default class ListingChart extends React.Component {
  constructor() {
    super();
    this.myChart = null;
  }
  componentDidMount() {
    var ctx = document.getElementById("myChart2");
    var lbl = [];
    var ds = [];

    const data =
      this.props.monthlyStats &&
      this.props.monthlyStats.total_messages_by_period;
    if (data) {
      for (var i = 0; i < data.length; i++) {
        lbl.push(data[i][0]);
        ds.push(data[i][1]);
      }
    }

    this.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: lbl,
        datasets: [
          {
            data: ds,
            label: "Trends",
            lineTension: 0,
            fill: false,
            backgroundColor: "#19a5d3",
            hoverBackgroundColor: "#26a69a",
          },
        ],
      },
      options: {
        scaleStartValue: 0,
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
        scales: {
          yAxes: [
            {
              display: false,
              gridLines: {
                display: false,
              },
              ticks: {
                display: false,
                maxTicksLimit: 7,
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              categoryPercentage: 1.0,
              barPercentage: 0.7,
            },
          ],
        },
      },
    });
    // console.log("this is coming here", lbl);
  }

  render() {
    var lbl = [];
    var ds = [];
    const data =
      this.props.monthlyStats &&
      this.props.monthlyStats.total_messages_by_period;
    if (data) {
      for (var i = 0; i < data.length; i++) {
        lbl.push(data[i][0]);
        ds.push(data[i][1]);
      }
    }
    var dataSets = [
      {
        data: ds,
        label: "Trends",
        lineTension: 0,
        fill: false,
        backgroundColor: "#19a5d3",
        hoverBackgroundColor: "#26a69a",
      },
    ];
    if (this.myChart) {
      this.myChart.data.datasets[0].data = ds;
      this.myChart.data.labels = lbl;
      this.myChart.update();
    }

    // console.log("this is coming here in render", lbl);
    return (
      <canvas
        className={this.props.className}
        id="myChart2"
        width="1160"
        height="500"
      ></canvas>
    );
  }
}
