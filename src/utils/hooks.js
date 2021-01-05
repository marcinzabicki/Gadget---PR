import React, { useRef, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";


export const useSignalRConnection = (connectionUrl) => {
    const connection = useRef(null);

    useEffect(() => {
        if (connection === null) {
            connection.current = new HubConnectionBuilder()
                .withUrl('https://localhost:5001/gadget')
                .configureLogging(LogLevel.Critical)
                .withAutomaticReconnect()
                .build()
        }
    }, [connection])

    return connection.current;

}