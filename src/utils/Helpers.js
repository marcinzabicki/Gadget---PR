//import React from 'react';


export default class Helpers{
    static unCamel(str){
        let result = str.replace( /([A-Z])/g, " $1" );
        return result.charAt(0).toUpperCase() + result.slice(1);
    };

    static upperFirst(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    static  isDate(date) {
        return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
    }

    static formatDate(date) {
       //return  new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(date));
       return new Date(date).toLocaleString();
    }
}