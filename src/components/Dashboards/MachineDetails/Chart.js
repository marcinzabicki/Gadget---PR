import React from 'react';
import { PieChart, Pie, Cell, } from 'recharts';
import './MachineDetails.css'

const Chart = (props)=>{
    return (
      <div className="machine-chart">
          {props.selectable? <select onChange={props.changed}>
        <option>CPU</option>
        <option>RAM</option>
      </select> : null}
      
        <PieChart width={280} height={120}>
        <text x={145} y={90} dy={8} textAnchor="middle" fill={'white'}>{props.children + '%'}</text>
        {/* legend start */}
        <text x={45} y={100} dy={8} fontSize="8" textAnchor="middle" fill={'#494F59'}>0</text>
        <text x={50} y={71} dy={8} fontSize="8" textAnchor="middle" fill={'#494F59'}>10</text>
        <text x={63} y={44} dy={8} fontSize="8" textAnchor="middle" fill={'#494F59'}>20</text>
        <text x={84} y={23} dy={8} fontSize="8" textAnchor="middle" fill={'#494F59'}>30</text>
        <text x={111} y={10} dy={8} fontSize="8" textAnchor="middle" fill={'#494F59'}>40</text>
        <text x={140} y={5} dy={8} fontSize="8" textAnchor="middle" fill={'#494F59'}>50</text>
        <text x={169} y={10} dy={8} fontSize="8" textAnchor="middle" fill={'#494F59'}>60</text>
        <text x={196} y={23} dy={8} fontSize="8" textAnchor="middle" fill={'#494F59'}>70</text>
        <text x={217} y={44} dy={8} fontSize="8" textAnchor="middle" fill={'#494F59'}>80</text>
        <text x={230} y={71} dy={8} fontSize="8" textAnchor="middle" fill={'#494F59'}>90</text>
        <text x={235} y={100} dy={8} fontSize="8" textAnchor="middle" fill={'#494F59'}>100</text>

        {/* legend end */}
        <Pie
          data={[{name:'usage', value:parseInt(props.children)}, {name:'left', value:100-parseInt(props.children)}]}
          cx={135}
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

export default Chart;