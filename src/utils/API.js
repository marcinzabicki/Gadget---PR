import axios from "axios";
import { BASE_URL, NOTIFICATIONS_URL } from "../config";

export class API {
  static async fetchMachineList() {
    let token = localStorage.getItem('accessToken');
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
    let token = localStorage.getItem('accessToken');
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
    let token = localStorage.getItem('accessToken');
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

//#region manageServices

  static async stopService(agent, service) {
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/agents/${agent}/${service}/stop`,
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async startService(agent, service) {
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/agents/${agent}/${service}/start`,
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async restartService(agent, service) {
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/agents/${agent}/${service}/restart`,
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
        data: { userName: userName, password: password }
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async test() {
    let token = localStorage.getItem('accessToken');
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

  static async logout() {
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/logoutUrl`,
      });
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
  let token = localStorage.getItem('accessToken');
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
  let token = localStorage.getItem('accessToken');
  try {
    return await axios({
      method: "POST",
      url: `${NOTIFICATIONS_URL}/notifications/${agent}/${service}/webhooks`,
      data: { receiver: receiver, type: type },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (e) {
    console.log(e);
  }
}

static async deleteNotifier(agent, service, receiver) {
  let token = localStorage.getItem('accessToken');
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

  

  static async fetchServiceEvents(agent, service, queryString) {
    try {
      return await axios({
        method: "GET",
        url: `${BASE_URL}/agents/${agent}/${service}/events?count=100&${queryString}`,
      });
    } catch (e) {
      console.log(e);
    }
  }

}
