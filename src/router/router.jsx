import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Pages/Home";
import Video from "../components/Pages/Video";
import Add from "../components/Pages/Add";
import Edit from "../components/Pages/Edit";
import Login from "../components/Pages/Login";
import Register from "../components/Pages/Register";
import UserSaveVideo from "../components/Pages/UserSaveVideo";
import UploadVideo from "../components/AddVideo/UploadVideo";
import UserAccessRequestList from "../components/Pages/UserAccessRequestList";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/videos/:videoId",
    element: <Video />,
  },
  {
    path: "/addVideo",
    element: (
      <ModeratorRoute>
        <Add />
      </ModeratorRoute>
    ),
  },
  {
    path: "/uploadVideo",
    element: (
      <ModeratorRoute>
        <UploadVideo />
      </ModeratorRoute>
    ),
  },
  {
    path: "/editVideo/:videoId",
    element: (
      <ModeratorRoute>
        <Edit />
      </ModeratorRoute>
    ),
  },
  {
    path: "/saveVideo",
    element: <UserSaveVideo />,
  },
  {
    path: "/userAccess",
    element: (
      <AdminRoute>
        <UserAccessRequestList />
      </AdminRoute>
    ),
  },
]);

export default router;
