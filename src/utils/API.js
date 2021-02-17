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

  static async stopService(agent, service) {
    try {
      console.log(`${BASE_URL}/agents/${agent}/${service}`)
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
      console.log(`${BASE_URL}/agents/${agent}/${service}`)
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

  static async logout(login, password) {
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/logoutUrl`,
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchServiceDetails(agent, service) {
    try {
      // return await axios({
      //   method: "POST",
      //   url: `${NOTIFICATIONS_URL}/${agent}/${service}`,
      // });

      // mock:
      return {
        machine: "nmv3",
        serviceName:"Lucek service", 
        LogonAs:"Lucjano", 
        description: "Usługa do karmienia piesełów", 
        status: "Running",
        events:[
          {time:"2021-02-01", value:0.3 },
          {time:"2021-02-02", value:0.3 },
          {time:"2021-02-03", value:1 },
          {time:"2021-02-04", value:1 },
          {time:"2021-02-05", value:1, },
          {time:"2021-02-06", value:1, },
          {time:"2021-02-07", value:1 },
          {time:"2021-02-08", value:1 },
          {time:"2021-02-09", value:0.3},
          {time:"2021-02-10", value:0.3},
          {time:"2021-02-11", value:0.3 },
          {time:"2021-02-12", value:1 },
          {time:"2021-02-13", value:1},
          {time:"2021-02-14", value:1},
          {time:"2021-02-15", value:1},
          {time:"2021-02-16", value:1},
          {time:"2021-02-17", value:1 },
          {time:"2021-02-18", value:1 }]
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchNotificationsSettings(agent, service) {
    try {
      return await axios({
        method: "POST",
        url: `${NOTIFICATIONS_URL}/${agent}/${service}`,
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchServiceEvents(agent, service) {
    try {
      return await axios({
        method: "GET",
        url: `${BASE_URL}/agents/${agent}/${service}/events?count=100`,
      });
    } catch (e) {
      console.log(e);
    }
  }

}
