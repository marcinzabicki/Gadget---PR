import axios from "axios";
import { BASE_URL } from "../config";

export class API {
  static async fetchMachineList() {
    try {
      return await axios({
        method: "GET",
        url: `${BASE_URL}/agents`,
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async fetchServicesList(machineId) {
    try {
      return await axios({
        method: "GET",
        url: `${BASE_URL}/agents/${machineId}`,
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchLastEvents(number) {
    try {
      return await axios({
        method: "GET",
        url: `${BASE_URL}/agents/events/${number}`,
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

  static async login(login, password) {
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/loginUrl`,
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

}
