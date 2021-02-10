import React, { createContext, useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel, HubConnectionState } from "@microsoft/signalr";
import {SIGNALR_URL} from "../config";


const SignalRContext = createContext(null)

export { SignalRContext }

export default ({ children }) => {
    const [hubConnection, setHubConnection] = useState(null)


    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(SIGNALR_URL)
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


    return (
        <SignalRContext.Provider value={hubConnection}>
            {children}
        </SignalRContext.Provider>
    )
}