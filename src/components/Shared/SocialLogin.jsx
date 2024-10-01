import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <div>
      <div
        // onClick={handleGoogleSignIn}
        className="flex justify-center items-center space-x-2 border m-3 p-2 bg-black text-white cursor-pointer hover:bg-slate-800"
      >
        <FcGoogle size={32} />

        <p>Continue with Google</p>
      </div>
      <div
        // onClick={handleGitHubSignIn}
        className="flex justify-center items-center space-x-2 border m-3 p-2 bg-slate-300 cursor-pointer hover:bg-slate-200"
      >
        <FaGithub size={32} />

        <p>Continue with GitHub</p>
      </div>
    </div>
  );
};

export default SocialLogin;
