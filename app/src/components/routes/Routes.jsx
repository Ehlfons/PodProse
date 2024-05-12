import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useUsers } from "@components/hooks";

import {
  LoginPage,
  RegisterPage,
  MainPage,
  ContactPage,
  CreatorPage,
} from "@pages/index";

const Routes = () => {
  const { loggedIn, userData } = useUsers();

  return (
    <RouterRoutes>
      {/* Public Routes */}
      {loggedIn ? (
        <Route path="/" element={<Navigate to={"/home"} />} />
      ) : (
        <Route path="/" element={<LoginPage />} />
      )}

      <Route path="/register" element={<RegisterPage />} />

      {/* User auth Routes */}
      {loggedIn && userData ? (
        <>
          <Route path="/home" element={<MainPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/creator" element={<CreatorPage />} />
        </>
      ) : null}
    </RouterRoutes>
  );
};

export default Routes;
