import React, { useState, useEffect } from "react";
import { API } from "../../utils/API";
import { Link } from "react-router-dom";
import Machine from "./Machine";
import { machines } from "../../utils/data";
const Dashboards = () => {
    // const [machines, setMachines] = useState();

    // useEffect(() => {
    //     API.fetchMachineList().then((response) => {
    //         setMachines(response.data);
    //     });
    // }, []);

    return (
        <>
            <h1>Machines:</h1>
            <div>
                {machines && machines.length > 0 ? (
                    machines.map((machine) => {
                        return (
                            <>
                                {/* <Machine>
                                    <Link to={`/machine/${machine.agent}`}>{machine.agent}</Link>
                                </Machine> */}
                                <p>{machine.name}</p>
                                <p>{machine.status}</p>
                            </>
                        );
                    })
                ) : (
                        <p>No machines detected :(</p>
                    )}
            </div>
        </>
    );
};

export default Dashboards;
