/**
 * File Generated by Sideko (sideko.dev)
 */
import {
  CoreResourceClient,
  CoreClient,
  RequestOptions,
  ApiPromise,
} from "@public/beyond_identity_api/core";
import { ListMembersClient } from "@public/beyond_identity_api/resources/v1/tenants/realms/groups/list-members";
import { ListRolesClient } from "@public/beyond_identity_api/resources/v1/tenants/realms/groups/list-roles";
import { AddMembersClient } from "@public/beyond_identity_api/resources/v1/tenants/realms/groups/add-members";
import { DeleteMembersClient } from "@public/beyond_identity_api/resources/v1/tenants/realms/groups/delete-members";
import * as requests from "@public/beyond_identity_api/resources/v1/tenants/realms/groups/request-types";
import * as types from "@public/beyond_identity_api/types";
import qs from "qs";

export class GroupsClient extends CoreResourceClient {
  // register resources (keep comment for code generation)
  listMembers: ListMembersClient;
  listRoles: ListRolesClient;
  addMembers: AddMembersClient;
  deleteMembers: DeleteMembersClient;

  constructor(client: CoreClient) {
    super(client);

    // init resources (keep comment for code generation)
    this.listMembers = new ListMembersClient(this._client);
    this.listRoles = new ListRolesClient(this._client);
    this.addMembers = new AddMembersClient(this._client);
    this.deleteMembers = new DeleteMembersClient(this._client);
  }

  // register api methods (keep comment for code generation)

  /**
   * To create a group, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups`. Values in the request body for read-only fields will be ignored.
   *
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.Group> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "post",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/groups`,
      auth: ["BearerAuth"],
      contentType: "application/json",
      body: request.data,
      responseType: "json",
      opts,
    });
  }

  /**
   * To update only specific attributes of an existing group, send a PATCH request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups/$GROUP_ID`. Values in the request body for immutable or read-only fields will be ignored. Fields that are omitted from the request body will be left unchanged.
   *
   */
  patch(
    request: requests.PatchRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.Group> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "patch",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/groups/${request.groupId}`,
      auth: ["BearerAuth"],
      contentType: "application/json",
      body: request.data,
      responseType: "json",
      opts,
    });
  }

  /**
   * To retrieve an existing group, send a GET request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups/$GROUP_ID`.
   *
   */
  get(
    request: requests.GetRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.Group> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "get",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/groups/${request.groupId}`,
      auth: ["BearerAuth"],
      responseType: "json",
      opts,
    });
  }

  /**
   * To list all groups for a realm, send a GET request to
   * `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups`.
   *
   * The response will contain at most 200 items and may contain a page token to
   * query the remaining items. If page size is not specified, the response will
   * contain 20 items. There is no defined ordering of the list of groups in the
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
  ): ApiPromise<types.ListGroupsResponse> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "get",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/groups`,
      auth: ["BearerAuth"],
      query: [
        qs.stringify({ page_size: request.pageSize }),
        qs.stringify({ page_token: request.pageToken }),
        qs.stringify({ skip: request.skip }),
      ],
      responseType: "json",
      opts,
    });
  }

  /**
   * To delete a group, send a DELETE request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/groups/$GROUP_ID`. To be deleted, a group must not have any members. Any existing members must first be deleted or you will receive a 409 error.
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
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/groups/${request.groupId}`,
      auth: ["BearerAuth"],
      responseType: "json",
      opts,
    });
  }
}
