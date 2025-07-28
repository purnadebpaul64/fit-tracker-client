import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage/HomePage";
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import BecomeTrainer from "../Pages/Dashboard/Trainer/BecomeTrainer";
import AllTrainers from "../Pages/AllTrainers/AllTrainers";
import TrainerDetail from "../Pages/TrainerDetail/TrainerDetail";
import AddSlot from "../Components/Dashboard/Trainer/AddSlot";
import AddClass from "../Components/Dashboard/Admin/AddClass";
import TrainerBooked from "../Pages/TrainerBooked/TrainerBooked";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import BookingSuccess from "../Pages/BookingSuccess/BookingSuccess";
import AllClasses from "../Pages/AllClasses/AllClasses";
import AddForumForm from "../Components/Dashboard/Trainer/AddForumForm";
import ForumsPage from "../Pages/Community/ForumsPage";
import ForumDetailPage from "../Pages/Community/ForumDetailPage";
import ManageSlots from "../Components/Dashboard/Trainer/ManageSlots";
import ActivityLog from "../Components/Dashboard/Member/ActivityLog";
import BookedTrainerPage from "../Components/Dashboard/Member/BookedTrainerPage";
import ProfilePage from "../Components/Dashboard/Member/ProfilePage";
import NewsletterSubscribers from "../Components/Dashboard/Admin/NewsletterSubscribers";
import AdminAllTrainers from "../Components/Dashboard/Admin/AdminAllTrainers";
import AppliedTrainersList from "../Components/Dashboard/Admin/AppliedTrainersList";
import AppliedTrainerDetails from "../Components/Dashboard/Admin/AppliedTrainerDetails";
import AdminBalance from "../Components/Dashboard/Admin/AdminBalance";
import ClassDetails from "../Pages/AllClasses/ClassDetails";
import ProfileUpdate from "../Pages/ProfileUpdate/ProfileUpdate";
import AdminRoute from "./AdminRoute";
import TrainerRoute from "./TrainerRoute";
import ATRoute from "./ATRoute";
import UserRoute from "./UserRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/all-trainers",
        element: <AllTrainers></AllTrainers>,
      },
      {
        path: "/trainer-detail/:id",
        element: <TrainerDetail></TrainerDetail>,
      },
      {
        path: "/become-trainer",
        element: (
          <PrivateRoute>
            <BecomeTrainer />
          </PrivateRoute>
        ),
      },
      {
        path: "/book-session/:id",
        element: <TrainerBooked></TrainerBooked>,
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <UserRoute>
              <PaymentPage></PaymentPage>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/booking-success",
        element: <BookingSuccess></BookingSuccess>,
      },
      {
        path: "/all-classes",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/class-detail/:id",
        element: <ClassDetails></ClassDetails>,
      },
      {
        path: "/community",
        element: <ForumsPage></ForumsPage>,
      },
      {
        path: "/forums/:id",
        element: <ForumDetailPage></ForumDetailPage>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfileUpdate></ProfileUpdate>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-new-slot",
        element: (
          <PrivateRoute>
            <TrainerRoute>
              <AddSlot></AddSlot>
            </TrainerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-new-class",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddClass></AddClass>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-new-forum",
        element: (
          <PrivateRoute>
            <ATRoute>
              <AddForumForm></AddForumForm>
            </ATRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-slots",
        element: (
          <PrivateRoute>
            <TrainerRoute>
              <ManageSlots></ManageSlots>
            </TrainerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "activity-log",
        element: (
          <PrivateRoute>
            <UserRoute>
              <ActivityLog></ActivityLog>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "booked-trainer",
        element: (
          <PrivateRoute>
            <UserRoute>
              <BookedTrainerPage></BookedTrainerPage>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "your-profile",
        element: (
          <PrivateRoute>
            <UserRoute>
              <ProfilePage></ProfilePage>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "newsletter-subs",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <NewsletterSubscribers></NewsletterSubscribers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-trainers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminAllTrainers></AdminAllTrainers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "applied-trainer",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AppliedTrainersList></AppliedTrainersList>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "applied-trainers/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AppliedTrainerDetails></AppliedTrainerDetails>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "balance",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminBalance></AdminBalance>,
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
