/**
 * File Generated by Sideko (sideko.dev)
 */
import * as types from "@public/beyond_identity_api/types";

export type DeleteRequest = {
  tenantId: string;
  realmId: string;
  identityId: string;
};

export type ListRequest = {
  tenantId: string;
  realmId: string;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
  skip?: number;
};

export type GetRequest = {
  tenantId: string;
  realmId: string;
  identityId: string;
};

export type PatchRequest = {
  tenantId: string;
  realmId: string;
  identityId: string;
  data: types.PatchV1TenantsTenantIdRealmsRealmIdIdentitiesIdentityIdBody;
};

export type CreateRequest = {
  tenantId: string;
  realmId: string;
  data: types.PostV1TenantsTenantIdRealmsRealmIdIdentitiesBody;
};
