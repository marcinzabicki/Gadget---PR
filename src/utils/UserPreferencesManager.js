//import React from 'react';


export class UserPreferencesManager{
    static getUserSettings(){
        let settings =  localStorage.getItem('userPreferences');
        if (settings ===null || settings === undefined) {
            this.initUeserPreferences();
            return localStorage.getItem('userPreferences');
        }
        return JSON.parse(settings);
    };

    static updateUserSettings(obj){
        let newSettings = JSON.stringify(obj);
        localStorage.setItem('userPreferences', newSettings)
    };

    static addServiceToFavourites(agent, service){
        let settings =  JSON.parse(localStorage.getItem('userPreferences'));
        let newFav = {agent:agent, service:service};
        
        if (settings === null || settings === undefined) {
            this.initUeserPreferences();
            let initialized = JSON.parse(localStorage.getItem('userPreferences'));
            let updated = [];
            updated.push(newFav);
            initialized.favourites = updated;
            this.updateUserSettings(initialized)
        }
        else{
            if (this.containsObject(newFav, settings.favourites)) {
                return;
            }
            let readed = JSON.parse(localStorage.getItem('userPreferences')); 
            let updated = readed.favourites
            updated.push(newFav);
            readed.favourites = updated;
            this.updateUserSettings(readed);
        }
    };

    static removeServiceFromFavourites(agent, service){
        let settings =  JSON.parse(localStorage.getItem('userPreferences'));
        if (settings === null || settings === undefined) {
            return
        }
        let toRemove = {agent:agent, service:service};
        let favs = settings.favourites;
        if (!this.containsObject(toRemove, settings.favourites)) {
            return;
        }
        let updated = favs.filter(function(x) { return !(x.agent==agent && x.service==service) }); 
        settings.favourites =updated;
        console.log(updated);
        this.updateUserSettings(settings);
    };

    static containsObject(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
                return true;
            }
        }
        return false;
    }

    static initUeserPreferences(){
        let newSettings = {favourites:[]}
        localStorage.setItem('userPreferences', JSON.stringify(newSettings));
    };

    static isServiceFavourite(agent, service){
        let settings = JSON.parse(localStorage.getItem('userPreferences'));
        if (settings === null || settings === undefined) {
            return
        }
        let obj = {agent:agent, service:service};
        return this.containsObject(obj, settings.favourites)
    }
}