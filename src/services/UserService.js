import ApiEndpointConfig from '../izenda-helpers/ApiEndpointConfig';

export class UserService {
    constructor() {
        this.state = {
            data: null,
        };
        // set token if saved in local storage
        this.token = localStorage.getItem('izendaToken');
    }
    createUser(UserID, FirstName, LastName, tenant, role, admin) {
        const url = ApiEndpointConfig.getPath('createexternaluser');

        let request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        console.log("User Service:  Tenant:  " + tenant + ",  Role:  " + role);

        request.send(JSON.stringify({ "Tenant": +tenant, "UserID": UserID, "IsAdmin": admin, "FirstName": FirstName, "LastName": LastName, "SelectedRole": role }));

        if (request.response === 'success') {
            return true;
        }
        return false;
    }
}