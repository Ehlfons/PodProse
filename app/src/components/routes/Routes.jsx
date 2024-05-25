import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useUsers } from "@components/hooks";

import {
  LoginPage,
  RegisterPage,
  MainPage,
  ContactPage,
  CreatorPage,
  ContentManagementPage,
  ProfilePage,
} from "@pages/index";

const Routes = () => {
  const { loggedIn, user } = useUsers();

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
      {loggedIn && user ? (
        <>
          <Route path="/home" element={<MainPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/creator" element={<CreatorPage />} />
          <Route path="/my-content" element={<ContentManagementPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </>
      ) : null}
    </RouterRoutes>
  );
};

export default Routes;
