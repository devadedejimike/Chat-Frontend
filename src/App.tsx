import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./assets/LandingPage";
import AuthPage from "./Pages/Auth";
import Chat from "./Pages/ChatPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;