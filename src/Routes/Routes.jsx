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
        element: <BecomeTrainer />,
      },
      {
        path: "/book-session/:id",
        element: <TrainerBooked></TrainerBooked>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth",
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
        element: <AddSlot></AddSlot>,
      },
      {
        path: "add-new-class",
        element: <AddClass></AddClass>,
      },
    ],
  },
]);
