import SaveVideos from "../SaveVideos/SaveVideos";
import Navigation from "../Shared/Navigation";

const UserSaveVideo = () => {
  return (
    <>
      <Navigation />
      <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-red-800 font-semibold text-xl mb-6">
            Your Save Videos
          </h1>
        </div>
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          <SaveVideos />
        </div>
      </section>
    </>
  );
};

export default UserSaveVideo;
