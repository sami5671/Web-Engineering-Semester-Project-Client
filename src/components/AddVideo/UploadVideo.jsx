import { useState } from "react";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import Navigation from "../Shared/Navigation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const UploadVideo = () => {
  const user = useSelector((state) => state.auth.user);
  const { name } = user || {};

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(name);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [views, setViews] = useState("");
  const [loading, setLoading] = useState(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAuthor("");
    setImg("");
    setVideo("");
    setDate("");
    setDuration("");
    setViews("");
  };

  // cloudinary upload
  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : video);
    data.append(
      "upload_preset",
      type === "image" ? "images_preset" : "videos_preset"
    );

    try {
      let cloudName = "dgz0be5p3";
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  // ----------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Logic to handle video and image submission
    console.log("Video file:", video);
    console.log("Image file:", img);

    // upload images
    const imgUrl = await uploadFile("image");

    // upload video
    const videoUrl = await uploadFile("video");

    const data = {
      title,
      description,
      author,
      link: videoUrl,
      thumbnail: imgUrl,
      date,
      duration,
      views,
      likeEmail: [],
      dislikeEmail: [],
    };
    console.log(data);

    const result = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/videos/addVideo`,
      data
    );

    // reset all state
    resetForm();

    console.log("uploaded successfully!!");
    toast.success("Video Uploaded Successfully");
    setLoading(false);
  };

  return (
    <>
      <Navigation />
      <div className="max-w-7xl mx-auto px-5 lg:px-0 mt-12">
        <div className="flex justify-end mb-6">
          <Link to="/addVideo">
            <button className="bg-red-500 px-6 py-2 text-white rounded-lg">
              Upload Your YouTube Video
            </button>
          </Link>
        </div>
        <form onSubmit={handleSubmit} method="POST">
          <div className="shadow-lg overflow-hidden rounded-lg bg-white">
            <div className="px-8 py-10">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Add a New Video
              </h2>
              <div className="grid grid-cols-6 gap-6">
                {/* Video Title */}
                <div className="col-span-6 sm:col-span-3">
                  <TextInput
                    title="Video Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Author */}
                <div className="col-span-6 sm:col-span-3">
                  <TextInput
                    title="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="col-span-6">
                  <TextArea
                    title="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="col-span-6 flex flex-col sm:flex-row gap-6">
                  {/* Image Upload Section */}
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="img"
                      className="block mb-2 text-sm font-semibold text-gray-600"
                    >
                      Image:
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105">
                      <input
                        type="file"
                        accept="image/*"
                        id="img"
                        onChange={(e) => setImg(e.target.files[0])}
                        className="hidden"
                      />
                      <label
                        htmlFor="img"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-6-8l4 4m0 0l-4 4m4-4H4"
                          />
                        </svg>
                        <span className="mt-2 text-sm text-gray-600">
                          Upload Image file here
                        </span>
                      </label>
                      {/* Display the file path */}
                      {img && (
                        <span className="mt-4 text-sm text-gray-500">
                          Selected file: {img.name}
                        </span>
                      )}
                    </div>
                    <div className="text-center mt-2">
                      <label
                        htmlFor="img"
                        className="text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        Browse
                      </label>
                    </div>
                  </div>

                  {/* Video Upload Section */}
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="video"
                      className="block mb-2 text-sm font-semibold text-gray-600"
                    >
                      Video:
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105">
                      <input
                        type="file"
                        accept="video/*"
                        id="video"
                        onChange={(e) => setVideo(e.target.files[0])}
                        className="hidden"
                      />
                      <label
                        htmlFor="video"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-6-8l4 4m0 0l-4 4m4-4H4"
                          />
                        </svg>
                        <span className="mt-2 text-sm text-gray-600">
                          Upload Video file here
                        </span>
                      </label>
                      {/* Display the file path */}
                      {video && (
                        <span className="mt-4 text-sm text-gray-500">
                          Selected file: {video.name}
                        </span>
                      )}
                    </div>
                    <div className="text-center mt-2">
                      <label
                        htmlFor="video"
                        className="text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        Browse
                      </label>
                    </div>
                  </div>
                </div>

                {/* Upload Date */}
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <TextInput
                    title="Upload Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                {/* Video Duration */}
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <TextInput
                    title="Video Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                {/* Video Views */}
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <TextInput
                    title="Video no of views"
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="px-4 py-4 bg-gray-50 text-right">
              <button
                disabled={loading}
                type="submit"
                className="inline-flex items-center justify-center py-3 px-6 border border-transparent shadow-md text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? (
                  <FaSpinner className="animate-spin text-white" />
                ) : (
                  "Add Video"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadVideo;
