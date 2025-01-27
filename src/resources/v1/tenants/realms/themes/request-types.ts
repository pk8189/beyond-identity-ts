/**
 * File Generated by Sideko (sideko.dev)
 */
import * as types from "@public/beyond_identity_api/types";

export type GetRequest = {
  tenantId: string;
  realmId: string;
  themeId: string;
};

export type PatchRequest = {
  tenantId: string;
  realmId: string;
  themeId: string;
  data: types.PatchV1TenantsTenantIdRealmsRealmIdThemesThemeIdBody;
};

export type CreateRequest = {
  tenantId: string;
  realmId: string;
  data: types.PostV1TenantsTenantIdRealmsRealmIdThemesBody;
};
