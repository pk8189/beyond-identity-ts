/**
 * File Generated by Sideko (sideko.dev)
 */

import * as types from "@public/beyond_identity_api/types";

export type CredentialBindingJob = {
  authenticator_config_id?: string;
  create_time?: string;
  credential_id?: string;
  delivery_method?: types.CredentialBindingJobDeliveryMethodEnum;
  expire_time?: string;
  id?: string;
  identity_id?: string;
  post_binding_redirect_uri?: string;
  realm_id?: string;
  state?: types.CredentialBindingJobStateEnum;
  tenant_id?: string;
  update_time?: string;
};
