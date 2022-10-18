import React, { Component, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function AccomplishedData({ barID, fieldmanArr, accomIdentificator }) {
  const BAR_ID = barID;
  const barchartRef = useRef(null);

  function FieldmanAccom() {
    // var fieldmanFiltered = fieldmanArr.filter(item => item.totalAccom != 0 || item.totalAssigned != 0);
    // Create chart instance
    barchartRef.current = am4core.create(BAR_ID, am4charts.XYChart);

    // Add percent sign to all numbers
    barchartRef.current.numberFormatter.numberFormat = "#.#'%'";

    // Add data
    barchartRef.current.data = fieldmanArr;

    // Create axes
    var categoryAxis = barchartRef.current.yAxes.push(
      new am4charts.CategoryAxis()
    );
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.dataFields.category = "completename";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.minGridDistance = 30;

    var valueAxis = barchartRef.current.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = "ACCOMPLISHMENT GROWTH";
    valueAxis.title.fontWeight = 800;

    // Create series
    var series = barchartRef.current.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "totalAssigned";
    series.dataFields.categoryY = "completename";
    series.clustered = false;
    series.stroke = am4core.color("#487eb0");
    series.fill = am4core.color("#487eb0");
    series.tooltipText = "Assigned: [bold]{valueX}";
    series.interpolationDuration = 0;
    series.showOnInit = false;

    var series2 = barchartRef.current.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueX = "totalAccom";
    series2.dataFields.categoryY = "completename";
    series2.clustered = false;
    series2.columns.template.width = am4core.percent(50);
    series2.stroke = am4core.color("#58B19F");
    series2.fill = am4core.color("#58B19F");
    series2.tooltipText = "Accomplished: [bold]{valueX}";
    series2.interpolationDuration = 0;
    series2.showOnInit = false;

    barchartRef.current.cursor = new am4charts.XYCursor();
    barchartRef.current.cursor.lineX.disabled = true;
    barchartRef.current.cursor.lineY.disabled = true;

    // Set cell size in pixels
    var cellSize = 30;
    barchartRef.current.events.on("datavalidated", function (ev) {
      // Get objects of interest
      var chart = ev.target;
      var categoryAxis = chart.yAxes.getIndex(0);

      // Calculate how we need to adjust chart height
      var adjustHeight =
        chart.data.length * cellSize - categoryAxis.pixelHeight;

      // get current chart height
      var targetHeight = chart.pixelHeight + adjustHeight;

      // Set it on chart's container
      chart.svgContainer.htmlElement.style.height = targetHeight + "px";
    });
    categoryAxis.sortBySeries = series2;
  }
  React.useEffect(() => {
    if (!barchartRef.current) {
      FieldmanAccom();
    }
    return () => {
      barchartRef.current && barchartRef.current.dispose();
    };
  }, []);

  // Load data into chart
  React.useEffect(() => {
    if (barchartRef.current) {
      // var fieldmanFiltered = fieldmanArr.filter(item => item.totalAccom != 0 || item.totalAssigned != 0);
      barchartRef.current.data = fieldmanArr;
      // console.log(fieldmanArr)
    }
  }, [accomIdentificator]);

  // Handle component unmounting, dispose chart
  React.useEffect(() => {
    return () => {
      barchartRef.current && barchartRef.current.dispose();
    };
  }, []);
  return (
    <>
      {/* <p>{fieldmanArr[11].totalAccom}</p> */}
      <div id={BAR_ID} style={{ width: "100%", height: 400 }}></div>
    </>
  );
}
export default React.memo(AccomplishedData);
