import { ReactNode } from "react";


export const metadata = {
  title: "Sign Up",
  description: "Be a part of the SUGBUK Family",
  keywords: "SUGBUK, Bayero University, Kano, Student Union Government, Sign Up",
  // authors: [
  //   {
  //     name: "SUGBUK",
  //     url: "https://sugbuk.com",
  //   },
  // ],
  // openGraph: {
  //   title: "Join SUG-BUK",
  //   description: "Be a part of the SUGBUK Family",
  //   url: "https://sugbuk.com",
  //   siteName: "SUGBUK",
  //   images: [
  //     {
  //       url: "https://sugbuk.com/images/logo.png",
  //       width: 800,
  //       height: 600,
  //       alt: "SUGBUK Logo",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
}

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default layout;