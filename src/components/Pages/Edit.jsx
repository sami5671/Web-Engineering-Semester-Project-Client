import EditVideo from "../EditVideo/EditVideo";
import Navigation from "../Shared/Navigation";

const Edit = () => {
  return (
    <>
      <Navigation />
      <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
        <EditVideo />
      </section>
    </>
  );
};

export default Edit;
