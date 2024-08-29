/**
 * File Generated by Sideko (sideko.dev)
 */

import * as types from "@public/beyond_identity_api/types";

export type Obj1 = {
  allowed_scopes?: string[];
  client_id?: string;
  client_secret?: string;
  confidentiality?: types.ConfidentialityEnum;
  grant_type?: types.GrantTypeItemEnum[];
  pkce?: types.PkceConfigEnum;
  redirect_uris?: string[];
  token_configuration?: types.TokenConfiguration;
  token_endpoint_auth_method?: types.TokenEndpointAuthMethodEnum;
  token_format?: string;
  type: types.Obj1TypeEnum;
};