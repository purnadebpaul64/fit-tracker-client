import { ScaleLoader } from "react-spinners";

const LoadingSpinner2 = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[100vh]"}
      flex 
      flex-col 
      justify-center 
      items-center`}
    >
      <ScaleLoader size={100} color="black" />
    </div>
  );
};

export default LoadingSpinner2;
