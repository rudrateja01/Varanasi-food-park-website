import Navbar from "./components/Navbar.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Hero from "./components/Hero.jsx";
import Story from "./components/Story.jsx";
import ImmersiveExperiences from "./components/Experiences.jsx";
import MenuSection from "./components/MenuSection.jsx";
import Gallery from "./components/Gallery.jsx";
import Reasons from "./components/Reasons.jsx";
import Reviews from "./components/Reviews.jsx";
import InstagramSection from "./components/InstagramSection.jsx";
import Visit from "./components/Visit.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";
import OrderPage from "./components/OrderPage.jsx";
import { useRouter } from "./router.jsx";

export default function App() {
  const { path } = useRouter();

  if (path === "/order") return <OrderPage />;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Story />
        <ImmersiveExperiences />
        <MenuSection />
        <Gallery />
        <Reasons />
        <Reviews />
        <InstagramSection />
        <Visit />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
