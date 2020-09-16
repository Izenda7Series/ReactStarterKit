import ApiEndpointConfig from '../izenda-helpers/ApiEndpointConfig';
export class TenantService {
    constructor() {
        this.state = {
            data: null,
        };
        // set token if saved in local storage
        this.token = localStorage.getItem('tokenKey');
    }


    createTenant(tenantid, tenantname){
        const url = ApiEndpointConfig.getPath('createtenant');
        const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        const body= JSON.stringify({TenantId: tenantid,  TenantName: tenantname });
        const httpOptions = {
            headers: httpHeaders
        };
  
        return this.httpClient.post(url, body, httpOptions )
            .map((response) => {
              if (response === 'success')
                return true;
              else
                return false;
            });
      }

}