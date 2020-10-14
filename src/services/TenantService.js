import ApiEndpointConfig from '../izenda-helpers/ApiEndpointConfig';
export class TenantService {
    constructor() {
        this.state = {
            data: null,
        };
        // set token if saved in local storage
        this.token = localStorage.getItem('izendaToken');
    }

    async CreateTenant(id, name) {
        try {
            let response = await fetch(ApiEndpointConfig.getPath('createtenant'), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    TenantID: id,
                    TenantName: name
                })
            });
            await response.json();
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}