import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useUsers } from "@components/hooks";

import {
  LoginPage,
  RegisterPage,
  MainPage,
  ContactPage,
  ExplorePage,
  ContentManagementPage,
  ProfilePage,
  ErrorPage,
  ResetPasswordPage,
  VerifyEmailPage,
  SubscriptionPage,
  TermsAndConditionsPage,
  PrivacyPoliciesPage
} from "@pages/index";

const Routes = () => {
  const { loggedIn } = useUsers();

  return (
    <RouterRoutes>
      {/* Public Routes */}
      {loggedIn ? (
        <>
          <Route path="/register" element={<Navigate to={"/home"} />} />
          <Route path="/login" element={<Navigate to={"/home"} />} />
          <Route path="/" element={<Navigate to={"/home"} />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/verify/:token" element={<VerifyEmailPage />} />
        </>
      )}

      {/* User auth Routes */}
      {loggedIn && (
        <>
          <Route path="/home" element={<MainPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/my-content" element={<ContentManagementPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage/>}/>
          <Route path="/privacy-policies" element={<PrivacyPoliciesPage/>}/>
        </>
      )} 

      {/* Error Route */}
      <Route path="*" element={<ErrorPage />} />
    </RouterRoutes>
  );
};

export default Routes;
