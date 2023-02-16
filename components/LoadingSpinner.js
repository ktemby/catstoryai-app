import Lottie from "lottie-react-native";

const LoadingSpinner = () => {
  return (
    <Lottie
      source={require("../assets/77615-loading-animation-for-apps.json")}
      style={{ width: 150, height: 150 }}
      autoPlay
      loop
    />
  );
};

export default LoadingSpinner;
