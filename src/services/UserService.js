import ApiEndpointConfig from '../izenda-helpers/ApiEndpointConfig';

export class UserService  {
    constructor() {
        this.state = {
            data: null,
        };
        // set token if saved in local storage
        this.token = localStorage.getItem('tokenKey');
    }



    getUsers() {
        // add authorization header with jwt token
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
    
        // get users from api
        return this.http.get('/api/users', {headers: headers})
          .map((response) => response.json());
      }

      createUser(password, userName){
        const url = ApiEndpointConfig.getPath('createexternaluser');
        
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        
        request.body= JSON.stringify({password:password,  userName:userName });
        request.send();

        if (request.response === 'success'){
            return true;
        }else{
            return false;
        }


       
      }


 
}