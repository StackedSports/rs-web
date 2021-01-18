import React from "react";
import Chart from "chart.js";

export default class ListingChart extends React.Component {
  componentDidMount() {
    var ctx = document.getElementById("myChart2");
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
    console.log("this is coming here", lbl);
  }
  componentWillReceiveProps(nextProps) {
    this.myChart.data.datasets[0].data = nextProps.data;
    this.myChart.update();
  }
  render() {
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
