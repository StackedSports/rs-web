import CanvasJSReact from "./canvaJS/canvasjs.react";
var React = require("react");
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Chart = (props) => {
  const options = {
    animationEnabled: true,
    subtitles: [
      {
        text: "340",
        verticalAlign: "center",
        fontSize: 16,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: false,
        // indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          {
            name: "High",
            y: 20,
            color: "#dd425a",
          },
          {
            name: "Low",
            y: 30,
            color: "#ffca28",
          },
          {
            name: "Medium",
            y: 40,
            color: "#ff7b43",
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
