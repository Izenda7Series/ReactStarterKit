import ApiEndpointConfig from '../izenda-helpers/ApiEndpointConfig';

export class UserService {
    createUser2(UserID, FirstName, LastName, tenant, role, admin) {
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
