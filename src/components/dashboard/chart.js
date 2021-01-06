var React = require("react");
var Component = React.Component;
import CanvasJSReact from "./canvaJS/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Chart = () => {
  const options = {
    animationEnabled: true,

    data: [
      {
        type: "doughnut",
        showInLegend: false,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "Unsatisfied", y: 2 },
          { name: "Very Unsatisfied", y: 11 },
          { name: "Very Satisfied", y: 10 },
        ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        width='342.5px'
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};
export default Chart;
