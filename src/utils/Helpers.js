//import React from 'react';


export default class Helpers{
    static unCamel(str){
        let result = str.replace( /([A-Z])/g, " $1" );
        return result.charAt(0).toUpperCase() + result.slice(1);
    };

    static upperFirst(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
}