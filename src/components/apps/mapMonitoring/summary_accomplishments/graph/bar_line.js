import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import moment from 'moment'
import { Button, Grid, IconButton, Typography,Card, CardContent} from "@material-ui/core";

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
      <div className="custom-tooltip" style={{backgroundColor:'#fff',paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5,paddingLeft:10,borderRadius:5,width:600}}>
          {/* <p className="label" style={{fontSize:18,fontWeight:'bold'}}>Date : {`${label}`}</p>
          <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>APF</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.average_assign)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Fieldman</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.fieldman)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Total</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.total_jo)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Assigned</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.assigned)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Unassigned</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.unassigned)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Accomplished</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.accomplishment)}`}</span></p>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'75%'}}>
          <p className="label" style={{fontSize:16}}>Delay</p>
          </div>
          <div style={{width:'10%'}}>
          <p className="label" style={{fontSize:16}}>:</p>
          </div>
          <div style={{width:'35%'}}>
          <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.remaining)}`}</span></p>
          </div>
        </div> */}
        <Grid container spacing={1}> 
          <Grid item xs={4} m={4}>
          <Card variant={"outlined"}>
            <CardContent style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <p className="label" style={{fontSize:16}}>APF</p>
              <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.average_assign)}`}</span></p>
            </CardContent>
        </Card>
          </Grid>
          <Grid item xs={4} md={4}>
          <Card variant={"outlined"}>
            <CardContent style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <p className="label" style={{fontSize:16}}>FIELDMAN</p>
              <p className="label" style={{fontSize:16}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.fieldman)}`}</span></p>
            </CardContent>
        </Card>
          </Grid>
          <Grid item xs={4} md={4}>
          <Card variant={"outlined"} style={{backgroundColor:'#74b9ff'}}>
            <CardContent style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>TOTAL</p>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.total_jo)}`}</span></p>
            </CardContent>
        </Card>
          </Grid>
          <Grid item xs={4} md={4}>
          <Card variant={"outlined"} style={{backgroundColor:'#8e44ad'}}>
            <CardContent style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>Assigned</p>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.assigned)}`}</span></p>
            </CardContent>
        </Card>
          </Grid>
          <Grid item xs={4} md={4} >
          <Card variant={"outlined"} style={{backgroundColor:'#2980b9'}}>
            <CardContent style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>Unassigned</p>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.unassigned)}`}</span></p>
            </CardContent>
        </Card>
          </Grid>
          <Grid item xs={4} md={4}>
          <Card variant={"outlined"} style={{backgroundColor:'#2ecc71'}}>
            <CardContent style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>Accomplished</p>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.accomplishment)}`}</span></p>
            </CardContent>
        </Card>
          </Grid>
          <Grid item xs={4} md={4}>
          <Card variant={"outlined"} style={{backgroundColor:'#f1c40f'}}>
            <CardContent style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>Delay</p>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.remaining)}`}</span></p>
            </CardContent>
        </Card>
          </Grid>
          <Grid item xs={4} md={4}>
          <Card variant={"outlined"} style={{backgroundColor:'#d691f2'}}>
            <CardContent style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>Re-out Assigned</p>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.re_out_assigned)}`}</span></p>
            </CardContent>
        </Card>
          </Grid>
          <Grid item xs={4} md={4}>
          <Card variant={"outlined"} style={{backgroundColor:'#75b7f0'}}>
            <CardContent style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>Re-out Unssigned</p>
              <p className="label" style={{fontSize:16,color:'#fff',fontWeight:'bold'}}><span style={{fontWeight:'bold'}}>{`${formatNumber(payload[0].payload.re_out_unassigned)}`}</span></p>
            </CardContent>
        </Card>
          </Grid>

        </Grid>
      
      </div>
    );
  }

  return null;
};
export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/composed-chart-in-responsive-container-pkqmy';
  
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer>
          <ComposedChart
            onClick={(e)=>{
            let data = {
                parameter: "branch_id",
                selection: [this.props.dataFilter.branch_id],
                from: moment(e.activePayload[0].payload.date).format("YYYY-MM-DD"),
                to: moment(e.activePayload[0].payload.date).format("YYYY-MM-DD"),
                company_id: this.props.company_id,
                jo_type: this.props.jo_type
            }
            console.log(data)
            this.props.getdateDetails(data)
            }}
            style={{cursor:'pointer'}}
            width={500}
            height={300}
            data={this.props.summary}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis tick={{ fill: '#fff' }} dataKey="name" scale="band" />
            <YAxis tick={{ fill: '#fff' }}/>
            <Tooltip position={{ y: -320}} content={<CustomTooltip/>} />
            <Legend />
            {/* <Bar dataKey="average_assign"  stackId="a" fill="#d35400" /> */}
            <Bar  dataKey="assigned"  stackId="a" fill="#8e44ad" />
            <Bar dataKey="re_out_assigned"  stackId="a" fill="#d691f2" />
            <Bar dataKey="unassigned"  stackId="a" fill="#2980b9" />
            <Bar dataKey="re_out_unassigned"  stackId="a" fill="#75b7f0" />

            <Line strokeWidth={3} type="monotone" dataKey="remaining" stroke="#f1c40f" />
            <Line strokeWidth={3} type="monotone" dataKey="accomplishment" stroke="#2ecc71" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
