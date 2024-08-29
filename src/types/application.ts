/**
 * File Generated by Sideko (sideko.dev)
 */

import * as types from "@public/beyond_identity_api/types";

export type Application = {
  authenticator_config_id?: string;
  display_name?: string;
  id?: string;
  is_managed?: boolean;
  protocol_config?: types.Obj0 | types.Obj1;
  realm_id?: string;
  resource_server_id?: string;
  tenant_id?: string;
};