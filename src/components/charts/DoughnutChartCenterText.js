import CanvasJSReact from "./canvaJS/canvasjs.react";
var React = require("react");
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Chart = (props) => {
  console.log("This is props data", props);
  const options = {
    animationEnabled: true,
    subtitles: [
      {
        text: props.data.dms + props.data.pts + props.data.rst,
        verticalAlign: "center",
        fontSize: 16,
        dockInsidePlotArea: true,
        color: "blue",
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
            name: "Twitter DM",
            y: props.data.dms || 0,
            color: "#1070ca",
          },
          {
            name: "Personal Texts",
            y: props.data.pts || 0,
            color: "#ec4c47",
          },
          {
            name: "RS Text",
            y: props.data.rst || 0,
            color: "#f7d154",
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
