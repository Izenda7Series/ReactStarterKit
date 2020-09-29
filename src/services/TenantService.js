import ApiEndpointConfig from '../izenda-helpers/ApiEndpointConfig';
export class TenantService  {
    constructor() {
        this.state = {
            data: null,
        };
        // set token if saved in local storage
        this.token = localStorage.getItem('tokenKey');
    }


    CreateTenant(name, description){
        const url = ApiEndpointConfig.getPath('createtenant');
        const httpHeaders = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        const body= JSON.stringify({TenantName: name , TenantDescription: description});
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