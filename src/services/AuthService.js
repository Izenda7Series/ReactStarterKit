import ApiEndpointConfig from '../izenda-helpers/ApiEndpointConfig';
export class AuthService {
    constructor() {
        this.state = {
            data: null,
        };
        // set token if saved in local storage
        this.token = localStorage.getItem('tokenKey');
    }

    login(tenant, username, password) {
        const body = {
            'grant_type': 'password',
            'username': username,
            'password': password
        }

        let formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formBody
        };
        const url = ApiEndpointConfig.getPath('login');

        return fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                const token = data && data['access_token'];
                console.log('Integrated Access Token ' + token);
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', username);
                    localStorage.setItem('tokenKey', token);
                    this.getIzendaToken(token);

                    // TODO
                    // Notify if authenticated
                    return true;
                } else {
                    return false;
                }
            }).catch((error) => {
                console.log('ERROR LOGGING IN');
                console.log(error);
            });
    }

    logout() {
        const url = ApiEndpointConfig.getPath('logout');
        const token = localStorage.getItem('tokenKey');

        let headers = {};
        if (token) {
            headers = { 'Authorization': 'Bearer ' + token };
        }
        const requestOptions = {
            method: 'POST',
            headers: headers
        };

        return fetch(url, requestOptions)
            .then(() => {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('tokenKey');
                localStorage.removeItem('izendatoken');

                // TODO
                // Will need to notify if not authenticated
            }).catch((error) => {
                console.log('ERROR LOGGING OUT');
                console.log(error);
            });

    }

    getIzendaToken(token) {
        const url = ApiEndpointConfig.getPath('getizendatoken');
        const headers = { 'Authorization': 'Bearer ' + token };
        const requestOptions = {
            method: 'GET',
            headers: headers
        }

        return fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                const tokenValue = data;
                console.log('Izenda token: ' + tokenValue);
                localStorage.setItem('izendatoken', tokenValue);
            })
            .catch((error) => {
                console.log('CANNOT GET IZENDA TOKEN');
                console.log(error);
            });
    }

    hasToken() {
        return !!localStorage.getItem('tokenKey');
    }
}

export default AuthService;