import React from 'react';
import { PieChart, Pie, Cell, } from 'recharts';

const chart = (props)=>{
    const style = {
        "font-size": "30px",
        "font-weight": "bold",
    }
    return (
        <div className="machine-chart" style={style}>
          {props.selectable? <select onChange={props.changed}>
        <option>CPU</option>
        <option>RAM</option>
      </select> : null}
      
        <PieChart width={279} height={120}>
        
        <text x={130} y={90} dy={8} textAnchor="middle" fill={'white'}>{props.children + '%'}</text>
        <Pie
          data={[{name:'usage', value:parseInt(props.children)}, {name:'left', value:100-parseInt(props.children)}]}
          cx={120}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          fill="#313843"
        >
            <Cell key={`cell-1`} fill={parseInt(props.children)>60? '#E13849': '#38E18D' } />)
        </Pie>
      </PieChart>
      </div>
    )
}

export default chart;