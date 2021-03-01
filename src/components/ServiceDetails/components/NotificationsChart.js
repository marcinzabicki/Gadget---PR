import React from "react";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
 
    const NotificationCharts = (props)=>{
      console.log(props);
      const lineStyle = {
        stroke:"#FFFFFF"
      }
        return (
        <div className="service-details-chart tile">  
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={600}
              height={300}
              data={props.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
                <XAxis reversed={true} dataKey="time"stroke="white" />
                <YAxis stroke="white" domain={[0, 1.5]} tick={false} />
                <text x={45} y={88} dy={8} fontSize="12" textAnchor="middle" fill={'#38E18D'}>Running</text>
                <text x={45} y={208} dy={8} fontSize="12" textAnchor="middle" fill={'#DE3143'}>Stopped</text>
                <Line style={lineStyle} type="monotone" stroke='#8884d8' strokeWidth={1} dot={false} dataKey="value" />
              </LineChart>
        </ResponsiveContainer> 
       
        </div>
        )}

export default NotificationCharts;