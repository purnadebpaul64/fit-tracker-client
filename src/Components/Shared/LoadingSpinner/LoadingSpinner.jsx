import { ScaleLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[100vh]"}
      flex 
      flex-col 
      justify-center 
      items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`}
    >
      <ScaleLoader size={100} color="white" />
    </div>
  );
};

export default LoadingSpinner;
