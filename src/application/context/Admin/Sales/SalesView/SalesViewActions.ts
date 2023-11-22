import { ICourse, ICourseTask, ICourseUser, ICourseUserTask } from "domain/core/entities/courseEntity";
import { INotification } from "domain/core/entities/notificationEntity";
import { ISale } from "domain/core/entities/saleEntity";
import ISaleFailure from "domain/core/failures/sale/saleFailure";
import { IGetCoursesTasksResponse } from "domain/core/response/course/courseResponsesEntities";
import { IGetSaleByIdResponse } from "domain/core/response/sale/saleResponsesEntities";
import CourseTasksUseCases from "domain/useCases/course/courseTasksUseCases";
import CourseUseCases from "domain/useCases/course/courseUseCases";
import CourseUsersUseCases from "domain/useCases/course/courseUsersUseCases";
import NotificationUseCases from "domain/useCases/notification/notificationUseCases";
import SaleUseCases from "domain/useCases/sale/saleUseCases";
import SalesUseCases from "domain/useCases/sale/saleUseCases";
import TransactionUseCases from "domain/useCases/transaction/transactionUseCases";
import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { Dispatch } from "react";

export interface ISalesViewActions {
  getSaleById: Function;
  approvedSale: Function;
  rejectedSale: Function;
}

const getSaleById = (obj: {
    saleId: string
}) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_SALE_BY_ID_LOADING" });

    await new SalesUseCases()
      .getSaleById({ saleId: obj.saleId })
      .then((res: IGetSaleByIdResponse) => {
        dispatch({
          type: "GET_SALE_BY_ID_SUCESSFUL",
          payload: { data: res.data, total: res.metadata.total, sucessful: true },
        });
      })
      .catch((error: ISaleFailure) => {
        dispatch({ type: "GET_SALE_BY_ID_ERROR", payload: { error: error } });
      });
};


const approvedSale = (obj: { sale: ISale; comment: string }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_APPROVED_SALE_LOADING" });

    await new SaleUseCases().approvedSale({ saleId: obj.sale.saleId, comment: obj.comment });

    if (obj.sale.courses) {
      await Promise.all(obj.sale.courses.map(async (courseId: string) => {
        const courseTasks: IGetCoursesTasksResponse = await new CourseTasksUseCases().getCoursesTasks({ courseId: courseId });

        const tasks: ICourseUserTask[] = [];

        if (courseTasks.data.length > 0) {
          courseTasks.data.forEach((courseTask: ICourseTask) => {
            const task: ICourseUserTask = {
              taskId: courseTask.courseTaskId,
              isCompleted: false
            }

            tasks.push(task);
          })
        }

        const courseUser: ICourseUser = {
          courseUserId: "",
          userId: obj.sale.userId,
          isCompleted: false,
          tasks: tasks,
          courseId: courseId,
          createdAt: new Date()
        }
    
        await new CourseUsersUseCases().createCourseUser({ courseUser: courseUser });
      }));
    }

    const notification: INotification = {
      notificationId: "",
      userId: obj.sale.userId ?? "",
      teacherId: "",
      to: "user",
      title: `Tu pago ha sido aprobado`,
      description: `Tu pago por un monto de ${getNumberFormat({ value: obj.sale.amount, style: "currency" })} ha sido aprobado`,
      url: "/transacciones",
      createdAt: new Date()
    }

    await new NotificationUseCases().createNotification({ notification });

    dispatch({
      type: "UPDATE_APPROVED_SALE_SUCESSFUL",
      payload: { sucessful: true },
    });
  } catch (error) {
    dispatch({ type: "UPDATE_APPROVED_SALE_ERROR", payload: { error: error } });
  }
};

const rejectedSale = (obj: { sale: ISale; comment: string }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_REJECTED_SALE_LOADING" });

    await new SaleUseCases().rejectedSale({ saleId: obj.sale.saleId, comment: obj.comment });

    const notification: INotification = {
      notificationId: "",
      userId: obj.sale.userId ?? "",
      teacherId: "",
      to: "user",
      title: `Tu pago ha sido rechazado`,
      description: `Tu pago por un monto de ${getNumberFormat({ value: obj.sale.amount, style: "currency" })} ha sido rechazado`,
      url: "/transacciones",
      createdAt: new Date()
    }

    await new NotificationUseCases().createNotification({ notification });

    dispatch({
      type: "UPDATE_REJECTED_SALE_SUCESSFUL",
      payload: { sucessful: true },
    });
  } catch (error) {
    dispatch({ type: "UPDATE_REJECTED_SALE_ERROR", payload: { error: error } });
  }
};

export const actions = {
    getSaleById,
    approvedSale,
    rejectedSale
};
