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

  static async stopService(serviceId) {
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/agents/${serviceId}/stop`,
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async startService(serviceId) {
    try {
      return await axios({
        method: "POST",
        url: `${BASE_URL}/agents/${serviceId}/start`,
      });
    } catch (e) {
      console.log(e);
    }
  }

}
