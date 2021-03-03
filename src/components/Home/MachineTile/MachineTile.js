import React, { useEffect, useState } from "react";
import Chart from "../../Common/MetricsComponents/Chart";
import MetricTile from "../../Common/MetricsComponents/MetricTile";
import Label from "../../Common/MetricsComponents/Label";
import "../../Common/MetricsComponents/MachineDetails.css";
import { Link } from "react-router-dom";
import deadIcon from "../../Common/MetricsComponents/images/agent_is_dead.png";

const MachineTile = (props) => {
  const [machineTileState, setMachineTileState] = useState({
    metrics: { RAM: props.ram || 0, CPU: props.cpu || 0 },
    show: "CPU",
  });

  useEffect(() => {
    setMachineTileState({
      metrics: { RAM: props.ram, CPU: props.cpu },
      show: machineTileState.show,
    });
  }, [props]);

  const changeMetricData = (event) => {
    setMachineTileState({
      metrics: { RAM: props.ram, CPU: props.cpu },
      show: event.target.value,
    });
  };

  if (props.cpu >= 0) {
    return (
      <div className="machine-tile">
        <Link to={`/${props.machine}`}>
          <Label
            machineName={props.machine}
            machineAddress={props.machineAddress}
          ></Label>
        </Link>
        <div className="metric-tile-container">
          <MetricTile values={props.services} type="service">
            Services
          </MetricTile>
          <MetricTile values={props.disc} type="disc">
            Disk space
          </MetricTile>
        </div>
        <Chart changed={(event) => changeMetricData(event)} selectable={true}>
          {parseInt(machineTileState.metrics[machineTileState.show])}
        </Chart>
      </div>
    );
  }
  return (
    <div className="machine-tile">
      <Label
        machineName={props.machine}
        machineAddress={props.machineAddress}
      ></Label>
      <div className="dead-machine-tile">
        <img src={deadIcon} height={150} />
      </div>
    </div>
  );
};

export default MachineTile;
