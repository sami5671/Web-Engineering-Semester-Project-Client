import AddVideo from "../AddVideo/AddVideo";
import Navigation from "../Shared/Navigation";

const Add = () => {
  return (
    <>
      <Navigation />
      <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
        <AddVideo />
      </section>
    </>
  );
};

export default Add;
