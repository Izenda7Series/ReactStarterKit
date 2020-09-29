export default class ApiEndpointConfig {
    static getPath(value) {
        const apiEndPoint = 'http://localhost:3358/';
        switch (value) {
            case 'register':
                return apiEndPoint + 'api/Account/Register';
            case 'login':
                return apiEndPoint + 'Token';
            case 'logout':
                return apiEndPoint + 'api/Account/Logout';
            case 'getizendatoken':
                return apiEndPoint + 'api/User/GenerateToken';
            case 'createtenant':
                return apiEndPoint + 'api/Account/CreateTenant';
            case 'createexternaluser':
                return apiEndPoint + 'api/external/user';
            default:
                return '';
        }
    }
}

