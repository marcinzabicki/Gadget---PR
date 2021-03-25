import {API} from '../API'

const InMemoryJwt = () => {
    let inMemoryJWT = null;
    const getToken = () => {
        if (inMemoryJWT===null) {
            API.refreshToken().then((response)=>{
                if (response.status ===200) {
                    setToken(response.data);
                    return response.data;
                }
                return null;
            })
        }
       return inMemoryJWT
    }
    
    const setToken = (token) => {
        inMemoryJWT = token;
        return true;
    };

    const ereaseToken = () => {
        inMemoryJWT = null;
        return true;
    }

    return {
        ereaseToken,
        getToken,
        setToken,
    }
};

export default InMemoryJwt();