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

const CustomTooltipAverage = ({ active, payload, label,customActive,state }) => {
  if (active && payload && payload.length && payload[0].payload.count !== 0 && customActive) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', paddingRight: 10, paddingLeft: 10, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, borderRadius: 5 }}>
        <p className="label" style={{ fontSize: 18, fontWeight: 'bold' }}>Date : {`${label}`}</p>
        <p className="label" style={{ fontSize: 16, color: '#1e9651',display:state.display_running_accom?undefined:"none",fontWeight: 'bold'  }}>RUNNING ACCOM AVERAGE : <span style={{ fontWeight: 'bold' }}>{`${payload[0].payload.running_accom}`}</span></p>
        <p className="label" style={{ fontSize: 16, color: '#9b59b6',display:state.display_running_assign?undefined:"none",fontWeight: 'bold'  }}>RUNNING AVERAGE : <span style={{ fontWeight: 'bold' }}>{`${payload[0].payload.running_average}`}</span></p>
        <p className="label" style={{ fontSize: 16, color: '#f1c40f',display:state.display_ave_accom?undefined:"none",fontWeight: 'bold' }}>ACCOMPLISHED AVERAGE : <span style={{ fontWeight: 'bold' }}>{`${payload[0].payload.average_accom}`}</span></p>
        <p className="label" style={{ fontSize: 16, color: '#3498db',display:state.display_ave_assign?undefined:"none",fontWeight: 'bold'  }}>ASSIGNED AVERAGE : <span style={{ fontWeight: 'bold' }}>{`${payload[0].payload.average_assign}`}</span></p>
        <p className="label" style={{ fontSize: 16, color: '#009432',display:state.display_valid?undefined:"none",fontWeight: 'bold'  }}>VALID : <span style={{ fontWeight: 'bold' }}>{`${payload[0].payload.total_valid}`}</span></p>
        <p className="label" style={{ fontSize: 16, color: '#e74c3c',display:state.display_invalid?undefined:"none",fontWeight: 'bold'  }}>INVALID : <span style={{ fontWeight: 'bold' }}>{`${payload[0].payload.total_invalid}`}</span></p>
      </div>
    );
  }

  return null;
};
const CustomTooltipAccom = ({ active, payload, label }) => {
  if (active && payload && payload.length && payload[0].payload.count !== 0) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', paddingRight: 10, paddingLeft: 10, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, borderRadius: 5 }}>
        <p className="label" style={{ fontSize: 18, fontWeight: 'bold' }}>Date : {`${label}`}</p>
        <p className="label" style={{ fontSize: 16, color: '#2980b9' }}>RUNNING ACCOM AVERAGE : <span style={{ fontWeight: 'bold' }}>{`${payload[0].payload.running_accom}`}</span></p>
        <p className="label" style={{ fontSize: 16, color: '#1abc9c' }}>ACCOMPLISHED AVERAGE : <span style={{ fontWeight: 'bold' }}>{`${payload[0].payload.average_accom}`}</span></p>
       
      </div>
    );
  }

  return null;
};
const CustomTooltipAverageAssigned = ({ active, payload, label }) => {
 
  if (active && payload && payload.length && payload[0].payload.count !== 0) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', paddingRight: 10, paddingLeft: 10, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, borderRadius: 5 }}>
        <p className="label" style={{ fontSize: 18, fontWeight: 'bold' }}>Date : {`${label}`}</p>
        <p className="label" style={{ fontSize: 16 }}>ASSIGNED AVERAGE : <span style={{ fontWeight: 'bold' }}>{`${payload[0].payload.average_assign}`}</span></p>

      </div>
    );
  }

  return null;
};
export default function LineGraph({ line_data, width, height, type, total_jo,state }) {
  const dispatch = useDispatch();
  const [graphState,graphSetState] = React.useState({
    showToolTip : false
  })
  const showToolTip = () =>{
    graphSetState(prev=>({...prev,showToolTip:true}))
  }
  const hideToolTip = () =>{
    graphSetState(prev=>({...prev,showToolTip:false}))
  }
  console.log(graphState.showToolTip)
  return (
    <ResponsiveContainer width="100%" aspect={1.3}>
      <LineChart
        data={line_data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tick={{ fill: '#fff' }} dataKey="date_format" />
       
        {/* {type == "ASSIGNING AVERAGE" && */}
        
        
          <Tooltip content={<CustomTooltipAverage customActive={graphState.showToolTip} state={state}/>} />
     
        {/* } */}
        {/* {type == "ACCOMPLISHMENT AVERAGE" &&
          <Tooltip content={<CustomTooltipAccom />} />
        } */}
        <YAxis tick={{ fill: '#fff' }} />
        {/* <Legend /> */}
        {state.display_running_assign && 
          <Line  activeDot={{
            onMouseOver: showToolTip,
            onMouseLeave: hideToolTip
          }} strokeWidth={3} type="monotone" dataKey="running_average" stroke="#9b59b6" />
       }
        {state.display_ave_assign && 
         <Line  activeDot={{
          onMouseOver: showToolTip,
          onMouseLeave: hideToolTip
        }} strokeWidth={3} type="monotone" dataKey="average_assign" stroke="#3498db" />
        }
        {state.display_running_accom &&  
          <Line  activeDot={{
            onMouseOver: showToolTip,
            onMouseLeave: hideToolTip
          }}  strokeWidth={3} type="monotone" dataKey="running_accom" stroke="#1e9651" />
       }
        {state.display_ave_accom &&
          <Line  activeDot={{
            onMouseOver: showToolTip,
            onMouseLeave: hideToolTip
          }}  strokeWidth={3} type="monotone" dataKey="average_accom" stroke="#f1c40f" />
       
        } 
         {state.display_valid &&
         <Line  activeDot={{
            onMouseOver: showToolTip,
            onMouseLeave: hideToolTip
          }}  strokeWidth={3} type="monotone" dataKey="total_valid" stroke="#009432" />
        } 
         {state.display_invalid &&
           <Line  activeDot={{
            onMouseOver: showToolTip,
            onMouseLeave: hideToolTip
          }}  strokeWidth={3} type="monotone" dataKey="total_invalid" stroke="#e74c3c" />
        
          }
        {/* } */}

      </LineChart>
    </ResponsiveContainer>
  );
}
