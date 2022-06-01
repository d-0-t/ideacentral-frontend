import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./types/typesOfState";

import "./scss/App.css";

import ScrollToTopAndResetKeyword from "./functions/scrollToTopAndResetKeyword";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { IsUserAuthenticated } from "./functions/userAuth";
import Profile from "./pages/User/Profile";
import ProfileEdit from "./pages/User/ProfileEdit";
import ProfilePublic from "./pages/User/ProfilePublic";
import IdeaPage from "./pages/Idea/IdeaPage";
import IdeaNew from "./pages/Idea/IdeaNew";
import IdeaEdit from "./pages/Idea/IdeaEdit";
import IdeasPublic from "./pages/Idea/IdeasPublic";
import IdeasManager from "./pages/Idea/IdeasManager";
import NotFound from "./pages/Utility/NotFound";

function App() {
  const { theme } = useSelector((state: RootState) => state.themeReducer);

  let appTheme = "";
  if (theme === "other") {
    appTheme = "darktheme__app";
  }
  document.title = "IdeaCentral";
  return (
    <div className={`app ${appTheme}`}>
      <BrowserRouter basename="/">
        <ScrollToTopAndResetKeyword>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/auth" element={<Auth />}></Route>

            <Route element={<IsUserAuthenticated />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/user/:userId" element={<ProfilePublic />} />

              <Route path="/ideas/public" element={<IdeasPublic />} />
              <Route path="/ideas/new" element={<IdeaNew />} />
              <Route path="/ideas/manager" element={<IdeasManager />} />
              <Route path="/ideas/:ideaId" element={<IdeaPage />} />
              <Route path="/ideas/:ideaId/edit" element={<IdeaEdit />} />
            </Route>

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </ScrollToTopAndResetKeyword>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
