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

export const cutText = (
    text,
    length,
) => {
    if (!text) {
        return '';
    }

    if (typeof text !== 'string') return text

    const wordsLength = text
        .split(/(\s)/)
        .filter(e => ![' ', '  '].includes(e));

    if (wordsLength.length <= length) return text;

    return `${wordsLength.slice(0, length).join(' ')}...`;
};