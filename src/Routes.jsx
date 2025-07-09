import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomeLandingPage from "pages/home-landing-page";
import WalletConnection from "pages/wallet-connection";
import InvestmentDashboard from "pages/investment-dashboard";
import CreateSipInvestment from "pages/create-sip-investment";
import UserProfileSettings from "pages/user-profile-settings";
import ManageSipInvestments from "pages/manage-sip-investments";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeLandingPage />} />
        <Route path="/home-landing-page" element={<HomeLandingPage />} />
        <Route path="/wallet-connection" element={<WalletConnection />} />
        <Route path="/investment-dashboard" element={<InvestmentDashboard />} />
        <Route path="/create-sip-investment" element={<CreateSipInvestment />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/manage-sip-investments" element={<ManageSipInvestments />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;