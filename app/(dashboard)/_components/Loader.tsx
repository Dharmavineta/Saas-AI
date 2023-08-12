import Image from "next/image";

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-28 h-28 relative animate-spin">
        <Image alt="logo" fill src={"/assets/loader.png"} />
      </div>
      <h1 className="text-muted-foreground">Loading...</h1>
    </div>
  );
};

export default Loader;
