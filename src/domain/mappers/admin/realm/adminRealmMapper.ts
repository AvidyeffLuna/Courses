import { IAdmin } from "domain/core/entities/adminEntity";

export function adminRealmDataToEntity(data: any): IAdmin {
  return {
    adminId: data?._id ?? "",
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    profilePictureUrl: data?.profilePictureUrl ?? null,
    email: data?.email ?? "",
    messagingToken: data?.messagingToken ?? "",
    createdAt: data?.createdAt ?? null,
    updatedAt: data?.updatedAt ?? null,
    lastSessionAt: data?.lastSessionAt ?? null,
  } as IAdmin;
}

export function adminFromRealmToDocumentData(admin: IAdmin): any {
  const adminDocumentData = {
    _id: admin.adminId,
    firstName: admin.firstName,
    lastName: admin.lastName,
    profilePictureUrl: admin.profilePictureUrl,
    email: admin.email,
    messagingToken: admin.messagingToken,
    createdAt: admin.createdAt,
    updatedAt: admin?.updatedAt ?? null,
    lastSessionAt: admin?.lastSessionAt ?? null,
  };

  return adminDocumentData;
}
