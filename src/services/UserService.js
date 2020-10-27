import ApiEndpointConfig from '../izenda-helpers/ApiEndpointConfig';

export class UserService {
    async LoadUsers(tenant) {
        try {
            const url = ApiEndpointConfig.getPath('izendaAPI') + '/user/all' + (tenant === undefined ? '' : '/' + tenant.id);
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'access_token': localStorage.getItem('izendatoken'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
            let json = await response.json();
            if (response.status === 200) {
                return json;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error)
            return false;
        }
    }

    async CreateUser(tenantName, role, userId, isAdmin, firstName, lastName) {
        try {
            let response = await fetch(ApiEndpointConfig.getPath('createuser'), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('tokenKey')
                },
                body: JSON.stringify({
                    Tenant: tenantName,
                    UserId: userId,
                    IsAdmin: isAdmin,
                    FirstName: firstName,
                    LastName: lastName,
                    SelectedRole: role
                })
            });
            let json = await response.json();
            if (response.status === 200) {
                return json;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error)
            return false;
        }
    }
}
