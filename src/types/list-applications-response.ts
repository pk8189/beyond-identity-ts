/**
 * File Generated by Sideko (sideko.dev)
 */

import * as types from "@public/beyond_identity_api/types";

export type ListApplicationsResponse = {
  applications: types.Application[];
  next_page_token?: string;
  total_size: number;
};