/**
 * File Generated by Sideko (sideko.dev)
 */

import * as types from "@public/beyond_identity_api/types";

export type ListRealmsResponse = {
  next_page_token?: string;
  realms: types.Realm[];
  total_size: number;
};