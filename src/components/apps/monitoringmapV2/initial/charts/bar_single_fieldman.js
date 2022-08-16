import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment'

const data = [
  {
    name: 'Page A',
    remaining: 590,
    unassign: 800,
    accom: 421,
    assign: 200,
  },
  {
    name: 'Page B',
    remaining: 732,
    unassign: 967,
    accom: 879,
    assign: 200,
  },
  {
    name: 'Page C',
    remaining: 782,
    unassign: 1098,
    accom: 124,
    assign: 200,
  },
  {
    name: 'Page D',
    remaining: 123,
    unassign: 1200,
    accom: 321,
    assign: 200,
  },
  {
    name: 'Page E',
    remaining: 983,
    unassign: 1108,
    accom: 650,
    assign: 200,
  },
  {
    name: 'Page F',
    remaining: 0,
    assign: 200,
    unassign: 680,
    accom: 880,
  },
];
const formatNumber = (num) => {
  if (num != "") {
    let num2 = parseFloat(num);
    return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return 0;
  }
};
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{backgroundColor:'#fff',paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5,paddingLeft:10,borderRadius:5}}>
          <p className="label" style={{fontSize:18,fontWeight:'bold'}}>Date : {`${label}`}</p>
       
       
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Total</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.fieldmanCount)}`}</span></p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/composed-chart-in-responsive-container-pkqmy';
  render() {
    return (
        <ResponsiveContainer width="100%" aspect={1.2}>
        <BarChart
          width={500}
          height={300}
          data={this.props.bar_data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="battery" fill="#8884d8" />
          <Bar dataKey="cumulative" fill="#82ca9d" />
          <Bar dataKey="count" fill="#8884d8" />

        </BarChart>
      </ResponsiveContainer>

     
    );
  }
}
