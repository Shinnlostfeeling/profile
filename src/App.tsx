import { CursorGlow } from "./components/ui/CursorGlow";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Experiments } from "./components/sections/Experiments";
import { Interests } from "./components/sections/Interests";
import { Highlights } from "./components/sections/Highlights";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <div id="top" className="page-shell">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experiments />
        <Interests />
        <Highlights />
      </main>
      <Footer />
    </div>
  );
}

export default App;
