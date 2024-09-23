import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import editImg from "../../assets/edit.svg";
import deleteImg from "../../assets/delete.svg";
import Error from "../ui/Error";
import { ImSpinner } from "react-icons/im";
import { useDeleteVideoMutation } from "../../Features/admin/videoControlApi";

const Description = ({ video }) => {
  const navigate = useNavigate();
  const { title, date, _id, description } = video;

  // console.log(_id);

  const [deleteVideo, { isSuccess, isLoading, isError }] =
    useDeleteVideoMutation();

  const handleDelete = () => {
    if (_id) {
      deleteVideo(_id);
    }
  };

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
        </h2>

        <div className="flex gap-6 w-full justify-end">
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
        </div>
      </div>

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
