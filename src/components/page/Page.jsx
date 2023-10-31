import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";

const Page = () => {
  return (
    <>
      <Header />
        <Outlet /> 
        {/* 10ая строка это внутренный роут в App.js */}
      <Footer />
    </>
  );
};

export default Page;
