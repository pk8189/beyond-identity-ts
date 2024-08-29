/**
 * File Generated by Sideko (sideko.dev)
 */
import Client from "@public/beyond_identity_api";
import * as types from "@public/beyond_identity_api/types";

// test client mehtods (keep comment for code generation)

describe("tests client.v1.tenants.realms.authenticatorConfigs.create", () => {
  test.concurrent(
    "200 generated_success_create_authenticator_configuration",
    async () => {
      // Generated success test for Create Authenticator Configuration body example from OpenAPI
      const client = new Client({
        token: "API_TOKEN",
        baseUrl: "https://api.sideko.dev/v1/mock/public/beyond-identity/1.7.0",
      });
      const response =
        await client.v1.tenants.realms.authenticatorConfigs.create({
          tenantId: "000176d94fd7b4d1",
          realmId: "19a95130480dfa79",
          data: {
            authenticator_config: {
              config: {
                authentication_methods: [
                  {
                    type: types.Obj0AuthenticationMethodsItemTypeEnum
                      .EmailOneTimePassword,
                  },
                ],
                invocation_type: types.Obj0InvocationTypeEnum.Automatic,
                invoke_url: "http://localhost:8092",
                trusted_origins: ["http://localhost:8092"],
                type: types.Obj0TypeEnum1.Embedded,
              },
              display_name: "Pet Authenticator Configuration",
              id: "73731b7f-eb76-4143-9b4b-81a720385f5a",
              realm_id: "caf2ff640497591a",
              tenant_id: "00011f1183c67b69",
            },
          },
        });
      console.log(response);
    },
  );
});

describe("tests client.v1.tenants.realms.authenticatorConfigs.patch", () => {
  test.concurrent(
    "200 generated_success_update_embedded_invoke_url",
    async () => {
      // Generated success test for Update Embedded Invoke URL body example from OpenAPI
      const client = new Client({
        token: "API_TOKEN",
        baseUrl: "https://api.sideko.dev/v1/mock/public/beyond-identity/1.7.0",
      });
      const response =
        await client.v1.tenants.realms.authenticatorConfigs.patch({
          tenantId: "000176d94fd7b4d1",
          realmId: "19a95130480dfa79",
          authenticatorConfigId: "73731b7f-eb76-4143-9b4b-81a720385f5a",
          data: {
            authenticator_config: {
              config: {
                authentication_methods: [
                  {
                    type: types.Obj0AuthenticationMethodsItemTypeEnum
                      .EmailOneTimePassword,
                  },
                ],
                invocation_type: types.Obj0InvocationTypeEnum.Automatic,
                invoke_url: "http://localhost:8092",
                trusted_origins: ["http://localhost:8092"],
                type: types.Obj0TypeEnum1.Embedded,
              },
              display_name: "Pet Authenticator Configuration",
              id: "73731b7f-eb76-4143-9b4b-81a720385f5a",
              realm_id: "caf2ff640497591a",
              tenant_id: "00011f1183c67b69",
            },
          },
        });
      console.log(response);
    },
  );
});

describe("tests client.v1.tenants.realms.authenticatorConfigs.get", () => {
  test.concurrent("200 generated_success", async () => {
    // Generated success test based on examples in OpenAPI
    const client = new Client({
      token: "API_TOKEN",
      baseUrl: "https://api.sideko.dev/v1/mock/public/beyond-identity/1.7.0",
    });
    const response = await client.v1.tenants.realms.authenticatorConfigs.get({
      tenantId: "000176d94fd7b4d1",
      realmId: "19a95130480dfa79",
      authenticatorConfigId: "73731b7f-eb76-4143-9b4b-81a720385f5a",
    });
    console.log(response);
  });
});

describe("tests client.v1.tenants.realms.authenticatorConfigs.list", () => {
  test.concurrent("200 generated_success", async () => {
    // Generated success test based on examples in OpenAPI
    const client = new Client({
      token: "API_TOKEN",
      baseUrl: "https://api.sideko.dev/v1/mock/public/beyond-identity/1.7.0",
    });
    const response = await client.v1.tenants.realms.authenticatorConfigs.list({
      tenantId: "000176d94fd7b4d1",
      realmId: "19a95130480dfa79",
      pageSize: 123,
      pageToken: "string",
    });
    console.log(response);
  });
});

describe("tests client.v1.tenants.realms.authenticatorConfigs.delete", () => {
  test.concurrent("200 generated_success", async () => {
    // Generated success test based on examples in OpenAPI
    const client = new Client({
      token: "API_TOKEN",
      baseUrl: "https://api.sideko.dev/v1/mock/public/beyond-identity/1.7.0",
    });
    const response = await client.v1.tenants.realms.authenticatorConfigs.delete(
      {
        tenantId: "000176d94fd7b4d1",
        realmId: "19a95130480dfa79",
        authenticatorConfigId: "73731b7f-eb76-4143-9b4b-81a720385f5a",
      },
    );
    console.log(response);
  });
});