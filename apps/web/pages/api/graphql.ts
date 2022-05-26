import type { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

import { ACCESS_TOKEN } from "lib/config";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies[ACCESS_TOKEN];
  return httpProxyMiddleware(req, res, {
    target: process.env.NEXT_PUBLIC_API_URL + "/graphql",
    headers: { authorization: token ? `Bearer ${token}` : "" },
    pathRewrite: [{ patternStr: "/api/graphql", replaceStr: "" }]
  });
}
