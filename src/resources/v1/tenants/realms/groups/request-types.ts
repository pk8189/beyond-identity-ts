/**
 * File Generated by Sideko (sideko.dev)
 */
import * as types from "@public/beyond_identity_api/types";

export type DeleteRequest = {
  tenantId: string;
  realmId: string;
  groupId: string;
};

export type ListRequest = {
  tenantId: string;
  realmId: string;
  pageSize?: number;
  pageToken?: string;
  skip?: number;
};

export type GetRequest = {
  tenantId: string;
  realmId: string;
  groupId: string;
};

export type PatchRequest = {
  tenantId: string;
  realmId: string;
  groupId: string;
  data: types.PatchV1TenantsTenantIdRealmsRealmIdGroupsGroupIdBody;
};

export type CreateRequest = {
  tenantId: string;
  realmId: string;
  data: types.PostV1TenantsTenantIdRealmsRealmIdGroupsBody;
};
