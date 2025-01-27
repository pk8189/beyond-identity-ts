/**
 * File Generated by Sideko (sideko.dev)
 */
import {
  CoreResourceClient,
  CoreClient,
  RequestOptions,
  ApiPromise,
} from "@public/beyond_identity_api/core";
import * as requests from "@public/beyond_identity_api/resources/v1/tenants/realms/scim/v2/users/request-types";
import * as types from "@public/beyond_identity_api/types";
import qs from "qs";

export class UsersClient extends CoreResourceClient {
  // register resources (keep comment for code generation)

  constructor(client: CoreClient) {
    super(client);

    // init resources (keep comment for code generation)
  }

  // register api methods (keep comment for code generation)

  /**
   * To replace all attributes of an existing user, send a PUT request to `/Users/$USER_ID`. Values in the request body for immutable or read-only fields will be ignored.
   *
   */
  put(
    request: requests.PutRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.ScimUser> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "put",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/scim/v2/Users/${request.userId}`,
      auth: ["BearerAuth"],
      contentType: "application/json",
      body: request.data,
      responseType: "json",
      opts,
    });
  }

  /**
   * To create a user, send a POST request to `/Users`. Values in the request body for read-only fields will be ignored.
   *
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.ScimUser> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "post",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/scim/v2/Users`,
      auth: ["BearerAuth"],
      contentType: "application/json",
      body: request.data,
      responseType: "json",
      opts,
    });
  }

  /**
   * To update only specific attributes of an existing user, send a PATCH
   * request to `/Users/$USER_ID`. Values in the request body for immutable or
   * read-only fields will be ignored. Fields that are omitted from the request
   * body will be left unchanged.
   *
   * Note that the Beyond Identity SCIM server currently does not support atomic
   * PATCH operations. If a request contains multiple operations, the request
   * may be partially applied.
   *
   * Currently, only "add" and "replace" operations are supported for users.
   *
   */
  patch(
    request: requests.PatchRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.ScimUser> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "patch",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/scim/v2/Users/${request.userId}`,
      auth: ["BearerAuth"],
      contentType: "application/json",
      body: request.data,
      responseType: "json",
      opts,
    });
  }

  /**
   * To retrieve an existing user, send a GET request to `/Users/$USER_ID`.
   *
   */
  get(
    request: requests.GetRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.ScimUser> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "get",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/scim/v2/Users/${request.userId}`,
      auth: ["BearerAuth"],
      responseType: "json",
      opts,
    });
  }

  /**
   * To list all users, send a GET request to `/Users`.
   *
   * Currently, filtering on users only supports the `eq` and `ne` operators and
   * the `userName` and `externalId` attributes.
   *
   * The response will contain at most 1000 items. If count is not specified or
   * is zero, the response will not contain any resources. There is no defined
   * ordering of the list of users in the response. Note that the maximum page
   * size is subject to change.
   *
   */
  list(
    request: requests.ListRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.GetV1TenantsTenantIdRealmsRealmIdScimV2UsersResponse> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "get",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/scim/v2/Users`,
      auth: ["BearerAuth"],
      query: [
        qs.stringify({ count: request.count }),
        qs.stringify({ filter: request.filter }),
        qs.stringify({ startIndex: request.startIndex }),
      ],
      responseType: "json",
      opts,
    });
  }

  /**
   * To delete a user, send a DELETE request to `/Users/$USER_ID`.
   */
  delete(
    request: requests.DeleteRequest,
    opts?: RequestOptions,
  ): ApiPromise<null> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "delete",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/scim/v2/Users/${request.userId}`,
      auth: ["BearerAuth"],
      responseType: "json",
      opts,
    });
  }
}
