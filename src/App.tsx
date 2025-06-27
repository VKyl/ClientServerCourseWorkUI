import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import PrivateRoute from "./utils/components/PrivateRoute.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import {AuthProvider} from "./utils/context/WithAuth.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import Header from "./utils/components/Header.tsx";
import {ThemeProvider} from "@mui/material";
import greenTheme from "./utils/constants.ts";

function App() {

  return (
    <AuthProvider>
        <ThemeProvider theme={greenTheme}>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route>
                        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                    </Route>

                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </AuthProvider>
  )
}

export default App
