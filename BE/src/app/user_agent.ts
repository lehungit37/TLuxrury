import os from "os";
import { detect } from "detect-browser";
import { Request } from "express";

export function getBrowserInfo(req: Request) {
  const useragent = req.get("User-Agent");
  const platform = os.platform();

  const ipAddress = req.socket.remoteAddress || req.connection.remoteAddress;

  const array = ipAddress?.split(":") || [];
  const ip = array[array.length - 1];

  const browser = detect(useragent);

  if (!browser) return { name: "", os: "", version: "", ip, platform };

  const parts = useragent?.split(/\s*[;)(]\s*/) || [];
  const { name = "", version = "" } = browser;

  return {
    browserName: name,
    browserVersion: version,
    os: parts[2],
    ip,
    platform,
  };
}
