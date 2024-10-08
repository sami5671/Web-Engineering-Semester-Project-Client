import { useParams } from "react-router-dom";
import PlayerLoader from "./../ui/loaders/PlayerLoader";
import DescriptionLoader from "./../ui/loaders/DescriptionLoader";
import Error from "../ui/Error";
import Player from "./../video/Player";
import Description from "../video/Description";
import RelatedVideos from "../video/related/RelatedVideos";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader";
import Navigation from "../Shared/Navigation";
import { useGetVideoQuery } from "../../Features/videos/videosApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userLoggedIn } from "../../Features/auth/authSlice";

const Video = () => {
  const { videoId } = useParams();
  const { data: video, isLoading, isError } = useGetVideoQuery(videoId);

  let content = null;
  if (isLoading) {
    content = (
      <>
        <PlayerLoader />
        <DescriptionLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error!" />;
  }

  if (!isLoading && !isError && video?._id) {
    content = (
      <>
        <Player link={video.link} title={video.title} />
        <Description video={video} />
      </>
    );
  }
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.length > 0) {
      const user = localStorage.getItem("auth");
      if (user) {
        dispatch(userLoggedIn(JSON.parse(user)));
      }
    }
  }, [dispatch]);
  return (
    <>
      <Navigation />
      <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
        <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              {content}
            </div>

            {video?._id ? (
              <RelatedVideos id={video._id} title={video.title} />
            ) : isLoading ? (
              <>
                <RelatedVideoLoader />
                <RelatedVideoLoader />
                <RelatedVideoLoader />
              </>
            ) : (
              <Error message="There was an error!" />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Video;
