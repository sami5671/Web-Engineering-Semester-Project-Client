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
    element: <Add />,
  },
  {
    path: "/uploadVideo",
    element: <UploadVideo />,
  },
  {
    path: "/editVideo/:videoId",
    element: <Edit />,
  },
  {
    path: "/saveVideo",
    element: <UserSaveVideo />,
  },
  {
    path: "/userAccess",
    element: <UserAccessRequestList />,
  },
]);

export default router;
