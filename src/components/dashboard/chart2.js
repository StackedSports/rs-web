var React = require("react");
var Component = React.Component;
import CanvasJSReact from "./canvaJS2/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Chart2 = () => {
  const options = {
    theme: "light2",
    animationEnabled: true,
    title: {
      text: "Energy in Baked Foods",
    },
    axisY: {
      title: "Energy Per 100 g (kcal/100g)",
    },
    data: [
      {
        type: "boxAndWhisker",
        yValueFormatString: '#,##0.# "kcal/100g"',
        dataPoints: [
          { label: "Bread", y: [179, 256, 300, 418, 274] },
          { label: "Cake", y: [252, 346, 409, 437, 374.5] },
          { label: "Biscuit", y: [236, 281.5, 336.5, 428, 313] },
          { label: "Doughnut", y: [340, 382, 430, 452, 417] },
          { label: "Pancakes", y: [194, 224.5, 342, 384, 251] },
          { label: "Bagels", y: [241, 255, 276.5, 294, 274.5] },
        ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export default Chart2;
