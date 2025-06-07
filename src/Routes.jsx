import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import Login from "pages/login";
import ExecutiveDashboard from "pages/executive-dashboard";
import CommunicationHub from "pages/communication-hub";
import MeetingCoordination from "pages/meeting-coordination";
import CalendarManagement from "pages/calendar-management";
import TaskTeamManagement from "pages/task-team-management";
import ReportsAnalytics from "pages/reports-analytics";
import SettingsIntegrations from "pages/settings-integrations";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login" element={<Login />} />
          <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
          <Route path="/communication-hub" element={<CommunicationHub />} />
          <Route path="/meeting-coordination" element={<MeetingCoordination />} />
          <Route path="/calendar-management" element={<CalendarManagement />} />
          <Route path="/task-team-management" element={<TaskTeamManagement />} />
          <Route path="/reports-analytics" element={<ReportsAnalytics />} />
          <Route path="/settings-integrations" element={<SettingsIntegrations />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;