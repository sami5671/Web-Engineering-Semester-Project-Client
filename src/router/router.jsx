import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Pages/Home";
import Video from "../components/Pages/Video";
import Add from "../components/Pages/Add";
import Edit from "../components/Pages/Edit";
import Login from "../components/Pages/Login";
import Register from "../components/Pages/Register";
import UserSaveVideo from "../components/Pages/UserSaveVideo";

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
    path: "/editVideo/:videoId",
    element: <Edit />,
  },
  {
    path: "/saveVideo",
    element: <UserSaveVideo />,
  },
]);

export default router;
