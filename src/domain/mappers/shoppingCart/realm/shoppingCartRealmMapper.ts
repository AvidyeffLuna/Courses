import { IShoppingCart } from "domain/core/entities/shoppingCartEntity";

export function shoppingCartRealmDataToEntity(data: any): IShoppingCart {
  return {
    shoppingCartId: data?._id ? data?._id.toString() : "",
    userId: data?.userId ?? "",
    courses: data?.courses ?? [],
    createdAt: data?.createdAt ?? new Date(),
    updatedAt: data?.updatedAt ?? null,
    deletedAt: data?.deletedAt ?? null,
    disabledAt: data?.disabledAt ?? null,
  } as IShoppingCart;
}

export function shoppingCartFromRealmToDocumentData(shoppingCart: IShoppingCart): any {
  const documentData = {
    _id: shoppingCart.shoppingCartId,
    userId: shoppingCart.userId,
    courses: shoppingCart.courses,
    createdAt: shoppingCart.createdAt,
    updatedAt: shoppingCart.updatedAt,
    deletedAt: shoppingCart.deletedAt,
    disabledAt: shoppingCart.disabledAt,
  };

  return documentData;
}
