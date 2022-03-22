import { gql } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { initializeApollo } from "lib/apollo/client";
import { REFRESH_TOKEN } from "lib/config";
import { createAuthCookies, removeAuthCookies } from "lib/cookies";
import type {
  RefreshTokenMutation,
  RefreshTokenMutationVariables
} from "lib/graphql";
import { RefreshTokenDocument } from "lib/graphql";

const _ = gql`
  mutation RefreshToken($token: JWT!) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("REFRESHING");
  try {
    const client = initializeApollo(null);
    const oldRefreshToken = req.cookies[REFRESH_TOKEN];
    if (!oldRefreshToken) throw new Error();
    const { data } = await client.mutate<
      RefreshTokenMutation,
      RefreshTokenMutationVariables
    >({
      mutation: RefreshTokenDocument,
      variables: { token: oldRefreshToken }
    });
    if (!!!data || !!!data.refreshToken) throw new Error();
    const accessToken = data?.refreshToken.accessToken;
    const refreshToken = data?.refreshToken.refreshToken;
    res.setHeader("Set-Cookie", createAuthCookies({ accessToken, refreshToken }));
    res.status(200).json({ success: true });
  } catch {
    res.setHeader("Set-Cookie", removeAuthCookies());
    res.status(200).json({ success: false });
  }
}

export type RefreshResponse = { success: boolean };
