
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/ui/MainPage";
import { MenuPage } from "../pages/ui/MenuPage";
 
const MainRouter: React.FC = () => {
  return (
    <Routes>
      {/* <Route path={LOG_IN} element={<SignIn />} /> */}
      <Route path='/' element={<MainPage />} />
      <Route path='/menu' element={<MenuPage />} />
    </Routes>
  );
};

export { MainRouter };
