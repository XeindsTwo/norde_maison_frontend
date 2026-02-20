import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import AboutMain from "@/pages/About/AboutMain/AboutMain.jsx";
import AboutFeatures from "@/pages/About/AboutFeatures/AboutFeatures.jsx";
import AboutContact from "@/pages/About/AboutContact/AboutContact.jsx";

const About = () => {
  return (
    <>
      <Header/>
      <main>
        <AboutMain/>
        <AboutFeatures/>
        <AboutContact/>
      </main>
      <Footer/>
    </>
  );
};

export default About;