import UploadingSteps from "@/components/UploadingSteps";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      <UploadingSteps />

      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
