import React, { Component,useEffect,useRef } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function AccomplishedData({barID,fieldmanArr}){
    
    const BAR_ID = barID;
    const barchartRef = useRef(null);

    const FieldmanAccom =()=>{
        var fieldmanFiltered = fieldmanArr.filter(item => item.totalAccom != 0);

        barchartRef.current = am4core.create(BAR_ID, am4charts.XYChart);
        // chart.padding(40, 40, 40, 40);

        var categoryAxis = barchartRef.current.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "completename";
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;

        var valueAxis = barchartRef.current.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        var series = barchartRef.current.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "completename";
        series.dataFields.valueX = "totalAccom";
        series.tooltipText = "{valueX.value}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;

        var labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = "left";
        labelBullet.label.dx = 10;
        labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        labelBullet.locationX = 1;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from barchartRef.current.colors color set
        series.columns.template.adapter.add("fill", function(fill, target){
        return barchartRef.current.colors.getIndex(target.dataItem.index);
        });

        // Set cell size in pixels
        var cellSize = 30;
        barchartRef.current.events.on("datavalidated", function(ev) {
        
        // Get objects of interest
        var chart = ev.target;
        var categoryAxis = barchartRef.current.yAxes.getIndex(0);
        
        // Calculate how we need to adjust chart height
        var adjustHeight = barchartRef.current.data.length * cellSize - categoryAxis.pixelHeight;

        // get current chart height
        var targetHeight = barchartRef.current.pixelHeight + adjustHeight;

        // Set it on chart's container
        barchartRef.current.svgContainer.htmlElement.style.height = targetHeight + "px";
        });

        categoryAxis.sortBySeries = series;
        barchartRef.current.data = fieldmanFiltered
    }


    useEffect(()=>{
        if (!barchartRef.current) {
            FieldmanAccom()
        }
        return () => {
            barchartRef.current && barchartRef.current.dispose();
        };
      },[])

    // Load data into chart
    useEffect(() => {
        if (barchartRef.current) {
            var fieldmanFiltered = fieldmanArr.filter(item => item.totalAccom != 0);
            barchartRef.current.data = fieldmanFiltered;
        }
      }, [fieldmanArr]);

    // Handle component unmounting, dispose chart
    useEffect(() => {
        return () => {
          barchartRef.current && barchartRef.current.dispose();
        };
    }, []);
    return (
        <>
            <div id={BAR_ID} style={{width:'100%',height:400}}></div>
            {/* <p>{fieldmanArr[11].totalAccom}</p> */}
        </>
    )
}
export default AccomplishedData;