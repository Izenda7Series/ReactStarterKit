import ApiEndpointConfig from '../izenda-helpers/ApiEndpointConfig';
export class UserService {
    constructor() {
        this.state = {
            data: null,
        };
        // set token if saved in local storage
        this.token = localStorage.getItem('tokenKey');
    }


 
}