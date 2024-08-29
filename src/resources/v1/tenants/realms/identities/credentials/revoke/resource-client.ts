/**
 * File Generated by Sideko (sideko.dev)
 */
import {
  CoreResourceClient,
  CoreClient,
  RequestOptions,
  ApiPromise,
} from "@public/beyond_identity_api/core";
import * as requests from "@public/beyond_identity_api/resources/v1/tenants/realms/identities/credentials/revoke/request-types";
import * as types from "@public/beyond_identity_api/types";

export class RevokeClient extends CoreResourceClient {
  // register resources (keep comment for code generation)

  constructor(client: CoreClient) {
    super(client);

    // init resources (keep comment for code generation)
  }

  // register api methods (keep comment for code generation)

  /**
   * To revoke a credential, send a POST request to `/v1/tenants/$TENANT_ID/realms/$REALM_ID/identities/$IDENTITY_ID/credentials/$CREDENTIAL_ID:revoke`.
   *
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.Credential> {
    // send request (keep comment for code generation)
    return this._client.makeRequest({
      method: "post",
      path: `/v1/tenants/${request.tenantId}/realms/${request.realmId}/identities/${request.identityId}/credentials/${request.credentialId}:revoke`,
      auth: ["BearerAuth"],
      responseType: "json",
      opts,
    });
  }
}
