import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import editImg from "../../assets/edit.svg";
import deleteImg from "../../assets/delete.svg";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import likeSuccessImg from "../../assets/likeSuccess.png";
import dislikeSuccessImg from "../../assets/dislikeSuccess.png";
import Error from "../ui/Error";
import { ImSpinner } from "react-icons/im";
import { useDeleteVideoMutation } from "../../Features/admin/videoControlApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  useDisLikeVideoMutation,
  useLikeVideoMutation,
} from "../../Features/LikeDislike/LikeDislikeApi";
import { MdOutlineFavorite } from "react-icons/md";
import { useSaveUserVideoMutation } from "../../Features/saveVideo/saveVideoApi";

const Description = ({ video }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { email, status } = user || {};
  const { title, date, _id, description, likeEmail, dislikeEmail } = video;

  // console.log(likeEmail, dislikeEmail);

  const [deleteVideo, { isSuccess, isLoading, isError }] =
    useDeleteVideoMutation();
  const [
    likeVideo,
    { isSuccess: likeSuccess, isLoading: likeLoading, error: likeError },
  ] = useLikeVideoMutation();
  const [
    disLikeVideo,
    {
      isSuccess: disLikeSuccess,
      isLoading: disLikeLoading,
      error: disLikeError,
    },
  ] = useDisLikeVideoMutation();

  const [
    saveUserVideo,
    {
      isLoading: saveVideoLoading,
      isSuccess: saveVideoSuccess,
      error: saveVideoError,
    },
  ] = useSaveUserVideoMutation();
  // ----------------------------------------------------------------
  const isLikedByMe = likeEmail?.includes(email);
  const isdisLikedByMe = dislikeEmail?.includes(email);

  // ----------------------------------------------------------------

  const handleDelete = () => {
    if (_id) {
      deleteVideo(_id);
    }
  };

  const handleLike = () => {
    // console.log(email, _id);
    likeVideo({ email, _id });
  };
  const handleDisLike = () => {
    // console.log(email, _id);
    disLikeVideo({ email, _id });
  };
  const handleSaveVideo = () => {
    // console.log(email, _id);
    saveUserVideo({ _id, email });
  };

  // for like
  useEffect(() => {
    if (likeSuccess) {
      toast.success("Like video successfully");
    } else if (likeError) {
      toast.error(likeError?.data?.message);
    }
  }, [likeSuccess, likeError]);

  // for dislike
  useEffect(() => {
    if (disLikeSuccess) {
      toast.success("disliked video successfully");
    } else if (disLikeError) {
      toast.error(disLikeError?.data?.message);
    }
  }, [disLikeError, disLikeSuccess]);

  // for save video
  useEffect(() => {
    if (saveVideoSuccess) {
      toast.success("Video successfully Saved");
    } else if (saveVideoError) {
      toast.error(saveVideoError?.data?.message);
    }
  }, [saveVideoSuccess, saveVideoError]);

  // delete video
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-800">
        {title}
      </h1>
      <div className="pb-4 flex items-center space-between border-b gap-4">
        <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
          Uploaded on {date}
          <div className="mt-2">
            <button
              onClick={handleSaveVideo}
              className="hover:text-red-500 font-semibold border-2 rounded-full px-2"
            >
              <span className="flex items-center lg:text-[16px] gap-1">
                Save
                {saveVideoLoading ? (
                  <ImSpinner className="text-green-800 font-bold text-xl" />
                ) : (
                  <MdOutlineFavorite className="mt-1 " />
                )}
              </span>
            </button>
          </div>
        </h2>

        <div className="flex gap-6 w-full justify-end">
          {status === "admin" ? (
            <>
              <div className="flex gap-1 items-centers">
                <div className="shrink-0">
                  <Link to={`/editVideo/${_id}`}>
                    <img className="w-5 block" src={editImg} alt="Edit" />
                  </Link>
                </div>
                <Link to={`/editVideo/${_id}`}>
                  <span className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                    Edit
                  </span>
                </Link>
              </div>
              <div
                onClick={handleDelete}
                className="flex gap-1 items-center cursor-pointer"
              >
                <div className="shrink-0">
                  {isLoading ? (
                    <ImSpinner className="text-red-500 font-bold text-xl" />
                  ) : (
                    <img className="w-5 block" src={deleteImg} alt="Delete" />
                  )}
                </div>
                <div className="text-sm leading-[1.7142857] text-slate-600 ">
                  Delete
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-1 items-centers">
                {isLikedByMe === true ? (
                  <div onClick={handleLike} className="shrink-0">
                    <Link className="flex items-center gap-1">
                      <img
                        className="w-5 block"
                        src={likeSuccessImg}
                        alt="like"
                      />
                      <span className="text-sm leading-[1.7142857] text-slate-600 ">
                        Like {likeEmail?.length}
                      </span>
                    </Link>
                  </div>
                ) : (
                  <div onClick={handleLike} className="shrink-0">
                    <Link className="flex items-center gap-1">
                      {likeLoading ? (
                        <>
                          <ImSpinner className="text-green-800 font-bold text-xl" />
                        </>
                      ) : (
                        <img className="w-5 block" src={like} alt="like" />
                      )}
                      <span className="text-sm leading-[1.7142857] text-slate-600 ">
                        Like {likeEmail?.length}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
              <div
                onClick={handleDisLike}
                className="flex gap-1 items-center cursor-pointer"
              >
                <div className="shrink-0">
                  {isdisLikedByMe === true ? (
                    <div onClick={handleDisLike} className="shrink-0">
                      <Link className="flex items-center gap-1">
                        <img
                          className="w-5 block"
                          src={dislikeSuccessImg}
                          alt="like"
                        />
                        <span className="text-sm leading-[1.7142857] text-slate-600 ">
                          Dislike
                        </span>
                      </Link>
                    </div>
                  ) : (
                    <div onClick={handleDisLike} className="shrink-0">
                      <Link className="flex items-center gap-1">
                        {disLikeLoading ? (
                          <>
                            <ImSpinner className="text-red-800 font-bold text-xl" />
                          </>
                        ) : (
                          <img className="w-5 block" src={dislike} alt="like" />
                        )}
                        <span className="text-sm leading-[1.7142857] text-slate-600 ">
                          Dislike
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* save */}

      <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
        {description}
      </div>
      {!isLoading && isError && (
        <Error message="There was an error deleting the video!" />
      )}
    </div>
  );
};

export default Description;
