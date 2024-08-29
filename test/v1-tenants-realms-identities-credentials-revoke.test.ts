/**
 * File Generated by Sideko (sideko.dev)
 */
import Client from "@public/beyond_identity_api";

// test client mehtods (keep comment for code generation)

describe("tests client.v1.tenants.realms.identities.credentials.revoke.create", () => {
  test.concurrent("200 generated_success", async () => {
    // Generated success test based on examples in OpenAPI
    const client = new Client({
      token: "API_TOKEN",
      baseUrl: "https://api.sideko.dev/v1/mock/public/beyond-identity/1.7.0",
    });
    const response =
      await client.v1.tenants.realms.identities.credentials.revoke.create({
        tenantId: "000176d94fd7b4d1",
        realmId: "19a95130480dfa79",
        identityId: "e372db224c06e850",
        credentialId: "b5a31610800dda18",
      });
    console.log(response);
  });
});