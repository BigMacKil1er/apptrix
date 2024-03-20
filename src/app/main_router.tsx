
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/ui/MainPage";
 
const MainRouter: React.FC = () => {
  return (
    <Routes>
      {/* <Route path={LOG_IN} element={<SignIn />} /> */}
      <Route path='/' element={<MainPage />} />
    </Routes>
  );
};

export { MainRouter };
