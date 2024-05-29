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
  ErrorPage,
} from "@pages/index";

const Routes = () => {
  const { loggedIn } = useUsers();

  return (
    <RouterRoutes>
      {/* Public Routes */}
      {loggedIn ? (
        <>
          <Route path="/register" element={<Navigate to={"/home"} />} />
          <Route path="/" element={<Navigate to={"/home"} />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </>
      )}

      {/* User auth Routes */}
      {loggedIn && (
        <>
          <Route path="/home" element={<MainPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/creator" element={<CreatorPage />} />
          <Route path="/my-content" element={<ContentManagementPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </>
      )}

      {/* Error Route */}
      <Route path="*" element={<ErrorPage />} />
    </RouterRoutes>
  );
};

export default Routes;
