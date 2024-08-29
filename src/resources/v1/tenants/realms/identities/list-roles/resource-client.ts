/**
 * File Generated by Sideko (sideko.dev)
 */
import {
  CoreResourceClient,
  CoreClient,
  RequestOptions,
  ApiPromise,
} from "@public/beyond_identity_api/core";
import * as requests from "@public/beyond_identity_api/resources/v1/tenants/realms/identities/list-roles/request-types";
import * as types from "@public/beyond_identity_api/types";
import qs from "qs";

export class ListRolesClient extends CoreResourceClient {
  // register resources (keep comment for code generation)

  constructor(client: CoreClient) {
    super(client);

    // init resources (keep comment for code generation)
  }

  // register api methods (keep comment for code generation)

  /**
   * To list the roles to which an identity is assigned, send a GET request to
   * `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID:listRoles`.
   *
   * The request must include the `resource_server_id` query parameter specifying
   * the resource server on which to filter the roles. If the specified resource
   * server does not exist, you will receive a 409 error.
   *
   * The response will contain at most 200 items and may contain a page token to
   * query the remaining items. If page size is not specified, the response will
   * contain 20 items. There is no defined ordering of the list of roles in the
   * response. Note that the maximum and default page sizes are subject to
   * change.
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
  ): ApiPromise<types.ListIdentityRolesResponse> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "get",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/identities/${request.identityId}:listRoles`,
      auth: ["BearerAuth"],
      query: [
        qs.stringify({ page_size: request.pageSize }),
        qs.stringify({ page_token: request.pageToken }),
        qs.stringify({ resource_server_id: request.resourceServerId }),
        qs.stringify({ skip: request.skip }),
      ],
      responseType: "json",
      opts,
    });
  }
}
