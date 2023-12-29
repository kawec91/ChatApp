import react from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./Components/Pages/LandingPage/LandingPage";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import RegisterPage from "./Components/Pages/RegisterPage/RegisterPage";
import Faq from './Components/Pages/Faq/Faq';
import PrivacyPolicy from "./Components/Pages/PrivacyPolicy/PrivacyPolicy";
import Contact from "./Components/Pages/Contact/Contact";
import Carrer from "./Components/Pages/Carrer/Carrer";
import AppLayout from "./Components/AppPages/AppLayout/AppLayout";
import ChangeLog from "./Components/AppPages/ChangeLog/ChangeLog";
import Main from './Components/Main/Main';
import AppMessages from './Components/AppPages/AppMessages/AppMessages';
import AppChat from './Components/AppPages/AppChat/AppChat';
import AppSettings from './Components/AppPages/AppSettings/AppSettings';
import AppLogout from "./Components/AppPages/AppLogout/AppLogout";
import AppAdmin from "./Components/AppPages/AppAdmin/AppAdmin";
import AppSearchUser from "./Components/AppPages/AppSearchUser/AppSearchUser";
import AppAdminOfferts from "./Components/AppPages/AppAdminOfferts/AppAdminOfferts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/carrer" element={<Carrer />} />
        <Route path="/app/" element={<AppLayout />}>
          <Route path="/app/" element={<Main />}>
            <Route path="/app/" element={<ChangeLog />} />
            <Route path="/app/messages" element={<AppMessages />} />
            <Route path="/app/chat" element={<AppChat />} />
            <Route path="/app/settings" element={<AppSettings />} />
            <Route path="/app/search" element={<AppSearchUser />} />
            <Route path="/app/admin" element={<AppAdmin />}>
              <Route path="/app/admin" element={<AppAdminOfferts />} />
            </Route>
          </Route>
        </Route>
        <Route path="/logout" element={<AppLogout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
