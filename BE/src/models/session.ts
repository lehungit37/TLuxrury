import { ObjectId } from "mongodb";

import { config } from "../config";

export const SessionPropPlatform = "platform",
  SessionPropOs = "os",
  SessionPropBrowser = "browser",
  SessionPropsIp = "ip",
  SessionCacheSize = 10000,
  SessionActivityTimeout = 1000 * 60 * 5;

export class SessionModel {
  id?: ObjectId;
  token: string;
  createdAt: Date;
  exPiresAt: Date;
  lastActivityAt?: Date;
  userId: string;
  deviceId: string;
  isOAuth: boolean;
  props: { [x: string]: string };

  constructor(userId: string, deviceId = "", isOAuth = false) {
    this.userId = userId;
    this.deviceId = deviceId;
    this.isOAuth = isOAuth;
    this.props = {};
    this.token = "";
    this.createdAt = new Date();
    this.exPiresAt = extendSessionExpirationTime();
  }

  preSave = () => {
    if (!this.token) {
      this.token = this.generateToken(40);
    }

    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    this.exPiresAt = extendSessionExpirationTime();

    this.lastActivityAt = this.createdAt;
  };

  addProp = (key: string, value: string) => {
    this.props[key] = value;
  };

  generateToken = (size: number) => {
    const CHARACTERS =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
        ""
      );

    let arr: string[] = [];

    for (let i = 0; i < size; i++) {
      const j = parseInt((Math.random() * (CHARACTERS.length - 1)).toFixed(0));
      arr[i] = CHARACTERS[j];
    }

    return arr.join("");
  };
}

export const isExpired = (exPiresAt: Date) => {
  if (!exPiresAt) return false;
  if (new Date().getTime() > exPiresAt.getTime()) return true;
  return false;
};

export const extendSessionExpirationTime = () => {
  const days = 15;
  const date = new Date();
  date.setDate(date.getDate() + days);

  return date;
};
