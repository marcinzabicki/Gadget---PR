import axios from "axios";
import { BASE_URL, NOTIFICATIONS_URL } from "../config";
import InMemoryJwt from './Authentication/InMemoryJwt';

export class API {

//#region fetch data

  static async fetchMachineList() {
    let token = InMemoryJwt.getToken();
    try {
      return await axios({
        method: "GET",
        url: `${BASE_URL}/agents`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchServicesList(machineId) {
    let token = InMemoryJwt.getToken();
    try {
      return await axios({
        method: "GET",
        url: `${BASE_URL}/agents/${machineId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchLastEvents(number) {
    let token = InMemoryJwt.getToken();
    try {
      return await axios({
        method: "GET",
        url: `${BASE_URL}/agents/events/${number}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchServiceEvents(agent, service, queryString) {
    let token = InMemoryJwt.getToken();
    try {
      return await axios({
        method: "GET",
        url: `${BASE_URL}/agents/${agent}/${service}/events?count=100&${queryString}`,
        headers: {
          Authorization: `Bearer ${token}`}
      });
    } catch (e) {
      console.log(e);
    }
  }

  //#endregion

//#region manageServices

  static async stopService(agent, service) {
    let token = InMemoryJwt.getToken();
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/agents/${agent}/${service}/stop`,
        headers: {
          Authorization: `Bearer ${token}`}
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async startService(agent, service) {
    let token = InMemoryJwt.getToken();
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/agents/${agent}/${service}/start`,
        headers: {
          Authorization: `Bearer ${token}`}
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async restartService(agent, service) {
    let token = InMemoryJwt.getToken();
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/agents/${agent}/${service}/restart`,
        headers: {
          Authorization: `Bearer ${token}`}
      });
    } catch (e) {
      console.log(e);
    }
  }

  //#endregion

  //#region auth
  static async login(userName, password) {
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/auth/login`,
        data: { userName: userName, password: password },
        withCredentials: true
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async logout() {
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URL}/auth/logout`,
        withCredentials: true
      });

      return response;
    } catch (e) {
      console.log(e);
    }
  }

  static async refreshToken(){
    try {
      const response =  await axios({
        method: "POST",
        url: `${BASE_URL}/auth/refresh`,
        withCredentials: true
      });
      return response;

    } catch (e) {
      console.log(e);
    }
  }

 //#endregion  
 
 //#region notifictions
 static async fetchWebhooks(agent, service) {
  let token = localStorage.getItem('accessToken');
  try {
    return await axios({
      method: "GET",
      url: `${NOTIFICATIONS_URL}/notifications/${agent}/${service}/webhooks`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (e) {
    console.log(e);
  }
}

static async getNotifierTypes() {
  let token =InMemoryJwt.getToken();
  try {
    return await axios({
      method: "GET",
      url: `${NOTIFICATIONS_URL}/notifications/types`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (e) {
    console.log(e);
  }
}

static async createNotifier(agent, service, receiver, type) {
  let token = InMemoryJwt.getToken();
  try {
    return await axios({
      method: "POST",
      url: `${NOTIFICATIONS_URL}/notifications/${agent}/${service}/webhooks`,
      data: { receiver: receiver, notifierType: type },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (e) {
    console.log(e);
  }
}

static async deleteNotifier(agent, service, receiver) {
  let token = InMemoryJwt.getToken();
  try {
    return await axios({
      method: "POST",
      url: `${NOTIFICATIONS_URL}/notifications/${agent}/${service}/deleteNotifier`,
      data: { receiver: receiver},
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (e) {
    console.log(e);
  }
}
 //#endregion


 //#region  tests

 static async test() {
  let token = InMemoryJwt.getToken();
  try {
    return await axios({
      method: "GET",
      url: `${BASE_URL}/auth/test`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (e) {
    console.log(e);
  }
}
 //#endregion
}
