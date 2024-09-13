import { Check, Star } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

type UserReviewProps = {
  name: string;
  imgSrc: string;
  stars: number;
  children: ReactNode;
};

const UserReview = ({ name, imgSrc, stars, children }: UserReviewProps) => {
  return (
    <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
      <div className="flex gap-4 mt-4">
        <Image
          className="rounded-full h-12 w-12 object-cover"
          height={1000}
          width={1000}
          src={imgSrc}
          alt="user"
        />
        <div className="flex flex-col">
          <p className="font-semibold">{name}</p>
          <div className="flex gap-1.5 items-center text-zinc-600">
            <Check className="h-4 w-4 stroke-[3px] text-green-600" />
            <p className="text-sm">Verified Purchase</p>
          </div>
        </div>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="h-5 w-5 text-green-600 fill-green-600" />
        ))}
      </div>
      <div className="text-lg leading-8">{children}</div>
    </div>
  );
};

export default UserReview;
