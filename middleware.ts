import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { unauthRoutes } from "presentation/routes/UnauthRoutes/unauthRoutes";
import { adminProtectedRoutes, protectedRoutes, teacherProtectedRoutes } from "presentation/routes/ProtectedRoutes/protectedRoutes";
import { UserRolesEnum } from "presentation/enum/user/userRolesEnum";
import { MainRoutesEnum } from "presentation/routes/mainRoutes";
import { TeacherDashboardRoutesEnum } from "presentation/routes/TeacherRoutes/dashboardRoutes";
import { TeacherAccountRoutesEnum } from "presentation/routes/TeacherRoutes/accountRoutes";
import { AdminDashboardRoutesEnum } from "presentation/routes/AdminRoutes/dashboardRoutes";
import { AdminAccountRoutesEnum } from "presentation/routes/AdminRoutes/accountRoutes";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token") ?? null;
    const role = req.cookies.get("role") ?? null;
    const url = req.nextUrl;

    if (url.pathname === "/" && token && UserRolesEnum.Teacher === role) return NextResponse.redirect(new URL(TeacherDashboardRoutesEnum.Dashboard, url));

    if (url.pathname === "/" && token && UserRolesEnum.Admin === role) return NextResponse.redirect(new URL(AdminDashboardRoutesEnum.Dashboard, url));

    for (let i = 0; i < unauthRoutes.length; i++) {
        if (url.pathname === unauthRoutes[i] && token && UserRolesEnum.User === role) return NextResponse.redirect(new URL(MainRoutesEnum.Init, url));

        if (url.pathname === unauthRoutes[i] && token && UserRolesEnum.Teacher === role) return NextResponse.redirect(new URL(TeacherDashboardRoutesEnum.Dashboard, url));
    
        if (url.pathname === unauthRoutes[i] && token && UserRolesEnum.Admin !== role) return NextResponse.redirect(new URL(AdminDashboardRoutesEnum.Dashboard, url))
    }

    for (let p = 0; p < protectedRoutes.length; p++) {
        if (url.pathname === protectedRoutes[p] && (!token || UserRolesEnum.User !== role)) return NextResponse.redirect(new URL(MainRoutesEnum.Init, url))
    }

    for (let teacherProtectedRoute = 0; teacherProtectedRoute < teacherProtectedRoutes.length; teacherProtectedRoute++) {
        if (url.pathname === teacherProtectedRoutes[teacherProtectedRoute] && (!token || UserRolesEnum.Teacher !== role)) return NextResponse.redirect(new URL(TeacherAccountRoutesEnum.Signin, url))
    }

    for (let a = 0; a < adminProtectedRoutes.length; a++) {
        if (url.pathname === adminProtectedRoutes[a] && (!token || role !== UserRolesEnum.Admin)) return NextResponse.redirect(new URL(AdminAccountRoutesEnum.Signin, url));
    }

    return NextResponse.next();
}
