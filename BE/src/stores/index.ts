import { TokenStore } from "./mongostore/token";
import to from "await-to-js";
import { ClientSession, Db, MongoClient } from "mongodb";

import { config } from "../config";
import { PermissionSchemes } from "./mongostore/permission_scheme_store";
import { RoleStore } from "./mongostore/role_store";
import { RoomStore } from "./mongostore/room_store";
import { RoomTypesStore } from "./mongostore/room_types";
import { UserStores } from "./mongostore/user_store";
import { SessionStore } from "./mongostore/session";

const DB_PING_ATTEMPTS = 10;
const DB_PING_TIMEOUT_SECS = 10;

class Store {
  user?: UserStores;
  room?: RoomStore;
  role?: RoleStore;
  permissionSchemes?: PermissionSchemes;
  roomTypes?: RoomTypesStore;
  token?: TokenStore;
  session?: SessionStore;
}

class MongoStore {
  client: MongoClient;
  db?: Db;
  private store: Store;
  constructor() {
    this.store = new Store();
    this.client = new MongoClient(config.mongoSettings.mongoUri, {
      auth: {
        username: config.mongoSettings.mongoUsername,
        password: config.mongoSettings.mongoPassword,
      },
    });
  }

  private initConnection = async () => {
    for (let i = 0; i < DB_PING_ATTEMPTS; i++) {
      const [err] = await to(this.client.connect());
      if (!err) {
        this.db = this.client.db(config.mongoSettings.mongoDatabase);
        break;
      } else {
        if (i === DB_PING_ATTEMPTS - 1) {
          throw err;
        } else {
          await sleep(DB_PING_TIMEOUT_SECS * 1000);
        }
      }
    }
  };

  setup = async () => {
    await this.initConnection();
    if (this.db) {
      this.store.user = new UserStores(this.db);
      this.store.room = new RoomStore(this.db);
      this.store.role = new RoleStore(this.db);
      this.store.permissionSchemes = new PermissionSchemes(this.db);
      this.store.roomTypes = new RoomTypesStore(this.db);
      this.store.token = new TokenStore(this.db);
      this.store.session = new SessionStore(this.db);
    }
  };

  close = async () => {
    if (this.client) {
      await this.client.close();
    }
  };

  startSession = (): ClientSession => {
    return this.client.startSession();
  };

  userStore = () => {
    if (this.store.user === undefined) {
      throw new Error("userStore is not setup yet");
    }

    return this.store.user;
  };

  roleStore = () => {
    if (this.store.role === undefined) {
      throw new Error("roleStore is not setup yet");
    }

    return this.store.role;
  };

  roomStore = () => {
    if (this.store.room === undefined) {
      throw new Error("roomStore is not setup yet");
    }

    return this.store.room;
  };

  roomRoomTypesStore = () => {
    if (this.store.roomTypes === undefined) {
      throw new Error("roomTypes is not setup yet");
    }

    return this.store.roomTypes;
  };

  permissionSchemesStore = () => {
    if (this.store.permissionSchemes === undefined) {
      throw new Error("permissionSchemesStore is not setup yet");
    }

    return this.store.permissionSchemes;
  };

  tokenStore = () => {
    if (this.store.token === undefined) {
      throw new Error("TokenStore is not setup yet");
    }

    return this.store.token;
  };

  sessionStore = () => {
    if (this.store.session === undefined) {
      throw new Error("SessionStore is not setup yet");
    }

    return this.store.session;
  };
}

const store = new MongoStore();
export default store;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
