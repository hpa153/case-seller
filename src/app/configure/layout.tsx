import { ReactNode } from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UploadSteps from "@/components/UploadSteps";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper classes="flex flex-1 flex-col">
      <UploadSteps />
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
