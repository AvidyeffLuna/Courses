import ITeacherFailure from "domain/core/failures/sale/saleFailure";
import { IGetTeachersResponse } from "domain/core/response/teacher/teacherResponsesEntities";
import TeacherUseCases from "domain/useCases/teacher/teacherUseCase";
import { getSkipPagination } from "presentation/utils/pagination/paginationUtils";
import { Dispatch } from "react";

export interface ITeachersListActions {
  getTeachers: Function;
}

const getTeachers = (obj: {
    page?: number | null;
    searchQuery?: string | null;
    limit?: number | null;
}) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_TEACHERS_LOADING" });

    let sort = {
      createdAt: -1
    };

    const skip: number | null = obj.page && obj.limit ? getSkipPagination({ page: obj.page, limit: obj.limit }) : null;

    await new TeacherUseCases()
      .getTeachers({ sort, skip, limit: obj.limit, searchQuery: obj.searchQuery })
      .then((res: IGetTeachersResponse) => {
        dispatch({
          type: "GET_TEACHERS_SUCESSFUL",
          payload: { data: res.data, total: res.metadata.total, sucessful: true },
        });
      })
      .catch((error: ITeacherFailure) => {
        dispatch({ type: "GET_TEACHERS_ERROR", payload: { error: error } });
      });
};
  

export const actions = {
    getTeachers,
};
