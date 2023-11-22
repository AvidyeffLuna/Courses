import { IUser } from "domain/core/entities/userEntity";

export function userRealmDataToEntity(data: any): IUser {
  return {
    userId: data?._id ?? "",
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    profilePictureUrl: data?.profilePictureUrl ?? null,
    email: data?.email ?? "",
    provider: data?.provider ?? "",
    phoneCountryCode: data?.phoneCountryCode ?? 0,
    favouritesCourses: data?.favouritesCourses ?? [],
    phoneOperatorCode: data?.phoneOperatorCode ?? 0,
    phoneNumber: data?.phoneNumber ?? "",
    genrer: data?.genrer ?? "",
    documentType: data?.documentType ?? "",
    documentNumber: data?.documentNumber ?? "",
    messagingToken: data?.messagingToken ?? "",
    state: data?.state ?? "",
    location: data?.location ?? "",
    address: data?.address ?? "",
    birthDate: data?.birthDate ?? null,
    createdAt: data?.createdAt ?? null,
    updatedAt: data?.updatedAt ?? null,
    lastSessionAt: data?.lastSessionAt ?? null,
    emailVerifiedAt: data?.emailVerifiedAt ?? null,
  } as IUser;
}

export function userFromRealmToDocumentData(user: IUser): any {
  const userDocumentData = {
    _id: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePictureUrl: user.profilePictureUrl,
    email: user.email,
    provider: user.provider,
    phoneCountryCode: user.phoneCountryCode,
    phoneOperatorCode: user.phoneOperatorCode,
    phoneNumber: user.phoneNumber,
    genrer: user.genrer,
    favouritesCourses: user.favouritesCourses,
    messagingToken: user.messagingToken,
    documentType: user.documentType,
    documentNumber: user.documentNumber,
    state: user.state,
    location: user.location,
    address: user.address,
    birthDate: user?.birthDate,
    createdAt: user.createdAt,
    updatedAt: user?.updatedAt,
    lastSessionAt: user?.lastSessionAt,
    emailVerifiedAt: user?.emailVerifiedAt,
  };

  return userDocumentData;
}
