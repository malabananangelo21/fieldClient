import React, { Component,useRef } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function AccomplishedData({barID,fieldmanArr}){
    const BAR_ID = barID;
    const barchartRef = useRef(null);

    function FieldmanAccom(){
        // var fieldmanFiltered = fieldmanArr.filter(item => item.totalAccom != 0 || item.totalAssigned != 0);
        // Create chart instance
        barchartRef.current = am4core.create(BAR_ID, am4charts.XYChart);

        // Add percent sign to all numbers
        barchartRef.current.numberFormatter.numberFormat = "#.#'%'";

        // Add data
        barchartRef.current.data = fieldmanArr


        // Create axes
        var categoryAxis = barchartRef.current.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.numberFormatter.numberFormat = "#";
        categoryAxis.dataFields.category = "completename";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.minGridDistance = 30;

        var valueAxis = barchartRef.current.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.max = 105;

        valueAxis.title.text = "ACCOMPLISHMENT GROWTH";
        valueAxis.title.fontWeight = 800;
        valueAxis.cursorTooltipEnabled = false;


        // Create series
        var series = barchartRef.current.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = "accuracy";
        series.dataFields.categoryY = "completename";
        series.clustered = false;
        series.stroke = am4core.color("#f39c12");
        series.fill = am4core.color("#f39c12");
        series.tooltipText = "[white]Accuracy: [bold white]{valueX}";
        series.interpolationDuration = 0
        series.showOnInit = false;
        series.stacked = true;
        

        var series2 = barchartRef.current.series.push(new am4charts.ColumnSeries());
        series2.dataFields.valueX = "complete_productivity";
        series2.dataFields.categoryY = "completename";
        series2.clustered = false;
        series2.columns.template.width = am4core.percent(50);
        series2.stroke = am4core.color("#487eb0");
        series2.fill = am4core.color("#487eb0");
        series2.tooltipText = "Completeness and Productivity: [bold]{valueX}";
        series2.interpolationDuration = 0
        series2.showOnInit = false;
        series2.stacked = true;

        var series3 = barchartRef.current.series.push(new am4charts.ColumnSeries());
        series3.dataFields.valueX = "attendance";
        series3.dataFields.categoryY = "completename";
        series3.clustered = false;
        series3.columns.template.width = am4core.percent(50);
        series3.stroke = am4core.color("#58b19f");
        series3.fill = am4core.color("#58b19f");
        series3.tooltipText = "[white]Attendance: [white bold]{valueX}";
        series3.interpolationDuration = 0
        series3.showOnInit = false;
        series3.stacked = true;

        var series4 = barchartRef.current.series.push(new am4charts.ColumnSeries());
        series4.dataFields.valueX = "tardiness";
        series4.dataFields.categoryY = "completename";
        series4.clustered = false;
        series4.columns.template.width = am4core.percent(50);
        series4.stroke = am4core.color("#487eb0");
        series4.fill = am4core.color("#487eb0");
        series4.tooltipText = "Tardiness: [bold]{valueX}";
        series4.interpolationDuration = 0
        series4.showOnInit = false;
        series4.stacked = true;

        var series5 = barchartRef.current.series.push(new am4charts.ColumnSeries());
        series5.dataFields.valueX = "attitude";
        series5.dataFields.categoryY = "completename";
        series5.clustered = false;
        series5.columns.template.width = am4core.percent(50);
        series5.stroke = am4core.color("#58b19f");
        series5.fill = am4core.color("#58b19f");
        series5.tooltipText = "Attitude: [bold]{valueX}";
        series5.interpolationDuration = 0
        series5.showOnInit = false;
        series5.stacked = true;


        var femaleLabel = series5.bullets.push(new am4charts.LabelBullet());
        femaleLabel.label.text = "[bold]{complete_productivity}%";
        femaleLabel.label.hideOversized = false;
        femaleLabel.label.truncate = false;
        femaleLabel.label.horizontalCenter = "left";
        femaleLabel.label.dx = 10;

        barchartRef.current.cursor = new am4charts.XYCursor();
        barchartRef.current.cursor.lineX.disabled = true;
        barchartRef.current.cursor.lineY.disabled = true;

         // Set cell size in pixels
         var cellSize = 30;
         barchartRef.current.events.on("datavalidated", function(ev) {
         
         // Get objects of interest
         var chart = ev.target;
         var categoryAxis = chart.yAxes.getIndex(0);
         
         // Calculate how we need to adjust chart height
         var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;
 
         // get current chart height
         var targetHeight = chart.pixelHeight + adjustHeight;
 
         // Set it on chart's container
         chart.svgContainer.htmlElement.style.height = targetHeight + "px";
         
         });
         categoryAxis.sortBySeries = series2;
    }
    // React.useEffect(()=>{
    //     if (!barchartRef.current) {
    //         FieldmanAccom()
    //     }
    //     return () => {
    //         barchartRef.current && barchartRef.current.dispose();
    //     };
    //   },[])
    

    // Load data into chart
    // React.useEffect(() => {
    //     if (barchartRef.current) {
    //         // var fieldmanFiltered = fieldmanArr.filter(item => item.totalAccom != 0 || item.totalAssigned != 0);
    //         barchartRef.current.data = fieldmanArr;
    //         // console.log(fieldmanArr)
    //     }
    //   }, [accomIdentificator]);

    // Handle component unmounting, dispose chart
    // React.useEffect(() => {
    //     return () => {
    //       barchartRef.current && barchartRef.current.dispose();
    //     };
    // }, []);

     React.useEffect(()=>{
            FieldmanAccom()
      },[])
    return (
        <>
            {/* <p>{fieldmanArr[11].totalAccom}</p> */}
            <div id={BAR_ID} style={{width:'100%',height:400}}></div>
           
        </>
    )
}
export default AccomplishedData;