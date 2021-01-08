import CanvasJSReact from "./canvaJS/canvasjs.react";
var React = require("react");
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Chart = (props) => {
  const options = {
    animationEnabled: true,

    data: [
      {
        type: "doughnut",
        showInLegend: false,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          {
            name: "Recruite Messages",
            y: props.monthlyStats
              ? props.monthlyStats.total_recruits_messaged
              : 0,
          },
          {
            name: "Personal texts",
            y: props.monthlyStats ? props.monthlyStats.total_personal_texts : 0,
          },
          {
            name: "Total DM's",
            y: props.monthlyStats ? props.monthlyStats.total_dms : 0,
          },
        ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        width="342.5px"
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};
export default Chart;
