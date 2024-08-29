/**
 * File Generated by Sideko (sideko.dev)
 */
import {
  CoreResourceClient,
  CoreClient,
} from "@public/beyond_identity_api/core";
import { GroupsClient } from "@public/beyond_identity_api/resources/v1/tenants/realms/scim/v2/groups";
import { UsersClient } from "@public/beyond_identity_api/resources/v1/tenants/realms/scim/v2/users";
import { ResourceTypesClient } from "@public/beyond_identity_api/resources/v1/tenants/realms/scim/v2/resource-types";
import { SchemasClient } from "@public/beyond_identity_api/resources/v1/tenants/realms/scim/v2/schemas";
import { ServiceProviderConfigClient } from "@public/beyond_identity_api/resources/v1/tenants/realms/scim/v2/service-provider-config";

export class V2Client extends CoreResourceClient {
  // register resources (keep comment for code generation)
  groups: GroupsClient;
  users: UsersClient;
  resourceTypes: ResourceTypesClient;
  schemas: SchemasClient;
  serviceProviderConfig: ServiceProviderConfigClient;

  constructor(client: CoreClient) {
    super(client);

    // init resources (keep comment for code generation)
    this.groups = new GroupsClient(this._client);
    this.users = new UsersClient(this._client);
    this.resourceTypes = new ResourceTypesClient(this._client);
    this.schemas = new SchemasClient(this._client);
    this.serviceProviderConfig = new ServiceProviderConfigClient(this._client);
  }

  // register api methods (keep comment for code generation)
}
