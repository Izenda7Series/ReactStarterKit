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
        const httpHeaders = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        const body= JSON.stringify({password:password,  userName:userName });
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