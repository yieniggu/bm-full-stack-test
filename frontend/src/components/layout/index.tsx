import { Toaster } from "react-hot-toast";
import Header from "./Header";

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-col w-full h-full p-4 min-w-screen min-h-screen">
      <Toaster position="top-right" />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
