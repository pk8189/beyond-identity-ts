/**
 * File Generated by Sideko (sideko.dev)
 */
import {
  CoreResourceClient,
  CoreClient,
} from "@public/beyond_identity_api/core";
import { TenantsClient } from "@public/beyond_identity_api/resources/v1/tenants";

export class V1Client extends CoreResourceClient {
  // register resources (keep comment for code generation)
  tenants: TenantsClient;

  constructor(client: CoreClient) {
    super(client);

    // init resources (keep comment for code generation)
    this.tenants = new TenantsClient(this._client);
  }

  // register api methods (keep comment for code generation)
}
