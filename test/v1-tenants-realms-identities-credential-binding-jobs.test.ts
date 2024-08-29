/**
 * File Generated by Sideko (sideko.dev)
 */
import Client from "@public/beyond_identity_api";
import * as types from "@public/beyond_identity_api/types";

// test client mehtods (keep comment for code generation)

describe("tests client.v1.tenants.realms.identities.credentialBindingJobs.create", () => {
  test.concurrent(
    "200 generated_success_create_credential_binding_job",
    async () => {
      // Generated success test for Create Credential Binding Job body example from OpenAPI
      const client = new Client({
        token: "API_TOKEN",
        baseUrl: "https://api.sideko.dev/v1/mock/public/beyond-identity/1.7.0",
      });
      const response =
        await client.v1.tenants.realms.identities.credentialBindingJobs.create({
          tenantId: "000176d94fd7b4d1",
          realmId: "19a95130480dfa79",
          identityId: "e372db224c06e850",
          data: {
            job: {
              authenticator_config_id: "67bb0acf12e5c899",
              create_time: "2022-05-12T20:29:47.636Z",
              credential_id: "9802966246819b35",
              delivery_method:
                types.CredentialBindingJobDeliveryMethodEnum.Return,
              expire_time: "2022-05-12T20:29:47.636Z",
              id: "86b4f51481f09321",
              identity_id: "3d227b0d5949969d",
              post_binding_redirect_uri: "http://example.com/callback",
              realm_id: "9602e246c2ead9b2",
              state: types.CredentialBindingJobStateEnum.Complete,
              tenant_id: "ce5ace5fc7e14d6a",
              update_time: "2022-05-12T20:29:47.636Z",
            },
          },
        });
      console.log(response);
    },
  );
});

describe("tests client.v1.tenants.realms.identities.credentialBindingJobs.get", () => {
  test.concurrent("200 generated_success", async () => {
    // Generated success test based on examples in OpenAPI
    const client = new Client({
      token: "API_TOKEN",
      baseUrl: "https://api.sideko.dev/v1/mock/public/beyond-identity/1.7.0",
    });
    const response =
      await client.v1.tenants.realms.identities.credentialBindingJobs.get({
        tenantId: "000176d94fd7b4d1",
        realmId: "19a95130480dfa79",
        identityId: "e372db224c06e850",
        credentialBindingJobId: "5c4137af5e70413a",
      });
    console.log(response);
  });
});

describe("tests client.v1.tenants.realms.identities.credentialBindingJobs.list", () => {
  test.concurrent("200 generated_success", async () => {
    // Generated success test based on examples in OpenAPI
    const client = new Client({
      token: "API_TOKEN",
      baseUrl: "https://api.sideko.dev/v1/mock/public/beyond-identity/1.7.0",
    });
    const response =
      await client.v1.tenants.realms.identities.credentialBindingJobs.list({
        tenantId: "000176d94fd7b4d1",
        realmId: "19a95130480dfa79",
        identityId: "e372db224c06e850",
        pageSize: 123,
        pageToken: "string",
        skip: 123,
      });
    console.log(response);
  });
});