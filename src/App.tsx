//Redux
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

//Files
import Header from "@/features/Header";
import Hotels from "./features/Hotels";
import Loading from "./components/Loading";

const App = () => {
  const { loading, hotels } = useSelector((state: RootState) => state.hotels);
  return (
    <div>
      <Header />
      {loading ? <Loading /> : hotels.length > 0 && <Hotels />}
    </div>
  );
};

export default App;
