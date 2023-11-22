import { AdminDashboardRoutesEnum } from "../AdminRoutes/dashboardRoutes";
import { AdminSalesRoutesEnum } from "../AdminRoutes/salesRoutes";
import { AdminTeachersRoutesEnum } from "../AdminRoutes/teachersRoutes";
import { AdminUsersRoutesEnum } from "../AdminRoutes/usersRoutes";
import { CoursesRoutesEnum, CoursesUserRoutesEnum, CoursesWorkRoutesEnum } from "../coursesRoutes";
import { NotificationsRoutesEnum } from "../notificationsRoutes";
import { PaymentsRoutesEnum } from "../paymentsRoutes";
import { ShoppingCartRoutesEnum } from "../shoppingCartRoutes";
import { TeacherCoursesRoutesEnum } from "../TeacherRoutes/coursesRoutes";
import { TeacherDashboardRoutesEnum } from "../TeacherRoutes/dashboardRoutes";
import { TeacherNotificationsRoutesEnum } from "../TeacherRoutes/notificationsRoutes";
import { TransactionsRoutesEnum } from "../transactionsRoutes";

export const protectedRoutes = [
    ShoppingCartRoutesEnum.ShoppingCart,
    PaymentsRoutesEnum.PaymentMethods,
    PaymentsRoutesEnum.MobilePaymentMethod,
    PaymentsRoutesEnum.TransferMethod,
    PaymentsRoutesEnum.ZelleMethod,
    TransactionsRoutesEnum.TransactionsList,
    TransactionsRoutesEnum.TransactionsView,
    CoursesUserRoutesEnum.CoursesList,
    CoursesUserRoutesEnum.CoursesView,
    CoursesWorkRoutesEnum.CoursesWork,
    NotificationsRoutesEnum.Notifications,
    CoursesRoutesEnum.CoursesWhiteList
];

export const teacherProtectedRoutes = [
    TeacherDashboardRoutesEnum.Dashboard,
    TeacherCoursesRoutesEnum.CoursesList,
    TeacherCoursesRoutesEnum.CoursesView,
    TeacherCoursesRoutesEnum.CoursesCreate,
    TeacherCoursesRoutesEnum.CoursesLessonsItemsCreate,
    TeacherCoursesRoutesEnum.CoursesLessonsItemsEdit,
    TeacherCoursesRoutesEnum.CoursesTasksCreate,
    TeacherNotificationsRoutesEnum.Notifications
];

export const adminProtectedRoutes = [
    AdminDashboardRoutesEnum.Dashboard,
    AdminSalesRoutesEnum.SalesList,
    AdminSalesRoutesEnum.SalesView,
    AdminUsersRoutesEnum.UsersList,
    AdminUsersRoutesEnum.UsersCreate,
    AdminTeachersRoutesEnum.TeachersList,
    AdminTeachersRoutesEnum.TeachersCreate
];
