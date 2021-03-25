import {API} from '../API'

const InMemoryJwt = () => {
    let inMemoryJWT = null;
    const getToken = () => {
        if (inMemoryJWT===null) {
            API.refreshToken().then((response)=>{
                if (response && response.status ===200) {
                    setToken(response.data);
                    return response.data;
                }
                return null;
            })
        }
        
        if (IsExpired(inMemoryJWT)) {
            API.refreshToken().then((response)=>{
                if (response && response.status ===200) {
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
    }
};

export default InMemoryJwt();