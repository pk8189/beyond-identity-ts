/**
 * File Generated by Sideko (sideko.dev)
 */

import * as types from "@public/beyond_identity_api/types";

export type GetV1TenantsTenantIdRealmsRealmIdScimV2SchemasResponse = {
  Resources: types.ScimSchema[];
  itemsPerPage: number;
  schemas: string[];
  startIndex: number;
  totalResults: number;
};