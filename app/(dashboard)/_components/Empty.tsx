import Image from "next/image";
import { FC } from "react";

type EmptyProps = {
  label: string;
};
const Empty: FC<EmptyProps> = ({ label }) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="h-72 w-72">
        <Image alt="/" height={300} width={300} src={"/assets/empty.jpg"} />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};

export default Empty;
