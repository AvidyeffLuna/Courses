import { ICourse, ICourseItem, ICourseLesson, ICourseTag, ICourseTask, ICourseUser, ICourseUserTask } from "domain/core/entities/courseEntity";
import { IMedia } from "domain/core/entities/mediaEntity";
import { mediaRealmDataToEntity } from "domain/mappers/media/realm/mediaRealmMapper";

export function courseRealmDataToEntity(data: any): ICourse {
  return {
      courseId: data?._id ? data?._id.toString() : "",
      teacherId: data?.teacherId ?? "",
      name: data?.name ?? "",
      slug: data?.slug ?? "",
      initCourseDate: data?.initCourseDate ? new Date(data.initCourseDate) : new Date(),
      description: data?.description ?? "",
      price: data?.price ?? 0,
      tags: data?.tags ?? [],
      lessons: data?.lessons ?? 0,
      items: data?.items ?? 0,
      tasks: data?.tasks ?? 0,
      countRatings: data?.countRatings ?? 0,
      totalRatings: data?.totalRatings ?? 0,
      students: data?.students ?? 0,
      isFavorite: data?.isFavorite ?? false,
      mainVideoUrl: data?.mainVideoUrl ?? "",
      mainPictureUrl: data?.mainPictureUrl ?? "",
      views: data?.views ?? 0,
      keywords: data?.keywords ?? [],
      createdAt: data?.createdAt ?? new Date(),
      updatedAt: data?.updatedAt ?? null,
      deletedAt: data?.deletedAt ?? null,
      disabledAt: data?.disabledAt ?? null,
  } as ICourse;
}

export function courseFromRealmToDocumentData(course: ICourse): any {
  const documentData = {
    _id: course.courseId,
    teacherId: course.teacherId,
    name: course.name,
    slug: course.slug,
    initCourseDate: course.initCourseDate,
    description: course.description,
    price: course.price,
    tags: course.tags,
    items: course.items,
    tasks: course.tasks,
    views: course.views,
    countRatings: course.countRatings,
    totalRatings: course.totalRatings,
    lessons: course.lessons,
    favorite: course.favorite,
    keywords: course.keywords,
    mainVideoUrl: course.mainVideoUrl,
    mainPictureUrl: course.mainPictureUrl,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
    deletedAt: course.deletedAt,
    disabledAt: course.disabledAt,
  };

  return documentData;
}

export function courseUserTaskRealmDataToEntity(data: any): ICourseUserTask {
  return {
    taskId: data?.taskId ?? "",
    score: data?.score ?? null,
    note: data?.note ?? null,
    isCompleted: data?.isCompleted ?? false,
    completedAt: data?.completedAt ? new Date(data.completedAt) : null,
  } as ICourseUserTask;
}

export function courseUserTaskFromRealmToDocumentData(task: ICourseUserTask): any {
  const documentData = {
    taskId: task.taskId,
    score: task.score,
    note: task.note,
    isCompleted: task.isCompleted,
    completedAt: task.completedAt,
  };

  return documentData;
}

export function courseUserRealmDataToEntity(data: any): ICourseUser {
  const tasks: ICourseUserTask[] = [];

  if (data?.tasks?.length > 0) {
    data.tasks.forEach((task: any) => {
      tasks.push(courseUserTaskRealmDataToEntity(task));
    });
  }

  return {
    courseUserId: data?._id ? data?._id.toString() : "",
    userId: data?.userId ?? "",
    courseId: data?.courseId ?? "",
    tasks: tasks,
    isCompleted: data?.isCompleted ?? false,
    completedAt: data?.completedAt ? new Date(data.completedAt) : null,
    createdAt: data?.createdAt ?? new Date(),
  } as ICourseUser;
}

export function courseUserFromRealmToDocumentData(course: ICourseUser): any {
  const tasks: any[] = [];

  if (course.tasks?.length > 0) {
    course.tasks.forEach((task: ICourseUserTask) => {
      tasks.push(courseUserTaskFromRealmToDocumentData(task));
    });
  }

  const documentData = {
    _id: course.courseUserId,
    userId: course.userId,
    courseId: course.courseId,
    tasks: tasks,
    isCompleted: course.isCompleted,
    completedAt: course.completedAt,
    createdAt: course.createdAt
  };

  return documentData;
}

export function courseTagRealmDataToEntity(data: any): ICourseTag {
  return {
    courseTagId: data?._id ? data?._id.toString() : "",
    name: data?.name ?? "",
    createdAt: data?.createdAt ?? new Date(),
  } as ICourseTag;
}

export function courseTagFromRealmToDocumentData(courseTag: ICourseTag): any {
  const documentData = {
    _id: courseTag.courseTagId,
    name: courseTag.name,
    createdAt: courseTag.createdAt
  };

  return documentData;
}

export function courseLessonRealmDataToEntity(data: any): ICourseLesson {
  return {
    courseLessonId:  data?._id ? data?._id.toString() : "",
      courseId: data?.courseId ?? "",
      title: data?.title ?? "",
      index: data?.index ?? 0,
      description: data?.description ?? "",
      items: data?.items ?? 0,
      itemsList: data?.itemsList ?? [],
      createdAt: data?.createdAt ?? new Date(),
      updatedAt: data?.updatedAt ?? null,
      deletedAt: data?.deletedAt ?? null,
      disabledAt: data?.disabledAt ?? null,
  } as ICourseLesson;
}

export function courseLessonFromRealmToDocumentData(courseLesson: ICourseLesson): any {
  const documentData = {
    _id: courseLesson.courseLessonId,
    courseId: courseLesson.courseId,
    title: courseLesson.title,
    index: courseLesson.index,
    description: courseLesson.description,
    items: courseLesson.items,
    createdAt: courseLesson.createdAt,
    updatedAt: courseLesson.updatedAt,
    deletedAt: courseLesson.deletedAt,
    disabledAt: courseLesson.disabledAt,
  };

  return documentData;
}

export function courseItemRealmDataToEntity(data: any): ICourseItem {
  let mediaList: IMedia[] = [];

  if (data?.mediaList && data?.mediaList.length > 0) {
    data.mediaList.forEach((media: any) => {
      mediaList.push(mediaRealmDataToEntity(media));
    });
  }

  return {
    courseItemId:  data?._id ? data?._id.toString() : "",
    courseLessonId:  data?.courseLessonId ?? "",
    courseId: data?.courseId ?? "",
    title: data?.title ?? "",
    index: data?.index ?? 0,
    description: data?.description ?? "",
    mainVideoUrl: data?.mainVideoUrl ?? "",
    mediaList: mediaList,
    type: data?.type ?? "",
    createdAt: data?.createdAt ?? new Date(),
    updatedAt: data?.updatedAt ?? null,
    deletedAt: data?.deletedAt ?? null,
    disabledAt: data?.disabledAt ?? null,
  } as ICourseItem;
}

export function courseItemFromRealmToDocumentData(courseItem: ICourseItem): any {
  const documentData = {
    _id: courseItem.courseItemId,
    courseId: courseItem.courseId,
    courseLessonId: courseItem.courseLessonId,
    title: courseItem.title,
    index: courseItem.index,
    mainVideoUrl: courseItem.mainVideoUrl,
    mediaList: courseItem.mediaList,
    description: courseItem.description,
    createdAt: courseItem.createdAt,
    updatedAt: courseItem.updatedAt,
    deletedAt: courseItem.deletedAt,
    disabledAt: courseItem.disabledAt,
  };

  return documentData;
}

export function courseTaskRealmDataToEntity(data: any): ICourseTask {
  let mediaList: IMedia[] = [];

  if (data?.mediaList && data?.mediaList.length > 0) {
    data.mediaList.forEach((media: any) => {
      mediaList.push(mediaRealmDataToEntity(media));
    });
  }

  return {
    courseTaskId: data?._id ? data?._id.toString() : "",
    courseId: data?.courseId ?? "",
    title: data?.title ?? "",
    index: data?.index ?? 0,
    description: data?.description ?? "",
    mediaList: mediaList,
    createdAt: data?.createdAt ?? new Date(),
    updatedAt: data?.updatedAt ?? null,
    deletedAt: data?.deletedAt ?? null,
    disabledAt: data?.disabledAt ?? null,
  } as ICourseTask;
}

export function courseTaskFromRealmToDocumentData(courseTask: ICourseTask): any {
  const documentData = {
    _id: courseTask.courseTaskId,
    courseId: courseTask.courseId,
    title: courseTask.title,
    index: courseTask.index,
    mediaList: courseTask.mediaList,
    description: courseTask.description,
    createdAt: courseTask.createdAt,
    updatedAt: courseTask.updatedAt,
    deletedAt: courseTask.deletedAt,
    disabledAt: courseTask.disabledAt,
  };

  return documentData;
}
