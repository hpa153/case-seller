import Image from "next/image";

const UserImage = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <Image
      className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
      src={imgSrc}
      width={1000}
      height={1000}
      alt="user image"
    />
  );
};

export default UserImage;
