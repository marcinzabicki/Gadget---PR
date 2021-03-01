export default class ResponseParser{

    static MachineHealtStatusReceived(response){
        let updated = {};
            updated.cpu = response.cpuPercentUsage;
            updated.ram = Math.floor(
              100 * (1 - response.memoryFree / response.memoryTotal)
            );
            updated.disc = `${Math.floor(response.discOccupied)}/${Math.floor(
              response.discTotal
            )}`;
            updated.services = `${response.servicesRunning}/${response.servicesCount}`
            updated.name = response.agent;
            
            return updated;
    }
}