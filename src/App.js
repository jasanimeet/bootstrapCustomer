/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from 'Auth/Login/Login';
import AdminLayout from "layouts/Admin.js";
import useThemeSelector from 'utils/useThemeSelector';

function App() {
  const [theme] = useThemeSelector();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
