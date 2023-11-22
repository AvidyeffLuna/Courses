import { IMedia } from "domain/core/entities/mediaEntity";

export function mediaRealmDataToEntity(data: any): IMedia {
    return {
       url: data?.url ?? "",
       type: data?.type ?? "",
       name: data?.name ?? null,
    } as IMedia;
}

export function mediaFromRealmToDocumentData(media: IMedia): any {
    const documentData = {
      url: media.url,
      type: media.type,
      name: media.name
    };
  
    return documentData;
}
