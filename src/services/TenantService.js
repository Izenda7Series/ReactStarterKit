import ApiEndpointConfig from '../izenda-helpers/ApiEndpointConfig';
export class TenantService {
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

    async GetAllTenants() {
        try {
            let response = await fetch(ApiEndpointConfig.getPath('izendaAPI')+'/tenant/allTenants',{
                method: 'GET',
                headers: { 'access_token': localStorage.getItem('izendatoken')}
            });
            let json = await response.json();
            if (response.status === 200) {
                return json;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}