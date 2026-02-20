import logo from "@/assets/logo-vianta-black.png";

const TopStrip = () => {
  return (
    <div className="bg-strip flex items-center px-4 py-2">
      <img src={logo} alt="Vianta" className="h-8 w-auto" />
    </div>
  );
};

export default TopStrip;
