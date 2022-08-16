import React, { Component,useEffect,useRef } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
 
function AroundPie({pieId,aroundData}){
    const PieName = pieId;
    const aroundChart = useRef(null);
    const PieDisplay =()=>{
        am4core.useTheme(am4themes_animated);
        aroundChart.current = am4core.create(PieName, am4charts.PieChart);

        // Let's cut a hole in our Pie chart the size of 40% the radius
        aroundChart.current.innerRadius = am4core.percent(40);
        
        // // Add and configure Series
        // var pieSeries = aroundChart.current.series.push(new am4charts.PieSeries());
        // pieSeries.dataFields.value = "value";
        // pieSeries.dataFields.category = "category";
        // pieSeries.slices.template.stroke = am4core.color("#6c5ce7");
        // pieSeries.slices.template.fill = am4core.color("#16a085");
        // pieSeries.innerRadius = 1;
        // pieSeries.slices.template.fillOpacity = .5;
        
        // pieSeries.slices.template.propertyFields.disabled = "labelDisabled";
        // pieSeries.labels.template.propertyFields.disabled = "labelDisabled";
        // pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";
        
        
        // // Add data
        // pieSeries.data = aroundData.parentPie;
        
        // // Disable sliding out of slices
        // pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
        // pieSeries.slices.template.states.getKey("hover").properties.scale = 1;

        // pieSeries.labels.template.disabled = true;
        // pieSeries.ticks.template.disabled = true;

         // Add data
         aroundChart.current.data = aroundData.childPie

        // Add second series
        var pieSeries2 = aroundChart.current.series.push(new am4charts.PieSeries());
        pieSeries2.dataFields.value = "value";
        pieSeries2.dataFields.category = "category";
        // pieSeries2.slices.template.fillOpacity = .5;
        pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
        pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;
        pieSeries2.slices.template.propertyFields.fill = "fill";
        
       

       

        var colorSet = new am4core.ColorSet();
        colorSet.list = aroundChart.current.data.map(function(color) {
        return new am4core.color(color.color);
        });
        pieSeries2.colors = colorSet;
        pieSeries2.slices.template.propertyFields.disabled = "labelDisabled";
        pieSeries2.labels.template.propertyFields.disabled = "labelDisabled";
        pieSeries2.ticks.template.propertyFields.disabled = "labelDisabled";
        pieSeries2.labels.template.disabled = true;
        pieSeries2.ticks.template.disabled = true;
        
        // pieSeries.adapter.add("innerRadius", function(innerRadius, target){
        //   return am4core.percent(50);
        // })
        
        pieSeries2.adapter.add("innerRadius", function(innerRadius, target){
          return am4core.percent(45);
        })
        
        // pieSeries.adapter.add("radius", function(innerRadius, target){
        //   return am4core.percent(80);
        // })
        
        pieSeries2.adapter.add("radius", function(innerRadius, target){
          return am4core.percent(60);
        })
    }

    useEffect(()=>{
      if (!aroundChart.current) {
        PieDisplay()
      }
      return () => {
          aroundChart.current && aroundChart.current.dispose();
      };
    },[])

    // Load data into chart
    useEffect(() => {
        if (aroundChart.current) {
            aroundChart.current.data = aroundData.childPie;
        }
      }, [aroundData]);

    // Handle component unmounting, dispose chart
    useEffect(() => {
        return () => {
          aroundChart.current && aroundChart.current.dispose();
        };
    }, []);

    return (
    <>
        <div id={PieName} style={{ width: 400, height: 400}}></div>
    </>
    )
}
export default AroundPie;
