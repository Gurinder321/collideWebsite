import React, { useEffect } from "react";
import { useModal } from "../context/modalContext"; 
import Hero from "../views/hero";
import Layout from "../components/Layout";
import Books from "../views/books";
import BestSeller from "../views/bestseller";
import Subscribe from "../views/contact";
import About from "@/views/about";
import PopUp from "@/components/PopUp";
import Modal from "@/components/modal";
import EmailConfirmation from "@/template/email";

export default function Home() {
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrolledPercentage = (scrollTop / (docHeight - winHeight)) * 100;
  
      if (scrolledPercentage > 30 && !localStorage.getItem("modalShown")) {
        openModal(<PopUp />);
        localStorage.setItem("modalShown", "true"); 
        window.removeEventListener("scroll", handleScroll);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openModal]);

  return (
    <>
     <Layout>
      <Hero />
      <About />
      <Books />
      <BestSeller />
      <Subscribe />
      </Layout>
     
    </>
   
  );
}
