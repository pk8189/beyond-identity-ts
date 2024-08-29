/**
 * File Generated by Sideko (sideko.dev)
 */
import * as types from "@public/beyond_identity_api/types";

export type DeleteRequest = {
  tenantId: string;
  realmId: string;
  resourceServerId: string;
  roleId: string;
};

export type ListRequest = {
  tenantId: string;
  realmId: string;
  resourceServerId: string;
  pageSize?: number;
  pageToken?: string;
  skip?: number;
};

export type GetRequest = {
  tenantId: string;
  realmId: string;
  resourceServerId: string;
  roleId: string;
};

export type PatchRequest = {
  tenantId: string;
  realmId: string;
  resourceServerId: string;
  roleId: string;
  data: types.PatchV1TenantsTenantIdRealmsRealmIdResourceServersResourceServerIdRolesRoleIdBody;
};

export type CreateRequest = {
  tenantId: string;
  realmId: string;
  resourceServerId: string;
  data: types.PostV1TenantsTenantIdRealmsRealmIdResourceServersResourceServerIdRolesBody;
};