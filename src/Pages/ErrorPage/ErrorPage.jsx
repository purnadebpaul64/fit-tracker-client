import { Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-center px-6">
      <Helmet>
        <title>404 | Not Found</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Typography className="text-8xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold mb-2">
          404
        </Typography>
        <Typography variant="h4" className="mb-4 text-white">
          Page Not Found
        </Typography>
        <Typography className="mb-6 text-white/75 max-w-md">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </Typography>

        <Link to="/">
          <Button
            size="lg"
            className="rounded-full shadow-md cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded"
          >
            Go to Homepage
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default ErrorPage;
