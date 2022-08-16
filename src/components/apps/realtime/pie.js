import React, { Component,useEffect,useRef } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";

function PieCharts({pieId,pieArray,assigned}){
  const CHART_ID = pieId;
  let TotalAssigned = pieArray.totalAssigned;
  const [state, setState] = React.useState({
    state1:1,
    state2:0,
  });
  const chartRef = useRef(null);
  const chartTotalAssigned = useRef(null);
  chartTotalAssigned.current = pieArray.totalAssigned

    const PieDisplay =()=>{
        // chart = am4core.create(pieId, am4charts.PieChart);
        chartRef.current = am4core.create(CHART_ID, am4charts.PieChart);
        chartRef.current.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chartRef.current.data = pieArray.piechart
        //  [
        //         {
        //           country: "Assigned",
        //           value: 401,
        //           color:'#b2a8e3'
        //         },
        //         {
        //           name: "Unassigned",
        //           value: unassigned,
        //           color:'#f3a683'
        //         },
        //         {
        //           name: "Accomplished",
        //           value: accomplished,
        //           color:'#2ecc71'
        //         },
        //         {
        //           name: "Remaining",
        //           value: remain,
        //           color:'#786fa6'
        //         }
        //       ];
        

        chartRef.current.radius = am4core.percent(70);
        chartRef.current.innerRadius = am4core.percent(30);
        chartRef.current.startAngle = 180;
        chartRef.current.endAngle = 360;  
        
        var series = chartRef.current.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        // series.dataFields.category = "name";

        var colorSet = new am4core.ColorSet();
            colorSet.list = chartRef.current.data.map(function(color) {
            return new am4core.color(color.color);
            });
        series.colors = colorSet;
        
        series.slices.template.stroke = new am4core.InterfaceColorSet().getFor("background");
        series.slices.template.strokeWidth = 1;
        series.slices.template.strokeOpacity = 1;
        series.slices.template.states.getKey("hover").properties.shiftRadius = 0.05;
        series.slices.template.states.getKey("hover").properties.scale = 1;

        // series.slices.template.cornerRadius = 0;
        // series.slices.template.innerCornerRadius = 0;
        // series.slices.template.draggable = false;
        // series.slices.template.inert = false;

        let label = chartRef.current.seriesContainer.createChild(am4core.Label);
        label.textAlign = "middle";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.adapter.add("text", function (text, target) {
          chartTotalAssigned.current = pieArray.totalAssigned
            return "[bold font-size:20px black ]" + chartTotalAssigned.current + "[/]";
        })

        series.labels.template.disabled = true;
        series.ticks.template.disabled = true;
        
        // series.hiddenState.properties.startAngle = 90;
        // series.hiddenState.properties.endAngle = 90;
        
        chartRef.current.legend = new am4charts.Legend();
    }

    const FunnelData=()=>{
      am4core.useTheme(am4themes_animated);

    chartRef.current = am4core.create(CHART_ID, am4charts.SlicedChart);
    chartRef.current.data = pieArray.piechart
    // [{
    //   "name": "Stage #1",
    //   "value": 600
    // }, {
    //   "name": "Stage #2",
    //   "value": 300
    // }, {
    //   "name": "Stage #3",
    //   "value": 200
    // }];

    
    var series = chartRef.current.series.push(new am4charts.PictorialStackedSeries());
    series.dataFields.value = "value";
    // series.dataFields.category = "name";

    var colorSet = new am4core.ColorSet();
            colorSet.list = chartRef.current.data.map(function(color) {
            return new am4core.color(color.color);
            });
        series.colors = colorSet;
    
    // let circleMask = chartRef.current.createChild(new am4charts.Circle());
    // let waves = chartRef.current.createChild(new am4charts.WavedRectangle());
    // waves.fill = new am4charts.color("#34a4eb");
    // waves.mask = circleMask;
    // waves.horizontalCenter = "middle";
    // waves.waveHeight = 10;
    // waves.waveLength = 30;
    // waves.y = 500;
    // circleMask.y = -500;

    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;
    series.alignLabels = false;
    series.maskSprite.path = "M63.3,34.8L59.5,33V14.2h-17V33l-3.8,1.6c-3.3,1.4-5.4,4.7-5.4,8.2v45.4c0,5,4,9,9,9h17.3c5,0,9-4,9-9V43   C68.7,39.5,66.5,36.1,63.3,34.8z";
    }
    
    useEffect(()=>{
      if (!chartRef.current || !chartTotalAssigned.current) {
        PieDisplay()
        // FunnelData()
      }
      return () => {
        chartTotalAssigned.current && chartRef.current && chartRef.current.dispose();
      };
    },[])

    // Load data into chart
    useEffect(() => {
      if (chartRef.current || chartTotalAssigned.current) {
        chartRef.current.data = pieArray.piechart;
        
        chartTotalAssigned.current = pieArray.totalAssigned
        console.log({
          refss:chartTotalAssigned.current,
          prev:pieArray.totalAssigned
        })
      }
    }, [pieArray]);

    // Handle component unmounting, dispose chart
    useEffect(() => {
      return () => {
        chartTotalAssigned.current && chartRef.current && chartRef.current.dispose();
      };
    }, []);
    return (
      <>
        <div id={CHART_ID} style={{ width: "100%", height: "320px" }}></div>
        <p>{chartTotalAssigned.current}</p>
      </>
    )
}
export default PieCharts;
