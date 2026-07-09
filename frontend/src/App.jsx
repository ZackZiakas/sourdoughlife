import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Home />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
