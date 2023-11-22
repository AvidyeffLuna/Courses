import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCoursesResponse } from "domain/core/response/course/courseResponsesEntities";
import CoursesUseCases from "domain/useCases/course/courseUseCases";
import { getSkipPagination } from "presentation/utils/pagination/paginationUtils";
import { Dispatch } from "react";

export interface ICoursesListActions {
  getCourses: Function;
}

const getCourses = (obj: {
    teacherId: string;
    minPrice?: number | null;
    maxPrice?: number | null;
    page?: number | null;
    searchQuery?: string | null;
    limit?: number | null;
  }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_COURSES_LOADING" });

    let sort = null;

    const skip: number | null = obj.page && obj.limit ? getSkipPagination({ page: obj.page, limit: obj.limit }) : null;

    await new CoursesUseCases()
      .getCourses({ sort, skip, limit: obj.limit, teacherId: obj.teacherId, minPrice: obj.minPrice, maxPrice: obj.maxPrice, searchQuery: obj.searchQuery })
      .then((res: IGetCoursesResponse) => {
        dispatch({
          type: "GET_COURSES_SUCESSFUL",
          payload: { data: res.data, total: res.metadata.total, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "GET_COURSES_ERROR", payload: { error: error } });
      });
  };
  

export const actions = {
    getCourses,
};
