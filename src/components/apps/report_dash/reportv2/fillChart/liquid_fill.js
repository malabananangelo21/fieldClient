import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LiquidFillGauge from 'react-liquid-gauge';
var startColor = '#2980b9'; // cornflowerblue
var middleColor = '#f0932b'; // cornflowerblue
var endColor = '#6ab04c'; // crimson

// var first = 'red'; // crimson
// var second = 'blue'; // crimson
function FillRealtime({totalAccom,Accompercentage,totalJo}){
    const radius = 200;
    const interpolate = interpolateRgb(startColor,endColor);
    // const interpolate2 = interpolateRgb(first,second);
    const fillColor = interpolate(Accompercentage / 100);
    // const fillColor2 = interpolate2(40 / 100);
    const gradientStops = [
        {
            key: '0%',
            stopColor: color(fillColor).darker(0.5).toString(),
            stopOpacity: 1,
            offset: '0%'
        },
        {
            key: '50%',
            stopColor: color(fillColor).brighter(0.5).toString(),
            stopOpacity: 0.75,
            offset: '50%'
        },
        {
            key: '100%',
            stopColor: color(fillColor).brighter(0.5).toString(),
            stopOpacity: 0.5,
            offset: '100%'
        }
    ];
    // const gradientStops2 = [
    //     {
    //         key: '0%',
    //         stopColor: color(fillColor2).darker(0.5).toString(),
    //         stopOpacity: 1,
    //         offset: '0%'
    //     },
    //     {
    //         key: '50%',
    //         stopColor: color(fillColor2).brighter(0.5).toString(),
    //         stopOpacity: 0.75,
    //         offset: '50%'
    //     },
    //     {
    //         key: '100%',
    //         stopColor: color(fillColor2).brighter(0.5).toString(),
    //         stopOpacity: 0.5,
    //         offset: '100%'
    //     }
    // ];

    return (
        <>
        {/* <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 350, height: 350, display: 'flex', alignItems: 'center' }}> */}
            <LiquidFillGauge
                style={{ margin: '0 auto' }}
                width={330}
                height={330}
                value={Accompercentage}
                percent="%"
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={(props) => {
                    const value = Math.round(props.value);
                    const radius = Math.min(props.height / 2, props.width / 2);
                    const textPixels = (props.textSize * radius / 2);
                    const valueStyle = {
                        fontSize: textPixels
                    };
                    const percentStyle = {
                        fontSize: textPixels * 0.6
                    };
                    const Accomplishmentstyle = {
                        fontSize: textPixels * 0.4
                    };

                    return (
                        <>
                        <tspan>
                            <tspan className="value" style={valueStyle}>{value}</tspan>
                            <tspan style={percentStyle}>{props.percent}</tspan>
                            <tspan style={Accomplishmentstyle} x="0" dy="1.6em">{totalAccom} / {totalJo}</tspan>
                            {/* <tspan style={Accomplishmentstyle} style={{fontSize: textPixels * 0.3}} >{totalJo}</tspan> */}
                            <tspan className="value" style={{fontSize: textPixels * 0.3}} x="0" dy="1.3em">Accomplished</tspan>
                        </tspan>
                        </>
                    );
                }}
                riseAnimation
                waveAnimation
                waveFrequency={2}
                waveAmplitude={1}
                
                gradient
                gradientStops={gradientStops}
                outerRadius={.9}
                innerRadius={1}
                circleStyle={{
                    fill: '#f5f6fa'
                }}
                waveStyle={{
                    fill: fillColor,
                    
                }}
                textStyle={{
                    fill: color('#444').toString(),
                    fontFamily: 'Arial'
                }}
                waveTextStyle={{
                    fill: color('#fff').toString(),
                    fontFamily: 'Arial'
                }}
            />
            {/* </div>
            <div style={{ position: 'absolute', alignSelf: 'center', width: 350, height: 350 }}>
                <LiquidFillGauge
                style={{ margin: '0 auto' }}
                width={255}
                height={255}
                value={40}
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={(props) => {
                    const value = Math.round(props.value);
                    const radius = Math.min(props.height / 2, props.width / 2);
                    const textPixels = (props.textSize * radius / 2);
                    const valueStyle = {
                        fontSize: textPixels
                    };
                    const percentStyle = {
                        fontSize: textPixels * 0.6
                    };
                    const Accomplishmentstyle = {
                        fontSize: textPixels * 0.4
                    };

                    return (
                        <>
                        <tspan>
                            <tspan className="value" style={valueStyle}>{value}</tspan>
                            <tspan style={percentStyle}>{props.percent}</tspan>
                            <tspan style={Accomplishmentstyle} x="0" dy="1.6em">{totalAccom} / {totalJo}</tspan>
                            <tspan style={Accomplishmentstyle} style={{fontSize: textPixels * 0.3}} >{totalJo}</tspan>
                            <tspan className="value" style={{fontSize: textPixels * 0.3}} x="0" dy="1.3em">Accomplished</tspan>
                        </tspan>
                        </>
                    );
                }}
                riseAnimation
                waveAnimation
                waveFrequency={2}
                waveAmplitude={1}
                
                gradient
                gradientStops={gradientStops2}
                outerRadius={.9}
                innerRadius={1}
                circleStyle={{
                    fill: '#f5f6fa'
                }}
                waveStyle={{
                    fill: fillColor2,
                    
                }}
                textStyle={{
                    fill: color('#444').toString(),
                    fontFamily: 'Arial'
                }}
                waveTextStyle={{
                    fill: color('#fff').toString(),
                    fontFamily: 'Arial'
                }}
                />   
            </div>
        </div> */}
         

        
        </>
      )
}
export default FillRealtime;