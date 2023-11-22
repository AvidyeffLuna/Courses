import { ICourse } from "domain/core/entities/courseEntity";
import { IDeliverable } from "domain/core/entities/deliverableEntity";
import { IMedia } from "domain/core/entities/mediaEntity";
import { ITeacher } from "domain/core/entities/teacherEntity";
import { IUser } from "domain/core/entities/userEntity";
import { mediaRealmDataToEntity } from "domain/mappers/media/realm/mediaRealmMapper";

export function deliverableRealmDataToEntity(data: any, course?: ICourse | null, user?: IUser | null, teacher?: ITeacher | null): IDeliverable {
    let mediaList: IMedia[] = [];

    if (data?.mediaList && data?.mediaList.length > 0) {
      data.mediaList.forEach((media: any) => {
        mediaList.push(mediaRealmDataToEntity(media));
      });
    }
  
    return {
        deliverableId: data?._id ?? "",
        courseId: data?.courseId ?? null,
        courseTaskId: data?.courseTaskId ?? null,
        course: course,
        userId: data?.userId ?? null,
        user: user,
        teacherId: data?.teacherId ?? null,
        teacher: teacher,
        title: data?.title ?? "",
        description: data?.description ?? "",
        mediaList: mediaList,
        createdAt: data?.createdAt ? new Date(data.createdAt) : new Date(),
        updatedAt: data?.updatedAt ? new Date(data.updatedAt) : null,
        deletedAt: data?.deletedAt ? new Date(data.deletedAt) : null,
        readAt: data?.readAt ? new Date(data.readAt) : null,
    } as IDeliverable;
}

export function deliverableFromRealmToDocumentData(deliverable: IDeliverable): any {
    const documentData = {
        _id: deliverable.deliverableId,
        courseId: deliverable.courseId,
        courseTaskId: deliverable.courseTaskId,
        userId: deliverable.userId,
        teacherId: deliverable.teacherId,
        title: deliverable.title,
        description: deliverable.description,
        mediaList: deliverable.mediaList,
        createdAt: deliverable.createdAt,
        updatedAt: deliverable.updatedAt,
        deletedAt: deliverable.deletedAt,
        readAt: deliverable.readAt,
    };

    return documentData;
}
