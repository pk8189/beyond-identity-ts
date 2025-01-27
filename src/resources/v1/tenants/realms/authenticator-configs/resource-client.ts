/**
 * File Generated by Sideko (sideko.dev)
 */
import {
  CoreResourceClient,
  CoreClient,
  RequestOptions,
  ApiPromise,
} from "@public/beyond_identity_api/core";
import * as requests from "@public/beyond_identity_api/resources/v1/tenants/realms/authenticator-configs/request-types";
import * as types from "@public/beyond_identity_api/types";
import qs from "qs";

export class AuthenticatorConfigsClient extends CoreResourceClient {
  // register resources (keep comment for code generation)

  constructor(client: CoreClient) {
    super(client);

    // init resources (keep comment for code generation)
  }

  // register api methods (keep comment for code generation)

  /**
   * To create an authenticator configuration, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs`. Values in the request body for read-only fields will be ignored.
   *
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.AuthenticatorConfig> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "post",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/authenticator-configs`,
      auth: ["BearerAuth"],
      contentType: "application/json",
      body: request.data,
      responseType: "json",
      opts,
    });
  }

  /**
   * To update only specific attributes of an existing authenticator configuration, send a PATCH request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs/$AUTHENTICATOR_CONFIG_ID`. Values in the request body for immutable or read-only fields will be ignored. Fields that are omitted from the request body will be left unchanged.
   *
   */
  patch(
    request: requests.PatchRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.AuthenticatorConfig> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "patch",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/authenticator-configs/${request.authenticatorConfigId}`,
      auth: ["BearerAuth"],
      contentType: "application/json",
      body: request.data,
      responseType: "json",
      opts,
    });
  }

  /**
   * To retrieve an existing authenticator configuration, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs/$AUTHENTICATOR_CONFIG_ID`.
   *
   */
  get(
    request: requests.GetRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.AuthenticatorConfig> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "get",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/authenticator-configs/${request.authenticatorConfigId}`,
      auth: ["BearerAuth"],
      responseType: "json",
      opts,
    });
  }

  /**
   * To list all authenticator configurations for a realm, send a GET request to
   * `/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs`.
   *
   * The response will contain at most 100 items and may contain a page token to
   * query the remaining items. If page size is not specified, the response will
   * contain 100 items. There is no defined ordering of the list of authenticator
   * configurations in the response. Note that the maximum and default page sizes
   * are subject to change.
   *
   * When paginating, the page size is maintained by the page token but may be
   * overridden on subsequent requests. The skip is not maintained by the page
   * token and must be specified on each subsequent request.
   *
   * Page tokens expire after one week. Requests which specify an expired page
   * token will result in undefined behavior.
   *
   */
  list(
    request: requests.ListRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.ListAuthenticatorConfigsResponse> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "get",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/authenticator-configs`,
      auth: ["BearerAuth"],
      query: [
        qs.stringify({ page_size: request.pageSize }),
        qs.stringify({ page_token: request.pageToken }),
      ],
      responseType: "json",
      opts,
    });
  }

  /**
   * To delete an authenticator configuration, send a DELETE request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/authenticator-configs/$AUTHENTICATOR_CONFIG_ID`.
   * A successful request will receive a 200 status code with no body in the response. This indicates that the request was processed successfully.
   *
   */
  delete(
    request: requests.DeleteRequest,
    opts?: RequestOptions,
  ): ApiPromise<null> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "delete",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/authenticator-configs/${request.authenticatorConfigId}`,
      auth: ["BearerAuth"],
      responseType: "json",
      opts,
    });
  }
}
