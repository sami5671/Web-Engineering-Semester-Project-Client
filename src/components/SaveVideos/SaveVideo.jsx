import { Link } from "react-router-dom";
import authorImage from "../../assets/author.jpg";
import { MdDelete } from "react-icons/md";
import { useDeleteUserSaveVideoMutation } from "../../Features/saveVideo/saveVideoApi";
import { useSelector } from "react-redux";
import { ImSpinner } from "react-icons/im";

const SaveVideo = ({ video }) => {
  const { _id, title, duration, author, views, date, thumbnail } = video;
  const user = useSelector((state) => state.auth.user);
  const { email } = user || {};

  const [deleteUserSaveVideo, { isLoading, isError, isSuccess, error }] =
    useDeleteUserSaveVideoMutation();

  const handleDeleteVideo = () => {
    console.log(_id, email);
    deleteUserSaveVideo({ _id, email });
  };

  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03]">
        <div className="w-full flex flex-col">
          <div className="relative">
            <Link to={`/videos/${_id}`}>
              <img
                src={thumbnail}
                className="w-full h-auto hover:rounded-none rounded-xl"
                alt={title}
              />
            </Link>

            <p className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">
              {duration}
            </p>
          </div>

          <div className="flex flex-row mt-2 gap-2">
            <img
              src={authorImage}
              className="rounded-full h-6 w-6 shrink-0"
              alt={author}
            />
            <div className="flex flex-col">
              <Link to={`/videos/${_id}`}>
                <p className="text-slate-900 text-sm font-semibold">{title}</p>
              </Link>
              <span className="text-gray-400 text-xs hover:text-gray-600">
                {author}
              </span>
              <p className="text-gray-400 text-xs">
                {views} views . {date}
              </p>
              <div className="flex justify-end -mt-4">
                <span
                  onClick={handleDeleteVideo}
                  className="cursor-pointer text-2xl hover:text-red-500 hover:animate-pulse"
                >
                  {isLoading ? (
                    <ImSpinner className="animate-spin" />
                  ) : (
                    <MdDelete />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveVideo;
