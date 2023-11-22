import {
  AuthContext,
  IAuthContext,
} from "application/context/Auth/AuthContext";
import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Courses/CoursesView/CoursesViewContext";
import { ICourse } from "domain/core/entities/courseEntity";
import { useRouter } from "next/router";
import { AccountRoutesEnum } from "presentation/routes/accountRoutes";
import { useContext, useState, useEffect } from "react";
import { Button, Toast } from "react-bootstrap";

interface IAddToWhiteListProps {
  course: ICourse;
}

export default function AddToWhiteList({ course }: IAddToWhiteListProps) {
  const router = useRouter();

  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: user } = authState.user;

  const { state, actions, dispatch } =
    useContext<ICoursesViewContext>(CoursesViewContext);
  const { addCourseToWhiteList } = actions;
  const { sucessful, error, loading } = state.addCourseToWhiteList;

  const [isFavourite, setIsFavourite] = useState(course.isFavorite);
  const [showToastError, setShowToastError] = useState(false)

  useEffect(() => {
   if (!loading && sucessful) setIsFavourite(!isFavourite) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sucessful, loading])

  useEffect(() => {
    if (error) {
      setShowToastError(true);

      setTimeout(() => {
        setShowToastError(false);
      }, 3000);
    }
  }, [error])

  const handleAddCourseToWhiteList = () => {
    if (!user) {
      router.push({
        pathname: AccountRoutesEnum.Signin,
        query: { redirectUrl: window.decodeURIComponent(
          window.location.origin + window.location.pathname
        ) }
      });
      return;
    }

    addCourseToWhiteList({ userId: user.userId, courseId: course.courseId })(dispatch);
  }

  return (
    <>
    <Button onClick={() => handleAddCourseToWhiteList()} disabled={loading} variant="" className="py-0 px-0">
      <div className="d-flex">
        <div className="me-3">
          <i className={isFavourite ? "fa-solid fa-heart icon-danger" : "fa-regular fa-heart icon-dark"} />
        </div>

        <div>
          <p>{isFavourite ? "Remover curso de mi lista de deseos" : 'Añadir curso a mi lista de deseos'}</p>
        </div>
      </div>
    </Button>

    {showToastError && (
      <Toast className="toast toast-error" style={{ position: "fixed", left: '40px', bottom: '40px' }}>    
        <Toast.Body>Algo ha salido mal. Intentalo nuevamente.</Toast.Body>
      </Toast>
    )}
    </>
  );
}
