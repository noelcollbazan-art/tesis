//src/pages/Home.tsx
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import WelcomeContent from "../components/home/WelcomeContent";

const Home = () => {
  const handleOpenLogin = () => {
    // Login es manejado en Header
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-900 via-green-950 to-slate-900">
      <Header onOpenLogin={handleOpenLogin} />
      <main className="grow pt-20">
        <WelcomeContent />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
