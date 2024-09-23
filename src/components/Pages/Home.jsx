import { useEffect } from "react";
import Navigation from "../Shared/Navigation";
import Videos from "../videos/Videos";
import { userLoggedIn } from "../../Features/auth/authSlice";
import { useDispatch } from "react-redux";

const Home = () => {
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
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          <Videos />
        </div>
      </section>
    </>
  );
};

export default Home;
