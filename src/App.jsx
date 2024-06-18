import LeftElement from "./components/LeftElement";
import Navbar from "./components/Navbar";
import RightElement from "./components/RightElement";


export default function App() {
  return (
    <div className="grid grid-cols-12 bg-[#171E25]   ">
      <Navbar isMap={false} />
      <LeftElement />
      <RightElement />
    </div>
  );
}
