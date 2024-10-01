import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../../Features/auth/authSlice";
import { useEffect } from "react";
import { useGetUserSaveVideoQuery } from "../../Features/saveVideo/saveVideoApi";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";
import SaveVideo from "./SaveVideo";

const SaveVideos = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { email } = user || {};

  const {
    data: videos,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useGetUserSaveVideoQuery(email);

  //  for user logged in persistency
  useEffect(() => {
    if (localStorage.length > 0) {
      const user = localStorage.getItem("auth");
      if (user) {
        dispatch(userLoggedIn(JSON.parse(user)));
      }
    }
  }, [dispatch]);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && videos?.length === 0) {
    content = <Error message="No videos found!" />;
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => (
      <SaveVideo key={video._id} video={video} />
    ));
  }
  // ----------------------------------------------------------------
  return content;
};

export default SaveVideos;
