import React from "react";
import Chart from "../Chart";
import MetricTile from "../MetricTile";
import Label from "../Label";
import "../MachineDetails.css";

const MachineBar = (props) => {
  return (
    <div className="machine-bar">
      <div className="machine-bar-label">
        <Label
          machineName={props.machine}
          machineAddress={props.address}
        ></Label>
      </div>
      <div className="machine-bar-charts">
        <Chart label="CPU" selectable={false}>
          {props.cpu || "0"}
        </Chart>
        <Chart label="MEMORY" selectable={false}>
          {props.ram || "0"}
        </Chart>
      </div>
      <div className="machine-bar-metrics">
        <MetricTile values={props.services} type="service">
          Services
        </MetricTile>
        <MetricTile values={props.disc} type="disc">
          Disc space
        </MetricTile>
      </div>
    </div>
  );
};

export default MachineBar;
