
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/ui/MainPage";
import { MenuPage } from "../pages/ui/MenuPage";
import { CART_PAGE, MAIN_PAGE, MENU_PAGE } from "./routes";
import { CartPage } from "../pages/ui/CartPage";
 
const MainRouter: React.FC = () => {
  return (
    <Routes>
      {/* <Route path={LOG_IN} element={<SignIn />} /> */}
      <Route path={MAIN_PAGE} element={<MainPage />} />
      <Route path={MENU_PAGE} element={<MenuPage />} />
      <Route path={CART_PAGE} element={<CartPage />} />
    </Routes>
  );
};

export { MainRouter };
