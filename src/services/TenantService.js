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
        
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
       
        request.body= JSON.stringify({TenantName: name , TenantDescription: description});
        request.send();

        if (request.response === 'success'){
            return true;
        }else{
            return false;
        }


       
      }

}