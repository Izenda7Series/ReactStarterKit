﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi2StarterKit.IzendaBoundary.Models;
using WebApi2StarterKit.Models;

namespace WebApi2StarterKit.IzendaBoundary
{
    public static class IzendaUtilities
    {
        public static Tenant GetTenantByName(string name)
        {
            using (var context = ApplicationDbContext.Create())
            {
                var tenant = context.Tenants.Where(x => x.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase)).SingleOrDefault();

                return tenant;
            }
        }

        public static async Task<Tenant> SaveTenantAsync(Tenant tenant)
        {
            using (var context = ApplicationDbContext.Create())
            {
                context.Tenants.Add(tenant);
                await context.SaveChangesAsync();

                return tenant;
            }
        }

        public static async Task CreateTenant(string tenantName, string authToken)
        {
            var existingTenant = await GetIzendaTenantByName(tenantName, authToken);
            if (existingTenant != null)
                return;

            var tenantDetail = new TenantDetail
            {
                Active = true,
                Disable = false,
                Name = tenantName,
                TenantId = tenantName
            };

            await WebApiService.Instance.PostAsync("tenant", tenantDetail, authToken);
        }

        /// <summary>
        /// Create a tenant
        /// For more information, please refer to https://www.izenda.com/docs/ref/api_tenant.html#tenant-apis
        /// </summary>
        public static async Task<bool> CreateTenant(string tenantName, string tenantId, string authToken)
        {
            var existingTenant = await GetIzendaTenantByName(tenantId, authToken);
            if (existingTenant != null)
                return false;

            var tenantDetail = new TenantDetail
            {
                Active = true,
                Disable = false,
                Name = tenantName,
                TenantId = tenantId
            };

            // For more information, please refer to https://www.izenda.com/docs/ref/api_tenant.html#post-tenant
            return await WebApiService.Instance.PostReturnBooleanAsync("tenant", tenantDetail, authToken);
        }

        public static async Task<RoleDetail> CreateRole(string roleName, TenantDetail izendaTenant, string authToken)
        {
            var role = await GetIzendaRoleByTenantAndName(izendaTenant != null ? (Guid?)izendaTenant.Id : null, roleName, authToken);
            if (role == null)
            {
                role = new RoleDetail
                {
                    Active = true,
                    Deleted = false,
                    NotAllowSharing = false,
                    Name = roleName,
                    TenantId = izendaTenant != null ? (Guid?)izendaTenant.Id : null
                };

                var response = await WebApiService.Instance.PostReturnValueAsync<AddRoleResponeMessage, RoleDetail>("role", role, authToken);
                role = response.Role;
            }

            return role;
        }

        /// <summary>
        /// Adds the user to the Izenda database
        /// See the link below for more details
        /// https://www.izenda.com/docs/ref/api_user.html?highlight=user%20integration#post-user-integration-saveuser
        /// 
        /// </summary>
        /// <param name="appUser">the application user</param>
        /// <param name="roleId">the role id</param>
        /// <param name="authToken">the authentication token</param>
        /// <returns>true if the operation was successful, false otherwise</returns>

        public static async Task<bool> CreateIzendaUser(WebApi2StarterKit.Models.ApplicationUser appUser, string roleName, string authToken)
        {
            var izendaTenant = appUser.Tenant != null ? await GetIzendaTenantByName(appUser.Tenant.Name, authToken) : null;

            var izendaUser = new UserDetail
            {
                FirstName = izendaTenant != null ? izendaTenant.Name : string.Empty,
                LastName = appUser.UserName.Split('@')[0],
                Username = appUser.UserName,
                TenantDisplayId = izendaTenant != null ? izendaTenant.Name : string.Empty,
                TenantId = izendaTenant != null ? (Guid?)izendaTenant.Id : null,
                InitPassword = true,
                Active = true
            };

            if (!string.IsNullOrWhiteSpace(roleName))
            {
                var izendaRole = await CreateRole(roleName, izendaTenant, authToken);
                izendaUser.Roles.Add(izendaRole);
            }

            bool success = await WebApiService.Instance.PostReturnValueAsync<bool, UserDetail>("user/integration/saveUser", izendaUser, authToken);

            return success;
        }

        [Obsolete("This method is deprecated, please use CreateIzendaUser instead")]
        public static async Task<UserDetail> CreateUser(WebApi2StarterKit.Models.ApplicationUser hostingUser, string roleName, string authToken)
        {
            var izendaTenant = hostingUser.Tenant != null ? await GetIzendaTenantByName(hostingUser.Tenant.Name, authToken) : null;

            var izendaUser = new UserDetail
            {
                FirstName = izendaTenant != null ? izendaTenant.Name : "Admin",
                LastName = hostingUser.UserName.Split('@')[0],
                Username = hostingUser.UserName,
                TenantDisplayId = izendaTenant != null ? izendaTenant.Name : string.Empty,
                TenantId = izendaTenant != null ? (Guid?)izendaTenant.Id : null
            };

            if (!string.IsNullOrWhiteSpace(roleName))
            {
                var izendaRole = await CreateRole(roleName, izendaTenant, authToken);
                izendaUser.Roles.Add(izendaRole);
            }

            izendaUser = await WebApiService.Instance.PostReturnValueAsync<UserDetail, UserDetail>("user", izendaUser, authToken);

            return izendaUser;
        }

        private static async Task<RoleDetail> GetIzendaRoleByTenantAndName(Guid? tenantId, string roleName, string authToken)
        {
            var roles = await WebApiService.Instance.GetAsync<IList<RoleDetail>>("/role/all/" + (tenantId.HasValue ? tenantId.ToString() : null), authToken);

            if (roles != null)
                return roles.FirstOrDefault(r => r.Name.Equals(roleName, StringComparison.InvariantCultureIgnoreCase));

            return null;
        }

        private static async Task<TenantDetail> GetIzendaTenantByName(string tenantName, string authToken)
        {
            var tenants = await WebApiService.Instance.GetAsync<IList<TenantDetail>>("/tenant/allTenants", authToken);
            if (tenants != null)
                return tenants.FirstOrDefault(x => x.Name.Equals(tenantName, StringComparison.InvariantCultureIgnoreCase));

            return null;
        }
    }
}