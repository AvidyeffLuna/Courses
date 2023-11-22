import ShoppingCartProvider from "application/context/ShoppingCart/ShoppingCartContext";
import {
  CLUSTER_NAME,
  DATABASE_NAME,
  getCurrentUser,
} from "infrastructure/config/mongo-realm/app";
import Link from "next/link";
import { printLogError } from "presentation/logs/logs";
import { ShoppingCartRoutesEnum } from "presentation/routes/shoppingCartRoutes";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCartCount] = useState(0);

  const onWatchShoppingCartList = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("ShoppingCarts");

      const shoppingCart = await collection.findOne({
        userId: currentUser.id,
      });

      setShoppingCartCount(
        shoppingCart?.courses ? shoppingCart.courses.length : 0
      );

      for await (const change of collection.watch({
        userId: currentUser.id,
        readAt: null,
      })) {
        let breakAsyncIterator = false;
        switch (change.operationType) {
          case "update": {
            const { fullDocument } = change;

            setShoppingCartCount(
              fullDocument?.courses ? fullDocument.courses.length : 0
            );

            breakAsyncIterator = true;
            break;
          }
        }
        if (breakAsyncIterator) break;
      }
    } catch (error) {
      printLogError(error);
    }
  }, []);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) onWatchShoppingCartList();

    return () => {
      isCleanup = false;
    };
  }, [onWatchShoppingCartList]);

  return (
    <Link
      href={{
        pathname: ShoppingCartRoutesEnum.ShoppingCart,
      }}
    >
      <a
        className="btn btn-icon btn-indicator py-1 px-1"
        id="dropdown-options"
        style={{ border: "1px solid transparent", float: "right" }}
      >
        <i className="fa-solid fa-cart-shopping icon-primary" />

        {shoppingCart > 0 && (
          <Badge bg="primary" className="badge-indicator badge-xs py-1">
            {shoppingCart}
          </Badge>
        )}
      </a>
    </Link>
  );
}
