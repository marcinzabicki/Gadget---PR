import axios from "axios";
import { MACHINE_LIST_URL } from "../config";
import { SERVICES_LIST_URL } from "../config";

export class API {
  static async fetchMachineList() {
    try {
      return await axios({
        method: "GET",
        url: MACHINE_LIST_URL,
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async fetchServicesList({ machineName } = {}) {
    try {
      return await axios({
        method: "GET",
        url: `${SERVICES_LIST_URL}/${machineName}`,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
