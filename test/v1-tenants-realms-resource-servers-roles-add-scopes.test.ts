/**
 * File Generated by Sideko (sideko.dev)
 */
import Client from "@public/beyond_identity_api";

// test client mehtods (keep comment for code generation)

describe("tests client.v1.tenants.realms.resourceServers.roles.addScopes.create", () => {
  test.concurrent("200 generated_success_assign_scopes", async () => {
    // Generated success test for Assign Scopes body example from OpenAPI
    const client = new Client({
      token: "API_TOKEN",
      baseUrl: "https://api.sideko.dev/v1/mock/public/beyond-identity/1.7.0",
    });
    const response =
      await client.v1.tenants.realms.resourceServers.roles.addScopes.create({
        tenantId: "000176d94fd7b4d1",
        realmId: "19a95130480dfa79",
        resourceServerId: "84db69f5-48a8-4c11-8cda-1bae3a73f07e",
        roleId: "fb785d40cbe4fc0d",
        data: { scopes: ["identities:read"] },
      });
    console.log(response);
  });
});
