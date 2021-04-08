import {API} from '../API'

const InMemoryJwt = () => {
    let inMemoryJWT = null;
    const getToken = () => {
       return inMemoryJWT;
    }

    const getTokenRefreshed = async ()=>{

        if (inMemoryJWT===null || IsExpired(inMemoryJWT)) {
           const response = await API.refreshToken();
           if (response && response.status ===200) {
                setToken(response.data);
                return response.data;
            }
            if (response && response.status ===401) {
                await API.logout();
            }
        }
       return inMemoryJWT;
    }
    
    const setToken = (token) => {
        inMemoryJWT = token;
        return true;
    };

    const ereaseToken = () => {
        inMemoryJWT = null;
        return true;
    }

function IsExpired(token){
    try{
        let decoded = parseJwt(token);
       return  decoded.exp < new Date().getTime()/1000

    }
    catch{
        return false;
    }
    
}

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    return {
        ereaseToken,
        getToken,
        setToken,
        getTokenRefreshed,
    }
};

export default InMemoryJwt();