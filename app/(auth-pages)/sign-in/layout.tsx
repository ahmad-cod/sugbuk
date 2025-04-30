import { ReactNode } from "react";


export const metadata = {
  title: "Sign in",
  description: "Sign in to your SUGBUK account",
}

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default layout;