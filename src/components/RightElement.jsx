import crop from "../assets/image.png";
export default function RightElement() {
  return (
    <div className="text-white  col-span-6  h-[831px]">
      <img src={crop} className="h-[830px]  absolute right-0" />
    </div>
  );
}
