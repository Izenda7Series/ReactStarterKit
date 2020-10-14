import ApiEndpointConfig from '../izenda-helpers/ApiEndpointConfig';
export class TenantService  {
    constructor() {
        this.state = {
            data: null,
        };
        // set token if saved in local storage
        this.token = localStorage.getItem('izendaToken');
    }

    CreateTenant(id, description, name){
        const url = ApiEndpointConfig.getPath('createtenant');
        let request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
       
        request.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                if (request.response === 'success'){
                    return true;
                }
            }
        }
        //request.body= JSON.stringify({TenantID: id , TenantDescription: description, tenantName:name});
        request.send(JSON.stringify({TenantID: id , TenantDescription: description, TenantName:name}));
        return false;
      }
}