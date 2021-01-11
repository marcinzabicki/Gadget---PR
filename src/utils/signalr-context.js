import React, { createContext, useRef, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";


const SignalRContext = createContext(null)

export { SignalRContext }

export default ({ children }) => {
    let connection;

    connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/gadget')
        //.withUrl('http://ec2-18-130-85-230.eu-west-2.compute.amazonaws.com:5000/gadget')
        .configureLogging(LogLevel.Critical)
        .withAutomaticReconnect()
        .build()



    return (
        <SignalRContext.Provider value={connection}>
            {children}
        </SignalRContext.Provider>
    )
}