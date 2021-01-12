import React, { createContext, useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel, HubConnectionState } from "@microsoft/signalr";


const SignalRContext = createContext(null)

export { SignalRContext }

export default ({ children }) => {
<<<<<<< HEAD
    const [hubConnection, setHubConnection] = useState(null)


    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/gadget')
            .configureLogging(LogLevel.Critical)
            .withAutomaticReconnect()
            .build()

        async function start() {
            try {
                await connection.start();
                setHubConnection(connection)
            } catch (err) {
                console.log(err);
                setTimeout(() => start(), 5000);
            }
        };
        connection?.onclose(start);
        start();
    }, [])
=======
    let connection;

    connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/gadget')
        //.withUrl('http://ec2-18-130-85-230.eu-west-2.compute.amazonaws.com:5000/gadget')
        .configureLogging(LogLevel.Critical)
        .withAutomaticReconnect()
        .build()

>>>>>>> c56e1aa7aa462aca985e328f35154af3eb7b453b


    return (
        <SignalRContext.Provider value={hubConnection}>
            {children}
        </SignalRContext.Provider>
    )
}