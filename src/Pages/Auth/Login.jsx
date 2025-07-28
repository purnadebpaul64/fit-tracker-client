import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { saveUserInDb } from "../../Api/utils";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signIn, googleSignIn, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPass, setShowPass] = useState(false);
  const from = location?.state?.from?.pathname || "/";
  if (user) return <Navigate to={from} replace={true} />;
  // if (loading) return <LoadingSpinner />;
  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      //User Login
      const result = await signIn(email, password);
      const userData = {
        displayName: result?.user?.displayName,
        email: result?.user?.email,
        photoURL: result?.user?.photoURL,
      };
      await saveUserInDb(userData);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const result = await googleSignIn();
      const userData = {
        displayName: result?.user?.displayName,
        email: result?.user?.email,
        photoURL: result?.user?.photoURL,
      };
      await saveUserInDb(userData);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Helmet>
        <title>Login - FitTracker</title>
      </Helmet>
      <div className="flex items-center mb-3 text-white">
        <Link
          to="/"
          className="flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
      <div class="relative flex flex-col rounded-xl p-6 text-white border border-slate-300 bg-white/5">
        <h4 class="block text-xl font-medium text-center">Login</h4>

        <form onSubmit={handleSubmit} class="mt-8 mb-2">
          <div class="mb-2 flex flex-col gap-6">
            <div class="w-full">
              <label class="block mb-1 text-sm ">Email</label>
              <input
                type="email"
                name="email"
                class="w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Email"
              />
            </div>
            <div class="w-full">
              <label class="block mb-1 text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  class="w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Your Password"
                />
                <div
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                  className="absolute top-2 right-2"
                >
                  {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full text-white mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-blue-500/25 border border-white/20 backdrop-blur-sm"
          >
            Login
          </Button>
          <div className="flex items-center gap-4 my-3">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-white/75 text-sm">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <Button
            onClick={handleGoogleSignIn}
            className="flex gap-2 w-full justify-center bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </Button>
          <p class="flex justify-center mt-6 text-sm text-white/75">
            Dont’t Have An Account ?
            <Link
              to={"/auth/register"}
              class="ml-1 text-sm font-semibold text-blue-300 underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
