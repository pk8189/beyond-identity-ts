/**
 * File Generated by Sideko (sideko.dev)
 */
import Client from "@public/beyond_identity_api";

// test client mehtods (keep comment for code generation)

describe("tests client.v1.tenants.realms.groups.deleteMembers.create", () => {
  test.concurrent("200 generated_success_delete_members", async () => {
    // Generated success test for Delete Members body example from OpenAPI
    const client = new Client({
      token: "API_TOKEN",
      baseUrl: "https://api.sideko.dev/v1/mock/public/beyond-identity/1.7.0",
    });
    const response = await client.v1.tenants.realms.groups.deleteMembers.create(
      {
        tenantId: "000176d94fd7b4d1",
        realmId: "19a95130480dfa79",
        groupId: "81490afab171aef0",
        data: { identity_ids: ["e372db224c06e850", "3a28d4f28b57cc93"] },
      },
    );
    console.log(response);
  });
});