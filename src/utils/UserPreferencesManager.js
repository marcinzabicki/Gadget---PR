//import React from 'react';


export class UserPreferencesManager{
    static GetUserSettings(){
        let settings =  localStorage.getItem('userPreferences');
        if (settings ===null || settings === undefined) {
            this.InitUeserPreferences();
            return localStorage.getItem('userPreferences');
        }
        return JSON.parse(settings);
    };

    static UpdateUserSettings(obj){
        let newSettings = JSON.stringify(obj);
        localStorage.setItem('userPreferences', newSettings)
    };

    static AddServiceToFavourites(agent, service){
        let settings =  JSON.parse(localStorage.getItem('userPreferences'));
        let newFav = {agent:agent, service:service};
        
        if (settings === null || settings === undefined) {
            this.InitUeserPreferences();
            let initialized = JSON.parse(localStorage.getItem('userPreferences'));
            let updated = [];
            updated.push(newFav);
            initialized.favourites = updated;
            this.UpdateUserSettings(initialized)
        }
        else{
            if (!this.containsObject(newFav, settings.favourites)) {
                return;
            }
            let readed = JSON.parse(localStorage.getItem('userPreferences')); 
            console.log(readed);
            let updated = readed.favourites
            updated.push(newFav);
            readed.favourites = updated;
            this.UpdateUserSettings(readed);
        }
        
    };

    static RemoveServiceFromFavourites(agent, service){
        let settings =  localStorage.getItem('userPreferences');
        if (settings === null || settings === undefined) {
            localStorage.setItem('userPreferences', {favourites:[]})
        }
        let updated = settings['favourites'].filter((x)=>{return x.agent !==agent && x.service !==service})
        settings['favourites'] =updated;
    };

    static containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
    }

    static InitUeserPreferences(){
        let newSettings = {favourites:[]}
        localStorage.setItem('userPreferences', JSON.stringify(newSettings));
    };
}