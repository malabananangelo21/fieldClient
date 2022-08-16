import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
am4core.useTheme(am4themes_animated);
class DPie2 extends Component {
    state = {
    }

    chart() {

let { pieGraph } = this.props;

// console.log(pieGraph)
am4core.useTheme(am4themes_animated);
let iconPath = "M421.976,136.204h-23.409l-0.012,0.008c-0.19-20.728-1.405-41.457-3.643-61.704l-1.476-13.352H5.159L3.682,74.507 C1.239,96.601,0,119.273,0,141.895c0,65.221,7.788,126.69,22.52,177.761c7.67,26.588,17.259,50.661,28.5,71.548  c11.793,21.915,25.534,40.556,40.839,55.406l4.364,4.234h206.148l4.364-4.234c15.306-14.85,29.046-33.491,40.839-55.406  c11.241-20.888,20.829-44.96,28.5-71.548c0.325-1.127,0.643-2.266,0.961-3.404h44.94c49.639,0,90.024-40.385,90.024-90.024  C512,176.588,471.615,136.204,421.976,136.204z M421.976,256.252h-32c3.061-19.239,5.329-39.333,6.766-60.048h25.234  c16.582,0,30.024,13.442,30.024,30.024C452,242.81,438.558,256.252,421.976,256.252z"

var chart = am4core.create("chartDPie2", am4charts.PieChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.data = pieGraph;
chart.radius = am4core.percent(70);
chart.innerRadius = am4core.percent(40);
chart.startAngle = 180;
chart.endAngle = 360;


// let pieSeries = chart.series.push(new am4charts.PieSeries());
// pieSeries.dataFields.value = "value";
// pieSeries.dataFields.category = "title";
// pieSeries.slices.template.stroke = new am4core.InterfaceColorSet().getFor("background");
// pieSeries.slices.template.strokeWidth = 1;
// pieSeries.slices.template.strokeOpacity = 1;

// // Disabling labels and ticks on inner circle
// pieSeries.labels.template.disabled = true;
// pieSeries.ticks.template.disabled = true;

// // Disable sliding out of slices
// pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
// pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
// pieSeries.radius = am4core.percent(40);
// pieSeries.innerRadius = am4core.percent(30);

// let cs = pieSeries.colors;
// cs.list = [am4core.color(new am4core.ColorSet().getIndex(0))];

// cs.stepOptions = {
//   lightness: -0.05,
//   hue: 0
// };
// cs.wrap = false;


// Add second series
let pieSeries2 = chart.series.push(new am4charts.PieSeries());
pieSeries2.dataFields.value = "value";
pieSeries2.dataFields.category = "title";
pieSeries2.slices.template.stroke = new am4core.InterfaceColorSet().getFor("background");
pieSeries2.slices.template.strokeWidth = 1;
pieSeries2.slices.template.strokeOpacity = 1;
pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0.05;
pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;

pieSeries2.labels.template.disabled = true;
pieSeries2.ticks.template.disabled = true;


let label = chart.seriesContainer.createChild(am4core.Label);
label.textAlign = "middle";
label.horizontalCenter = "middle";
label.verticalCenter = "middle";
label.adapter.add("text", function (text, target) {
    return "[bold font-size:30px white ]" + pieSeries2.dataItem.values.value.sum + "[/]";
})
chart.legend = new am4charts.Legend();
chart.legend.labels.template.text = "[white]" + "{name}" + "{percent}" + "[/]";
chart.legend.valueLabels.template.fill = am4core.color("#ffff"); 
    }
componentDidMount(){

    this.chart();
}
componentDidUpdate(){
    this.chart();
}
render() {
    return (
        <div id="chartDPie2" style={{ width: "100%", height: "220px" }}></div>
    );
}
}

export default DPie2;