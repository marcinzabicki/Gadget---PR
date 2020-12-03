import React from 'react';
import MachineTile from '../Dashboards/MachineDetails/MachineTile/MachineTile'
import '../Dashboards/MachineDetails/MachineDetails.css';
import Logs from '../Dashboards/Logs/Logs'

const Home = () => {
    const tmpLogs = [
        {time:"09:14:33", status:"[Information]", message:"Lorem ipsum dsadasdsa", service:"nmvsasdasd"},
        {time:"09:14:33", status:"[Information]", message:"Lorem ipsum dsadasdsa", service:"nmvsasdasd"},
        {time:"09:14:33", status:"[Information]", message:"Lorem ipsum dsadasdsa", service:"nmvsasdasd"},
        {time:"09:14:33", status:"[Information]", message:"Lorem ipsum dsadasdsa", service:"nmvsasdasd"}
      ]
    return (
        <div>
        <div className="machine-tiles-container">
            <MachineTile machine="nmv3" address="127.0.0.1" cpu={70} ram={90} disc="47/210" services="23/98"></MachineTile>
            <MachineTile machine="nmv3" address="127.0.0.1" cpu={30} ram={23} disc="150/195" services="48/66"></MachineTile>
            <MachineTile machine="nmv3" address="127.0.0.1" cpu={20} ram={90} disc="47/210" services="23/98"></MachineTile>
            <MachineTile machine="nmv3" address="127.0.0.1" cpu={65} ram={23} disc="150/195" services="48/66"></MachineTile>
        </div>
            <Logs>{tmpLogs}</Logs>
        </div>
    );
}

export default Home;
