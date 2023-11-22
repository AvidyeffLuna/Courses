import * as Realm from "realm-web";

const REALM_APP_ID = "padtech-qyljs";

export const CLUSTER_NAME = "mongodb-atlas";
export const DATABASE_NAME = "padtech";

export const app = new Realm.App({ id: REALM_APP_ID });

export const getCurrentUser = async () => {
  if (!app.currentUser) return await app.logIn(Realm.Credentials.anonymous());

  return app.currentUser;
}

export const currentUser = getCurrentUser();

