
# Beyond Identity API Typescript SDK

## Overview
# Introduction

The Beyond Identity API defines methods for managing realms, directories,
credentials, and applications.

All of the functionality available in the Beyond Identity Admin Console is
also available through the API.

This API is currently in the early-access stage and is under active
development. Feedback and suggestions are encouraged and should be directed
to the
[Beyond Identity Developer Slack Channel](https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ).

# Authentication

All Beyond Identity API endpoints require authentication using an access
token. The access token is generated through OAuth 2.0 or OIDC, using the
authorization code flow or the client credentials flow. The simplest way to
acquire an access token is through the Beyond Identity Admin Console. Under
the "Applications" tab, select the "Beyond Identity Management API"
application, navigate to the "API Tokens" tab, and then click on
"Create token".

Alternatively, an access token may also be generated directly via the API by
requesting a token for the "Beyond Identity Management API" Application.

```
curl https://auth-us.beyondidentity.com/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$APPLICATION_ID/token \
  -X POST \
  -u "$CLIENT_ID:$CLIENT_SECRET" --basic \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&scope=$SCOPES"
```

This will work for any application that you have configured to provide
access to the Beyond Identity Management API Resource Server. The "Beyond
Identity Management API" application is provided by default as part of the
tenant onboarding process.

The access token must be provided in the `Authorization` header of the
API request.

```
curl https://api-us.beyondidentity.com/v1/... \
  -X $HTTP_METHOD -H "Authorization: Bearer $TOKEN"
```

## Requests and Responses

To interact with the Beyond Identity API, all requests should be made over
HTTPS.

The Beyond Identity API is generally structured as a resource-oriented API.
Resources are represented as JSON objects and are used as both inputs to
and outputs from API methods.

Resource fields may be described as read-only and immutable. A read-only
field is only provided on the response. An immutable field is only assigned
once and may not be changed after. For example, system-generated IDs are
described as both read-only and immutable.

To create a new resource, requests should use the `POST` method. Create
requests include all of the necessary attributes to create a new resource.
Create operations return the created resource in the response.

To retrieve a single resource or a collection of resources, requests should
use the `GET` method. When retrieving a collection of resources, the
response will include an array of JSON objects keyed on the plural name of
the requested resource.

To update an resource, requests should use the `PATCH` method. Update
operations support partial updating so requests may specify only the
attributes which should be updated. Update operations return the updated
resource in the response.

To delete a resource, requests should use the `DELETE` method. Note that
delete operations return an empty response instead of returning the
resource in the response.

### Example Response for a Realm

```
{
  "id": "a448fe493e02fa9f",
  "tenant_id": "000168dc50bdce49",
  "display_name": "Test Realm",
  "create_time": "2022-06-22T21:46:08.930278Z",
  "update_time": "2022-06-22T21:46:08.930278Z"
}
```

### Example Response for a Collection of Realms

```
{
  "realms": [
    {
      "id": "a448fe493e02fa9f",
      "tenant_id": "000168dc50bdce49",
      "display_name": "Test Realm",
      "create_time": "2022-06-22T21:46:08.930278Z",
      "update_time": "2022-06-22T21:46:08.930278Z"
    }
  ],
  "total_size": 1
}
```

## HTTP Statuses

The API returns standard HTTP statuses and error codes.

Statuses in the 200 range indicate that the request was successfully
fulfilled and there were no errors.

Statuses in the 400 range indicate that there was an issue with the request
that may be addressed by the client. For example, client errors may
indicate that the request was missing proper authorization or that the
request was malformed.

Statuses in the 500 range indicate that the server encountered an internal
issue and was unable to fulfill the request.

All error responses include a JSON object with a `code` field and a
`message` field. `code` contains a human-readable name for the HTTP status
code and `message` contains a high-level description of the error. The
error object may also contain additional error details which may be used by
the client to determine the exact cause of the error. Refer to each API
method's examples to determine the specific error detail types supported
for that method.

### Invalid Access Token Example

If the provided access token is invalid, you will receive a 401 error.
This error indicates that the token is not recognized and was not generated
by Beyond Identity.

```
HTTP/1.1 401 Unauthorized
{
  "code": "unauthorized",
  "message": "unauthorized"
}
```

### Permission Denied Example

If the provided access token does not have access to the requested resource,
you will receive a 403 error. Access tokens are scoped at a minimum to your
tenant. Any request for resources outside of your tenant will result in this
error.

```
HTTP/1.1 403 Forbidden
{
  "code": "forbidden",
  "message": "forbidden"
}
```

### Missing Resource Example

If the requested resource does not exist, you will receive a 404 error. The
specific API method may return additional details about the missing
resource.

```
HTTP/1.1 404 Not Found
{
  "code": "not_found",
  "message": "group not found"
  "details": [
    {
      "type": "ResourceInfo",
      "resource_type": "Group",
      "id": "4822738be6b7f658",
      "description": "group not found"
    }
  ],
}
```

### Invalid Parameters Example

If the request body contains invalid parameters, you will receive a 400
error. The specific API method may return additional details about the
invalid parameter.

```
HTTP/1.1 400 Bad Request
{
  "code": "bad_request",
  "message": "invalid parameters"
  "details": [
    {
      "type": "FieldViolations"
      "field_violations": [
        {
          "description": "missing",
          "field": "group.display_name"
        }
      ],
    }
  ],
}
```


## Initilization

```typescript
import Client from "@public/beyond_identity_api"

new Client({ token: process.env["API_TOKEN"]!! });
```


### Delete a Realm
> To delete a realm, send a DELETE request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID`. To be deleted, a realm must not have any identities, groups, or roles. All associated resources must first be deleted or you will receive a 409 error.
> A successful request will receive a 200 status code with no body in the response. This indicates that the request was processed successfully.
> 

```typescript
const response = await client.v1.tenants.realms.delete({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
});
```

---

### Delete an Application
> To delete an application, send a DELETE request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$APPLICATION_ID`.
> A successful request will receive a 200 status code with no body in the response. This indicates that the request was processed successfully.
> 

```typescript
const response = await client.v1.tenants.realms.applications.delete({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  applicationId: "38833c36-6f47-4992-9329-ea0a00915137",
});
```

---

### Revoke a Token
> To revoke a token, send a DELETE request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$APPLICATION_ID/tokens/$TOKEN_ID`.
> The `$APPLICATION_ID` in path corresponds to the application that is the issuer of the token.
> A successful request will receive a 200 status code with no body in the response. This indicates that the request was processed successfully.
> If the token ID is not available, the access token must be revoked via the [RFC-7009 revoke endpoint](https://developer.beyondidentity.com/docs/revoke-access-tokens).
> 

```typescript
const response = await client.v1.tenants.realms.applications.tokens.delete({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  applicationId: "38833c36-6f47-4992-9329-ea0a00915137",
  tokenId: "string",
});
```

---

### Delete an Authenticator Configuration
> To delete an authenticator configuration, send a DELETE request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs/$AUTHENTICATOR_CONFIG_ID`.
> A successful request will receive a 200 status code with no body in the response. This indicates that the request was processed successfully.
> 

```typescript
const response = await client.v1.tenants.realms.authenticatorConfigs.delete({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  authenticatorConfigId: "73731b7f-eb76-4143-9b4b-81a720385f5a",
});
```

---

### Delete a Group
> To delete a group, send a DELETE request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups/$GROUP_ID`. To be deleted, a group must not have any members. Any existing members must first be deleted or you will receive a 409 error.
> A successful request will receive a 200 status code with no body in the response. This indicates that the request was processed successfully.
> 

```typescript
const response = await client.v1.tenants.realms.groups.delete({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  groupId: "81490afab171aef0",
});
```

---

### Delete an Identity
> To delete an identity, send a DELETE request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID`. To be deleted, an identity must not be a member of any groups or roles. The identity must must first be removed from all groups and roles or you will receive a 409 error.
> A successful request will receive a 200 status code with no body in the response. This indicates that the request was processed successfully.
> 

```typescript
const response = await client.v1.tenants.realms.identities.delete({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  identityId: "e372db224c06e850",
});
```

---

### Delete a Resource Server
> To delete a resource server, send a DELETE request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID`.
> A successful request will receive a 200 status code with no body in the response. This indicates that the request was processed successfully.
> 

```typescript
const response = await client.v1.tenants.realms.resourceServers.delete({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
});
```

---

### Delete a Role
> To delete a role, send a DELETE request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID/roles/$ROLE_ID`. To be deleted, a role must not have any scopes or members. Any existing scopes and members must first be deleted or you will receive a 409 error.
> A successful request will receive a 200 status code with no body in the response. This indicates that the request was processed successfully.
> 

```typescript
const response = await client.v1.tenants.realms.resourceServers.roles.delete({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
  roleId: "fb785d40cbe4fc0d",
});
```

---

### Delete a Group
> To delete a group, send a DELETE request to `/Groups/$GROUP_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.groups.delete({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  groupId: "string",
});
```

---

### Delete a User
> To delete a user, send a DELETE request to `/Users/$USER_ID`.

```typescript
const response = await client.v1.tenants.realms.scim.v2.users.delete({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  userId: "string",
});
```

---

### Retrieve an Existing Tenant
> To retrieve an existing tenant, send a GET request to `/v1/tenants/$TENANT_ID`.
> 

```typescript
const response = await client.v1.tenants.get({ tenantId: "000176d94fd7b4d1" });
```

---

### List Realms for a Tenant
> To list all realms for a tenant, send a GET request to
> `/v1/tenants/$TENANT_ID/realms`.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of realms in the
> response. Note that the maximum and default page sizes are subject to
> change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.list({
  tenantId: "000176d94fd7b4d1",
  pageSize: 123,
  pageToken: "string",
  skip: 123,
});
```

---

### Retrieve an Existing Realm
> To retrieve an existing realm, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.get({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
});
```

---

### List Applications for a Realm
> To list all applications for a realm, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications`.
> 
> The response will contain at most 100 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 100 items. There is no defined ordering of the list of applications
> in the response.  Note that the maximum and default page sizes are subject
> to change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.applications.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  pageSize: 123,
  pageToken: "string",
});
```

---

### Retrieve an Existing Application
> To retrieve an existing application, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$APPLICATION_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.applications.get({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  applicationId: "38833c36-6f47-4992-9329-ea0a00915137",
});
```

---

### List Tokens
> To list all tokens issued by an application, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$APPLICATION_ID/tokens`.
> The `$APPLICATION_ID` in path corresponds to the application that is the issuer of the token.
> To filter the list of tokens by a principal, set `principal_type` and `principal_id`. These parameters are optional.
> The response will contain at most 100 items and may contain a page token to query the remaining items. If page size is not specified, the response will contain 100 items. There is no defined ordering of the list of tokens in the response.  Note that the maximum and default page sizes are subject to change.
> When paginating, the page size is maintained by the page token but may be overridden on subsequent requests. The skip is not maintained by the page token and must be specified on each subsequent request.
> Page tokens expire after one week. Requests which specify an expired page token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.applications.tokens.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  applicationId: "38833c36-6f47-4992-9329-ea0a00915137",
  principalId: "string",
  principalType: "string",
});
```

---

### List Authenticator Configurations for a Realm
> To list all authenticator configurations for a realm, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs`.
> 
> The response will contain at most 100 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 100 items. There is no defined ordering of the list of authenticator
> configurations in the response. Note that the maximum and default page sizes
> are subject to change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.authenticatorConfigs.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  pageSize: 123,
  pageToken: "string",
});
```

---

### Retrieve an Existing Authenticator Configuration
> To retrieve an existing authenticator configuration, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs/$AUTHENTICATOR_CONFIG_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.authenticatorConfigs.get({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  authenticatorConfigId: "73731b7f-eb76-4143-9b4b-81a720385f5a",
});
```

---

### List Groups for a Realm
> To list all groups for a realm, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups`.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of groups in the
> response. Note that the maximum and default page sizes are subject to
> change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.groups.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  pageSize: 123,
  pageToken: "string",
  skip: 123,
});
```

---

### Retrieve an Existing Group
> To retrieve an existing group, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups/$GROUP_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.groups.get({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  groupId: "81490afab171aef0",
});
```

---

### List Members for a Group
> To list members belonging to a group, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups/$GROUP_ID:listMembers`.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of members in the
> response. Note that the maximum and default page sizes are subject to
> change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.groups.listMembers.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  groupId: "81490afab171aef0",
  pageSize: 123,
  pageToken: "string",
  skip: 123,
});
```

---

### List Role Memberships for a Group
> To list the roles to which a group is assigned, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups/$GROUP_ID:listRoles`.
> 
> The request must include the `resource_server_id` query parameter specifying
> the resource server on which to filter the roles. If the specified resource
> server does not exist, you will receive a 409 error.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of roles in the
> response. Note that the maximum and default page sizes are subject to
> change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.groups.listRoles.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  groupId: "81490afab171aef0",
  pageSize: 123,
  pageToken: "string",
  resourceServerId: "string",
  skip: 123,
});
```

---

### List Identities for a Realm
> To list identities for a realm, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities`.
> 
> The response will only contain identities matching the filter in the
> request. If no filter is provided, the request will match all identities in
> the realm. Currently, the only supported filter is
> `traits.username eq "$USERNAME"`.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of identities in
> the response. Note that the maximum and default page sizes are subject to
> change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The filter is also maintained by the page
> token but it may not be overridden. If specified, the request filter must
> match the filter maintained by the page token, otherwise you will receive a
> 400 error. The skip is not maintained by the page token and must be
> specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.identities.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  filter: "string",
  pageSize: 123,
  pageToken: "string",
  skip: 123,
});
```

---

### Retrieve an Existing Identity
> To retrieve an existing identity, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.identities.get({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  identityId: "e372db224c06e850",
});
```

---

### List Credential Binding Jobs for an Identity
> To list all credential binding jobs for an identity, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID/credential-binding-jobs`.
> `$IDENTITY_ID` may be a wildcard (`-`) to request all credential binding
> jobs across all identities within the realm.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of credential
> binding jobs in the response. Note that the maximum and default page sizes
> are subject to change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response =
  await client.v1.tenants.realms.identities.credentialBindingJobs.list({
    tenantId: "000176d94fd7b4d1",
    realmId: "19a95130480dfa79",
    identityId: "e372db224c06e850",
    pageSize: 123,
    pageToken: "string",
    skip: 123,
  });
```

---

### Retrieve an Existing Credential Binding Job
> To retrieve an existing credential binding job, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID`/credential-binding-jobs/$CREDENTIAL_BINDING_JOB_ID`.
> 

```typescript
const response =
  await client.v1.tenants.realms.identities.credentialBindingJobs.get({
    tenantId: "000176d94fd7b4d1",
    realmId: "19a95130480dfa79",
    identityId: "e372db224c06e850",
    credentialBindingJobId: "5c4137af5e70413a",
  });
```

---

### List Credentials for an Identity
> To list all credentials for an identity, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID/credentials`.
> `$IDENTITY_ID` may be a wildcard (`-`) to request all credentials across all
> identities within the realm.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of credentials in
> the response. Note that the maximum and default page sizes are subject to
> change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.identities.credentials.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  identityId: "e372db224c06e850",
  pageSize: 123,
  pageToken: "string",
  skip: 123,
});
```

---

### Retrieve an Existing Credential
> To retrieve an existing credential, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID/credentials/$CREDENTIAL_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.identities.credentials.get({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  identityId: "e372db224c06e850",
  credentialId: "b5a31610800dda18",
});
```

---

### List Group Memberships for an Identity
> To list the groups to which an identity belongs, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID:listGroups`.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of groups in the
> response. Note that the maximum and default page sizes are subject to
> change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.identities.listGroups.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  identityId: "e372db224c06e850",
  pageSize: 123,
  pageToken: "string",
  skip: 123,
});
```

---

### List Role Memberships for an Identity
> To list the roles to which an identity is assigned, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID:listRoles`.
> 
> The request must include the `resource_server_id` query parameter specifying
> the resource server on which to filter the roles. If the specified resource
> server does not exist, you will receive a 409 error.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of roles in the
> response. Note that the maximum and default page sizes are subject to
> change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.identities.listRoles.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  identityId: "e372db224c06e850",
  pageSize: 123,
  pageToken: "string",
  resourceServerId: "string",
  skip: 123,
});
```

---

### List Resource Servers For a Realm
> To list all resource servers for a realm, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers`.
> 
> The response will contain at most 100 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 100 items. There is no defined ordering of the list of resource
> servers in the response.  Note that the maximum and default page sizes are
> subject to change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.resourceServers.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  pageSize: 123,
  pageToken: "string",
});
```

---

### Retrieve an Existing Resource Server
> To retrieve an existing resource server, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.resourceServers.get({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
});
```

---

### List Roles for a Resource Server
> To list all roles for a resource server, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID/roles`.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of roles in the
> response. Note that the maximum and default page sizes are subject to
> change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response = await client.v1.tenants.realms.resourceServers.roles.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
  pageSize: 123,
  pageToken: "string",
  skip: 123,
});
```

---

### Retrieve an Existing Role
> To retrieve an existing role, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID/roles/$ROLE_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.resourceServers.roles.get({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
  roleId: "fb785d40cbe4fc0d",
});
```

---

### List Members for a Role
> To list members assigned to a role, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID/roles/$ROLE_ID:listMembers`.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of members in the
> response. Note that the maximum and default page sizes are subject to
> change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response =
  await client.v1.tenants.realms.resourceServers.roles.listMembers.list({
    tenantId: "000176d94fd7b4d1",
    realmId: "19a95130480dfa79",
    resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
    roleId: "fb785d40cbe4fc0d",
    groupsPageSize: 123,
    groupsSkip: 123,
    identitiesPageSize: 123,
    identitiesSkip: 123,
    pageToken: "string",
  });
```

---

### List Scopes for a Role
> To list scopes assigned to a role, send a GET request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID/roles/$ROLE_ID:listScopes`.
> 
> The response will contain at most 200 items and may contain a page token to
> query the remaining items. If page size is not specified, the response will
> contain 20 items. There is no defined ordering of the list of scopes in the
> response. Note that the maximum and default page sizes are subject to
> change.
> 
> When paginating, the page size is maintained by the page token but may be
> overridden on subsequent requests. The skip is not maintained by the page
> token and must be specified on each subsequent request.
> 
> Page tokens expire after one week. Requests which specify an expired page
> token will result in undefined behavior.
> 

```typescript
const response =
  await client.v1.tenants.realms.resourceServers.roles.listScopes.list({
    tenantId: "000176d94fd7b4d1",
    realmId: "19a95130480dfa79",
    resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
    roleId: "fb785d40cbe4fc0d",
    pageSize: 123,
    pageToken: "string",
    skip: 123,
  });
```

---

### List All Groups
> To list all groups, send a GET request to `/Groups`.
> 
> Currently, filtering on groups only supports the `eq` and `ne` operators
> and the `displayName` attribute.
> 
> The response will contain at most 1000 items. If count is not specified or
> is zero, the response will not contain any resources. There is no defined
> ordering of the list of groups in the response. Note that the maximum page
> size is subject to change.
> 
> Members will not be returned with the group.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.groups.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  count: 123,
  filter: "string",
  startIndex: 123,
});
```

---

### Retrieve an existing group
> To retrieve an existing group, send a GET request to `/Groups/$GROUP_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.groups.get({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  groupId: "string",
});
```

---

### List All Resource Types
> To list all supported resource types, send a GET request to
> `/ResourceTypes`.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.resourceTypes.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
});
```

---

### List All Schemas
> To list all supported resource schemas, send a GET request to `/Schemas`.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.schemas.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
});
```

---

### Retrieve the Service Provider Configuration
> To retrieve the service provider configuration, send a GET request to `/ServiceProviderConfig`.
> 

```typescript
const response =
  await client.v1.tenants.realms.scim.v2.serviceProviderConfig.list({
    tenantId: "000176d94fd7b4d1",
    realmId: "19a95130480dfa79",
  });
```

---

### List All Users
> To list all users, send a GET request to `/Users`.
> 
> Currently, filtering on users only supports the `eq` and `ne` operators and
> the `userName` and `externalId` attributes.
> 
> The response will contain at most 1000 items. If count is not specified or
> is zero, the response will not contain any resources. There is no defined
> ordering of the list of users in the response. Note that the maximum page
> size is subject to change.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.users.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  count: 123,
  filter: "string",
  startIndex: 123,
});
```

---

### Retrieve an Existing User
> To retrieve an existing user, send a GET request to `/Users/$USER_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.users.get({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  userId: "string",
});
```

---

### Get the Active Theme
> To retrieve the active theme for a realm, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/themes/active`. If the realm has not specified the active theme, a default theme will be returned.
> 

```typescript
const response = await client.v1.tenants.realms.themes.active.list({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
});
```

---

### Retrive an Existing Theme
> To retrieve an existing theme, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/themes/$THEME_ID`.
> 

```typescript
const response = await client.v1.tenants.realms.themes.get({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  themeId: "88ef08fb-c3f9-44e2-b174-fbb239e1dc47",
});
```

---

### Patch a Tenant
> To update only specific attributes of an existing tenant, send a PATCH request to `/v1/tenants/$TENANT_ID`. Values in the request body for immutable or read-only fields will be ignored. Fields that are omitted from the request body will be left unchanged.
> 

```typescript
const response = await client.v1.tenants.patch({
  tenantId: "000176d94fd7b4d1",
  data: {
    tenant: {
      create_time: "2022-01-28T12:00:02.423Z",
      display_name: "Test Tenant",
      id: "000176d94fd7b4d1",
      update_time: "2022-04-19T15:17:21.186Z",
    },
  },
});
```

---

### Patch a Realm
> To update only specific attributes of an existing realm, send a PATCH request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID`. Values in the request body for immutable or read-only fields will be ignored. Fields that are omitted from the request body will be left unchanged.
> 

```typescript
const response = await client.v1.tenants.realms.patch({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  data: {
    realm: {
      create_time: "2022-05-18T18:00:01.167Z",
      display_name: "Test Realm",
      id: "19a95130480dfa79",
      tenant_id: "0001f1f460b1ace6",
      update_time: "2022-05-19T14:23:01.327Z",
    },
  },
});
```

---

### Patch an Application
> To update only specific attributes of an existing application, send a PATCH request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications/$APPLICATION_ID`. Values in the request body for immutable or read-only fields will be ignored. Fields that are omitted from the request body will be left unchanged.
> 

```typescript
import * as types from "@public/beyond_identity_api/types"

const response = await client.v1.tenants.realms.applications.patch({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  applicationId: "38833c36-6f47-4992-9329-ea0a00915137",
  data: {
    application: {
      authenticator_config_id: "73731b7f-eb76-4143-9b4b-81a720385f5a",
      display_name: "Pet Application",
      id: "38833c36-6f47-4992-9329-ea0a00915137",
      is_managed: false,
      protocol_config: {
        allowed_scopes: ["pets:read"],
        client_id: "AYYNcuOSpfqIf33JeegCzDIT",
        client_secret: "wWD4mPzdsjms1LPekQSo0v9scOHLWy5wmMtKAR2JNhJPAKXv",
        confidentiality: types.ConfidentialityEnum.Confidential,
        grant_type: [types.GrantTypeItemEnum.AuthorizationCode],
        pkce: types.PkceConfigEnum.S256,
        redirect_uris: ["https://auth.mypetapp.com/callback"],
        token_configuration: {
          expires_after: 86400,
          subject_field: types.TokenConfigurationSubjectFieldEnum.Id,
          token_signing_algorithm:
            types.TokenConfigurationTokenSigningAlgorithmEnum.Rs256,
        },
        token_endpoint_auth_method:
          types.TokenEndpointAuthMethodEnum.ClientSecretBasic,
        token_format: types.Obj0TokenFormatEnum.SelfContained,
        type: types.Obj0TypeEnum.Oauth2,
      },
      realm_id: "caf2ff640497591a",
      resource_server_id: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
      tenant_id: "00011f1183c67b69",
    },
  },
});
```

---

### Patch an Authenticator Configuration
> To update only specific attributes of an existing authenticator configuration, send a PATCH request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs/$AUTHENTICATOR_CONFIG_ID`. Values in the request body for immutable or read-only fields will be ignored. Fields that are omitted from the request body will be left unchanged.
> 

```typescript
import * as types from "@public/beyond_identity_api/types"

const response = await client.v1.tenants.realms.authenticatorConfigs.patch({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  authenticatorConfigId: "73731b7f-eb76-4143-9b4b-81a720385f5a",
  data: {
    authenticator_config: {
      config: {
        authentication_methods: [
          {
            type: types.Obj0AuthenticationMethodsItemTypeEnum
              .EmailOneTimePassword,
          },
        ],
        invocation_type: types.Obj0InvocationTypeEnum.Automatic,
        invoke_url: "http://localhost:8092",
        trusted_origins: ["http://localhost:8092"],
        type: types.Obj0TypeEnum1.Embedded,
      },
      display_name: "Pet Authenticator Configuration",
      id: "73731b7f-eb76-4143-9b4b-81a720385f5a",
      realm_id: "caf2ff640497591a",
      tenant_id: "00011f1183c67b69",
    },
  },
});
```

---

### Patch a Group
> To update only specific attributes of an existing group, send a PATCH request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups/$GROUP_ID`. Values in the request body for immutable or read-only fields will be ignored. Fields that are omitted from the request body will be left unchanged.
> 

```typescript
const response = await client.v1.tenants.realms.groups.patch({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  groupId: "81490afab171aef0",
  data: {
    group: {
      create_time: "2022-03-14T03:42:52.905Z",
      description: "A group of realm administrators.",
      display_name: "Realm Administrators",
      id: "81490afab171aef0",
      realm_id: "7df92e4a38ba0993",
      tenant_id: "0001b42d80372976",
      update_time: "2022-06-14T05:55:23.823Z",
    },
  },
});
```

---

### Patch an Identity
> To update only specific attributes of an existing identity, send a PATCH request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID`. Values in the request body for immutable or read-only fields will be ignored. Fields that are omitted from the request body will be left unchanged.
> If the request conflicts with an existing resource, you will receive a 409 error.
> 

```typescript
const response = await client.v1.tenants.realms.identities.patch({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  identityId: "e372db224c06e850",
  data: {
    identity: {
      create_time: "2022-04-12T05:53:07.119Z",
      display_name: "Test Identity",
      id: "e372db224c06e850",
      realm_id: "8f5bec58229e6f29",
      status: "active",
      tenant_id: "0001f1f460b1ace6",
      traits: {
        external_id: "string",
        family_name: "string",
        given_name: "string",
        primary_email_address: "test@example.com",
        type: "traits_v0",
        username: "test",
      },
      update_time: "2022-06-16T14:31:03.770Z",
    },
  },
});
```

---

### Patch a Resource Server
> To update only specific attributes of an existing resource server, send a a
> PATCH request to
> `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID`.
> Values in the request body for immutable or read-only fields will be
> ignored. Fields that are omitted from the request body will be left
> unchanged.
> 
> Scopes that are removed from a resource server will be asynchronously
> removed from all roles associated with the resource server.
> 

```typescript
const response = await client.v1.tenants.realms.resourceServers.patch({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
  data: {
    resource_server: {
      display_name: "Pet API",
      id: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
      identifier: "https://api.mypetapp.com",
      is_managed: false,
      realm_id: "caf2ff640497591a",
      scopes: ["pets:read"],
      tenant_id: "00011f1183c67b69",
    },
  },
});
```

---

### Patch a Role
> To update only specific attributes of an existing role, send a PATCH request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID/roles/$ROLE_ID`. Values in the request body for immutable or read-only fields will be ignored. Fields that are omitted from the request body will be left unchanged.
> 

```typescript
const response = await client.v1.tenants.realms.resourceServers.roles.patch({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
  roleId: "fb785d40cbe4fc0d",
  data: {
    role: {
      create_time: "2023-02-14T18:18:58.332Z",
      description: "Customer support personnel.",
      display_name: "Help Desk",
      id: "fb785d40cbe4fc0d",
      realm_id: "bb26e0e8ecdef843",
      resource_server_id: "7b5a4325-00e0-4379-bd7b-3e5e7e30b09e",
      tenant_id: "00010036778ce59f",
      update_time: "2023-02-14T18:18:58.332Z",
    },
  },
});
```

---

### Patch a Group
> To update only specific attributes of an existing group, send a PATCH
> request to `/Groups/$GROUP_ID`. Values in the request body for immutable or
> read-only fields will be ignored. Fields that are omitted from the request
> body will be left unchanged.
> 
> Note that the Beyond Identity SCIM server currently does not support atomic
> PATCH operations. If a request contains multiple operations, the request
> may be partially applied.
> 
> The Beyond Identity SCIM server also does not support modifying both a
> group and its membership in the same operation. For example, a PATCH
> request to update a group's display name and its membership should specify
> two separate operations, one to update the display name and the other to
> modify the membership.
> 
> Currently, "replace" operations are supported for displayName while "add"
> and "remove" operations are supported for members. Multiple members may be
> added at a time, but batch remove is not supported. Note that while member
> changes will take affect, they will not be reflected in the response
> as members are not currently returned with groups.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.groups.patch({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  groupId: "string",
  data: {
    group: {
      displayName: "Help Desk",
      id: "ed9fcce6-ec82-458e-ae58-e2d975cfc32d",
      meta: {
        created: "2022-04-07T07:23:33.000Z",
        lastModified: "2023-03-30T07:00:14.000Z",
        location: "Groups/ed9fcce6-ec82-458e-ae58-e2d975cfc32d",
        resourceType: "Group",
        version: "W/0",
      },
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    },
  },
});
```

---

### Patch a User
> To update only specific attributes of an existing user, send a PATCH
> request to `/Users/$USER_ID`. Values in the request body for immutable or
> read-only fields will be ignored. Fields that are omitted from the request
> body will be left unchanged.
> 
> Note that the Beyond Identity SCIM server currently does not support atomic
> PATCH operations. If a request contains multiple operations, the request
> may be partially applied.
> 
> Currently, only "add" and "replace" operations are supported for users.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.users.patch({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  userId: "string",
  data: {
    user: {
      active: true,
      displayName: "Test User",
      emails: [{ primary: true, value: "test@test.com" }],
      externalId: "external-id-abcdef",
      id: "ed9fcce6-ec82-458e-ae58-e2d975cfc32d",
      meta: {
        created: "2022-04-07T07:23:33.000Z",
        lastModified: "2023-03-30T07:00:14.000Z",
        location: "Groups/ed9fcce6-ec82-458e-ae58-e2d975cfc32d",
        resourceType: "Group",
        version: "W/0",
      },
      name: { familyName: "Jensen", givenName: "Barbara" },
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      userName: "test_user",
    },
  },
});
```

---

### Patch a Theme
> To update only specific attributes of an existing theme, send a PATCH request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/themes/$THEME_ID`. Values in the request body for immutable or read-only fields will be ignored. Fields that are omitted from the request body will be left unchanged.
> 

```typescript
const response = await client.v1.tenants.realms.themes.patch({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  themeId: "88ef08fb-c3f9-44e2-b174-fbb239e1dc47",
  data: {
    theme: {
      button_color: "#4673D3",
      button_text_color: "#FFFFFF",
      create_time: "2022-07-28T18:00:00.000Z",
      email_realm_name: "Realm Administrators",
      id: "88ef08fb-c3f9-44e2-b174-fbb239e1dc47",
      logo_url_dark: "https://example.com/logo_url_dark.png",
      logo_url_light: "https://example.com/logo_url_light.png",
      realm_id: "7df92e4a38ba0993",
      support_url: "https://example.com/support",
      tenant_id: "0001b42d80372976",
      update_time: "2022-07-30T16:00:00.000Z",
    },
  },
});
```

---

### Create a New Realm
> To create a realm, send a POST request to `/v1/tenants/$TENANT_ID/realms`. Values in the request body for read-only fields will be ignored.
> 

```typescript
const response = await client.v1.tenants.realms.create({
  tenantId: "000176d94fd7b4d1",
  data: {
    realm: {
      create_time: "2022-05-18T18:00:01.167Z",
      display_name: "Test Realm",
      id: "19a95130480dfa79",
      tenant_id: "0001f1f460b1ace6",
      update_time: "2022-05-19T14:23:01.327Z",
    },
  },
});
```

---

### Create a New Application
> To create an application, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/applications`. Values in the request body for read-only fields will be ignored.
> At present, there are only two supported protocol types for applications, `oauth2` and `oidc`.
> 

```typescript
import * as types from "@public/beyond_identity_api/types"

const response = await client.v1.tenants.realms.applications.create({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  data: {
    application: {
      authenticator_config_id: "73731b7f-eb76-4143-9b4b-81a720385f5a",
      display_name: "Pet Application",
      id: "38833c36-6f47-4992-9329-ea0a00915137",
      is_managed: false,
      protocol_config: {
        allowed_scopes: ["pets:read"],
        client_id: "AYYNcuOSpfqIf33JeegCzDIT",
        client_secret: "wWD4mPzdsjms1LPekQSo0v9scOHLWy5wmMtKAR2JNhJPAKXv",
        confidentiality: types.ConfidentialityEnum.Confidential,
        grant_type: [types.GrantTypeItemEnum.AuthorizationCode],
        pkce: types.PkceConfigEnum.S256,
        redirect_uris: ["https://auth.mypetapp.com/callback"],
        token_configuration: {
          expires_after: 86400,
          subject_field: types.TokenConfigurationSubjectFieldEnum.Id,
          token_signing_algorithm:
            types.TokenConfigurationTokenSigningAlgorithmEnum.Rs256,
        },
        token_endpoint_auth_method:
          types.TokenEndpointAuthMethodEnum.ClientSecretBasic,
        token_format: types.Obj0TokenFormatEnum.SelfContained,
        type: types.Obj0TypeEnum.Oauth2,
      },
      realm_id: "caf2ff640497591a",
      resource_server_id: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
      tenant_id: "00011f1183c67b69",
    },
  },
});
```

---

### Create a New Authenticator Configuration
> To create an authenticator configuration, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs`. Values in the request body for read-only fields will be ignored.
> 

```typescript
import * as types from "@public/beyond_identity_api/types"

const response = await client.v1.tenants.realms.authenticatorConfigs.create({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  data: {
    authenticator_config: {
      config: {
        authentication_methods: [
          {
            type: types.Obj0AuthenticationMethodsItemTypeEnum
              .EmailOneTimePassword,
          },
        ],
        invocation_type: types.Obj0InvocationTypeEnum.Automatic,
        invoke_url: "http://localhost:8092",
        trusted_origins: ["http://localhost:8092"],
        type: types.Obj0TypeEnum1.Embedded,
      },
      display_name: "Pet Authenticator Configuration",
      id: "73731b7f-eb76-4143-9b4b-81a720385f5a",
      realm_id: "caf2ff640497591a",
      tenant_id: "00011f1183c67b69",
    },
  },
});
```

---

### Create a New Group
> To create a group, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups`. Values in the request body for read-only fields will be ignored.
> 

```typescript
const response = await client.v1.tenants.realms.groups.create({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  data: {
    group: {
      create_time: "2022-03-14T03:42:52.905Z",
      description: "A group of realm administrators.",
      display_name: "Realm Administrators",
      id: "81490afab171aef0",
      realm_id: "7df92e4a38ba0993",
      tenant_id: "0001b42d80372976",
      update_time: "2022-06-14T05:55:23.823Z",
    },
  },
});
```

---

### Add Members to a Group
> To add members to a group, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups/$GROUP_ID:addMembers`. The request must contain at least one and no more than 1000 identity IDs.
> 

```typescript
const response = await client.v1.tenants.realms.groups.addMembers.create({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  groupId: "81490afab171aef0",
  data: { identity_ids: ["e372db224c06e850", "3a28d4f28b57cc93"] },
});
```

---

### Delete Members from a Group
> To delete members from a group, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups/$GROUP_ID:deleteMembers`. The request must contain at least one and no more than 1000 identity IDs.
> 

```typescript
const response = await client.v1.tenants.realms.groups.deleteMembers.create({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  groupId: "81490afab171aef0",
  data: { identity_ids: ["e372db224c06e850", "3a28d4f28b57cc93"] },
});
```

---

### Create a New Identity
> To create an identity, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities`. Values in the request body for read-only fields will be ignored.
> If the request conflicts with an existing resource, you will receive a 409 error.
> 

```typescript
const response = await client.v1.tenants.realms.identities.create({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  data: {
    identity: {
      create_time: "2022-04-12T05:53:07.119Z",
      display_name: "Test Identity",
      id: "e372db224c06e850",
      realm_id: "8f5bec58229e6f29",
      status: "active",
      tenant_id: "0001f1f460b1ace6",
      traits: {
        external_id: "string",
        family_name: "string",
        given_name: "string",
        primary_email_address: "test@example.com",
        type: "traits_v0",
        username: "test",
      },
      update_time: "2022-06-16T14:31:03.770Z",
    },
  },
});
```

---

### Create a New Credential Binding Job
> To create an identity, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID/credential-binding-jobs`. Values in the request body for read-only fields will be ignored.
> 

```typescript
import * as types from "@public/beyond_identity_api/types"

const response =
  await client.v1.tenants.realms.identities.credentialBindingJobs.create({
    tenantId: "000176d94fd7b4d1",
    realmId: "19a95130480dfa79",
    identityId: "e372db224c06e850",
    data: {
      job: {
        authenticator_config_id: "67bb0acf12e5c899",
        create_time: "2022-05-12T20:29:47.636Z",
        credential_id: "9802966246819b35",
        delivery_method: types.CredentialBindingJobDeliveryMethodEnum.Return,
        expire_time: "2022-05-12T20:29:47.636Z",
        id: "86b4f51481f09321",
        identity_id: "3d227b0d5949969d",
        post_binding_redirect_uri: "http://example.com/callback",
        realm_id: "9602e246c2ead9b2",
        state: types.CredentialBindingJobStateEnum.Complete,
        tenant_id: "ce5ace5fc7e14d6a",
        update_time: "2022-05-12T20:29:47.636Z",
      },
    },
  });
```

---

### Revoke a Credential
> To revoke a credential, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID/credentials/$CREDENTIAL_ID:revoke`.
> 

```typescript
const response =
  await client.v1.tenants.realms.identities.credentials.revoke.create({
    tenantId: "000176d94fd7b4d1",
    realmId: "19a95130480dfa79",
    identityId: "e372db224c06e850",
    credentialId: "b5a31610800dda18",
  });
```

---

### Create a New Resource Server
> To create a resource server, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers`. Values in the request body for read-only fields will be ignored.
> 

```typescript
const response = await client.v1.tenants.realms.resourceServers.create({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  data: {
    resource_server: {
      display_name: "Pet API",
      id: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
      identifier: "https://api.mypetapp.com",
      is_managed: false,
      realm_id: "caf2ff640497591a",
      scopes: ["pets:read", "pets:write"],
      tenant_id: "00011f1183c67b69",
    },
  },
});
```

---

### Create a New Role
> To create a role, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID/roles`. Values in the request body for read-only fields will be ignored.
> 

```typescript
const response = await client.v1.tenants.realms.resourceServers.roles.create({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
  data: {
    group: {
      create_time: "2023-02-14T18:18:58.332Z",
      description: "Customer support personnel.",
      display_name: "Help Desk",
      id: "fb785d40cbe4fc0d",
      realm_id: "bb26e0e8ecdef843",
      resource_server_id: "7b5a4325-00e0-4379-bd7b-3e5e7e30b09e",
      tenant_id: "00010036778ce59f",
      update_time: "2023-02-14T18:18:58.332Z",
    },
  },
});
```

---

### Assign Members to a Role
> To assign members to a role, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID/roles/$ROLE_ID:addMembers`. The request must contain at least one group ID or identity ID and must not contain more than 1000 group IDs or 1000 identity IDs.
> 

```typescript
const response =
  await client.v1.tenants.realms.resourceServers.roles.addMembers.create({
    tenantId: "000176d94fd7b4d1",
    realmId: "19a95130480dfa79",
    resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
    roleId: "fb785d40cbe4fc0d",
    data: {
      group_ids: ["e372db224c06e850"],
      identity_ids: ["3a28d4f28b57cc93"],
    },
  });
```

---

### Assign Scopes to a Role
> To assign scopes to a role, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID/roles/$ROLE_ID:addScopes`. The request must contain at least one and no more than 1000 scopes.
> 

```typescript
const response =
  await client.v1.tenants.realms.resourceServers.roles.addScopes.create({
    tenantId: "000176d94fd7b4d1",
    realmId: "19a95130480dfa79",
    resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
    roleId: "fb785d40cbe4fc0d",
    data: { scopes: ["identities:read"] },
  });
```

---

### Unassign Members from a Role
> To unassign members from a role, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID/roles/$ROLE_ID:deleteMembers`. The request must contain at least one group ID or identity ID and must not contain more than 1000 group IDs or 1000 identity IDs.
> 

```typescript
const response =
  await client.v1.tenants.realms.resourceServers.roles.deleteMembers.create({
    tenantId: "000176d94fd7b4d1",
    realmId: "19a95130480dfa79",
    resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
    roleId: "fb785d40cbe4fc0d",
    data: {
      group_ids: ["e372db224c06e850"],
      identity_ids: ["3a28d4f28b57cc93"],
    },
  });
```

---

### Unassign Scopes from a Role
> To unassign scopes from a role, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/resource-servers/$RESOURCE_SERVER_ID/roles/$ROLE_ID:deleteScopes`. The request must contain at least one and no more than 1000 scopes.
> 

```typescript
const response =
  await client.v1.tenants.realms.resourceServers.roles.deleteScopes.create({
    tenantId: "000176d94fd7b4d1",
    realmId: "19a95130480dfa79",
    resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
    roleId: "fb785d40cbe4fc0d",
    data: { scopes: ["identities:read"] },
  });
```

---

### Create a New Group
> To create a group, send a POST request to `/Groups`. Values in the request body for read-only fields will be ignored.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.groups.create({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  data: {
    group: {
      displayName: "Help Desk",
      id: "ed9fcce6-ec82-458e-ae58-e2d975cfc32d",
      meta: {
        created: "2022-04-07T07:23:33.000Z",
        lastModified: "2023-03-30T07:00:14.000Z",
        location: "Groups/ed9fcce6-ec82-458e-ae58-e2d975cfc32d",
        resourceType: "Group",
        version: "W/0",
      },
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    },
  },
});
```

---

### Create a New User
> To create a user, send a POST request to `/Users`. Values in the request body for read-only fields will be ignored.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.users.create({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  data: {
    user: {
      active: true,
      displayName: "Test User",
      emails: [{ primary: true, value: "test@test.com" }],
      externalId: "external-id-abcdef",
      id: "ed9fcce6-ec82-458e-ae58-e2d975cfc32d",
      meta: {
        created: "2022-04-07T07:23:33.000Z",
        lastModified: "2023-03-30T07:00:14.000Z",
        location: "Groups/ed9fcce6-ec82-458e-ae58-e2d975cfc32d",
        resourceType: "Group",
        version: "W/0",
      },
      name: { familyName: "Jensen", givenName: "Barbara" },
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      userName: "test_user",
    },
  },
});
```

---

### Create a New Theme
> To create a theme, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/themes/$THEME_ID`. Values in the request body for read-only fields will be ignored. All non-read-only fields are optional and will be populated with defaults if unspecified.
> Currently, each realm only supports a single theme. If a theme already exists for the realm, you will receive a 409 error.
> 

```typescript
const response = await client.v1.tenants.realms.themes.create({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  data: {
    theme: {
      button_color: "#4673D3",
      button_text_color: "#FFFFFF",
      create_time: "2022-07-28T18:00:00.000Z",
      email_realm_name: "Realm Administrators",
      id: "88ef08fb-c3f9-44e2-b174-fbb239e1dc47",
      logo_url_dark: "https://example.com/logo_url_dark.png",
      logo_url_light: "https://example.com/logo_url_light.png",
      realm_id: "7df92e4a38ba0993",
      support_url: "https://example.com/support",
      tenant_id: "0001b42d80372976",
      update_time: "2022-07-30T16:00:00.000Z",
    },
  },
});
```

---

### Replace a User
> To replace all attributes of an existing user, send a PUT request to `/Users/$USER_ID`. Values in the request body for immutable or read-only fields will be ignored.
> 

```typescript
const response = await client.v1.tenants.realms.scim.v2.users.put({
  tenantId: "000176d94fd7b4d1",
  realmId: "19a95130480dfa79",
  userId: "string",
  data: {
    user: {
      active: true,
      displayName: "Test User",
      emails: [{ primary: true, value: "test@test.com" }],
      externalId: "external-id-abcdef",
      id: "ed9fcce6-ec82-458e-ae58-e2d975cfc32d",
      meta: {
        created: "2022-04-07T07:23:33.000Z",
        lastModified: "2023-03-30T07:00:14.000Z",
        location: "Groups/ed9fcce6-ec82-458e-ae58-e2d975cfc32d",
        resourceType: "Group",
        version: "W/0",
      },
      name: { familyName: "Jensen", givenName: "Barbara" },
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      userName: "test_user",
    },
  },
});
```


