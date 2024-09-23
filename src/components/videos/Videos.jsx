import VideoLoader from "./../ui/loaders/VideoLoader";
import Error from "./../ui/Error";
import Video from "./Video";
import { useGetVideosQuery } from "../../Features/videos/videosApi";

const Videos = () => {
  // ----------------------------------------------------------------
  const { data: videos, isError, isLoading, isSuccess } = useGetVideosQuery();

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
    content = videos.map((video) => <Video key={video._id} video={video} />);
  }
  // ----------------------------------------------------------------
  return content;
};

export default Videos;
