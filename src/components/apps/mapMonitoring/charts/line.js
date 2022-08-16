import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux'
const data = [
  {
    time: '4:00',
    count: 12,
  },
  {
    time: '7:00',
    count: 12,
  },
  {
    time: '6:00',
    count: 12,
  },
];
const CustomTooltip = ({ active, payload, label }) => {
  console.log(payload);
  if (active && payload && payload.length && payload[0].payload.cumulative !== 0) {
    return (
      <div className="custom-tooltip" style={{backgroundColor:'#fff',paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5,paddingLeft:10,borderRadius:5}}>
        <p className="label" style={{fontSize:18,fontWeight:'bold'}}>Time : {`${label}`}</p>
        <p className="label" style={{fontSize:16}}>JO / Hour : <span style={{fontWeight:'bold'}}>{`${payload[0].payload.count}`}</span></p>
        <p className="label" style={{fontSize:16}}>Battery Life : <span style={{fontWeight:'bold'}}>{`${payload[0].payload.battery}`}%</span></p>
        <p className="label" style={{fontSize:16}}>JO Accomplished : <span style={{fontWeight:'bold'}}>{`${payload[0].payload.cumulative}`}</span></p>
        <p className="label" style={{fontSize:16}}>Percentage : <span style={{fontWeight:'bold'}}>{`${parseFloat((payload[0].payload.cumulative/payload[0].payload.total_jo) * 100).toFixed(2)}`}%</span></p>
     
       

        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
      </div>
    );
  }

  return null;
};
const CustomTooltip2 = ({ active, payload, label }) => {
  console.log(payload);
  if (active && payload && payload.length && payload[0].payload.count !== 0) {
    return (
      <div className="custom-tooltip" style={{backgroundColor:'#fff',paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5,paddingLeft:10,borderRadius:5}}>
        <p className="label" style={{fontSize:18,fontWeight:'bold'}}>Time : {`${label}`}</p>
        <p className="label" style={{fontSize:16}}>Job Order : <span style={{fontWeight:'bold'}}>{`${payload[0].payload.count}`}</span></p>
        <p className="label" style={{fontSize:16}}>Fieldman : <span style={{fontWeight:'bold'}}>{`${payload[0].payload.fieldmanCount}`}</span></p>
      </div>
    );
  }

  return null;
};
const CustomTooltip3 = ({ active, payload, label }) => {
  console.log(payload);
  if (active && payload && payload.length && payload[0].payload.count !== 0) {
    return (
      <div className="custom-tooltip" style={{backgroundColor:'#fff',paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5,paddingLeft:10,borderRadius:5}}>
        <p className="label" style={{fontSize:18,fontWeight:'bold'}}>Time : {`${label}`}</p>
        <p className="label" style={{fontSize:16}}>Job Order : <span style={{fontWeight:'bold'}}>{`${payload[0].payload.cumulative}`}</span></p>
        <p className="label" style={{fontSize:16}}>Percentage : <span style={{fontWeight:'bold'}}>{`${parseFloat((payload[0].payload.cumulative/payload[0].payload.total_jo) * 100).toFixed(2)}`}%</span></p>
       
      </div>
    );
  }

  return null;
};
export default function LineGraph({ line_data ,width,height,type,total_jo}){
  const dispatch = useDispatch();

    return (
      // <ResponsiveContainer width="100%" height="100%">
        <LineChart
          
          width={width}
          height={height}
          data={line_data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis tick={{ fill: '#fff' }} dataKey="time" />
          {type === 'CUMMULATIVE'?
          <YAxis tick={{ fill: '#fff' }} domain={[0, total_jo]} />:
          <YAxis tick={{ fill: '#fff' }} />
        }

          
          {type == 'ALL'?
          <Tooltip content={<CustomTooltip2/>} />
          :type === 'CUMMULATIVE'? <Tooltip content={<CustomTooltip3/>} />:
          <Tooltip content={<CustomTooltip/>} />
          }
          

         

          <Legend />
            {type == 'ALL'? <Line strokeWidth={2} type="monotone" dataKey="fieldmanCount"  stroke="#f39c12"  />:
            type === 'CUMMULATIVE'?undefined:<Line  strokeWidth={2} type="monotone" dataKey="battery" stroke="#e74c3c" />          
          }
       
         {type === 'CUMMULATIVE'?<Line strokeWidth={2} type="monotone" dataKey="cumulative"  stroke="#27ae60"  />:
        
              <Line strokeWidth={2} type="monotone" dataKey="count"  stroke="#27ae60"  />
              // <Line strokeWidth={2} type="monotone" dataKey="cumulative"  stroke="#27ae60"  />
           
         }
          {type === ''?  <Line strokeWidth={2} type="monotone" dataKey="cumulative"  stroke="#f39c12"  />:
          undefined
            
        }
    
          {/* <Line activeDot={{ onClick: (event, payload) => dispatch({
            type:'ClickGraph',
            payload:payload.payload
          })}}  strokeWidth={2} type="monotone" dataKey="count"  stroke="#f39c12"  /> */}
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      // </ResponsiveContainer>
    );
}
