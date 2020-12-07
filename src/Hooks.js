import { useState, useEffect } from 'react';

export const useWindowSize = () => {

    const [windowSize, setWindowSize] = useState(undefined);

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}