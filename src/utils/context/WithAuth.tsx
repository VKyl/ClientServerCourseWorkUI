import {createContext, useState, useContext, useEffect, type ReactNode, type ComponentType, type FC} from 'react';
import {apiClient} from "../../api/apiClient.ts";
import Fallback from "../components/Fallback.tsx";

type AuthContextType = {
    token: string | null;
    isAuthenticated: boolean;
    login: (newToken: string) => void;
    logout: () => void;
} | null;

const AuthContext = createContext<AuthContextType>(null);
const AUTH_STORAGE_KEY: string = 'authToken';

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState(localStorage.getItem(AUTH_STORAGE_KEY));

    useEffect(() => {
        if (token) {
            localStorage.setItem('AUTH_STORAGE_KEY', token);
            apiClient.defaults.headers.common['Token'] = token;
        } else {
            localStorage.removeItem('AUTH_STORAGE_KEY');
            delete apiClient.defaults.headers.common['Token'];
        }
    }, [token]);

    const login = (newToken: string) => setToken(newToken);
    const logout = () => setToken(null);

    const authValue = {
        token,
        isAuthenticated: !!token,
        login,
        logout,
    };

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export type WithInjectedAuth = {
    token: string | null;
    isAuthenticated: boolean;
    login: (newToken: string) => void;
    logout: () => void;
};
const WithAuth = <P extends object>(
  WrappedComponent: ComponentType<P & WithInjectedAuth>
): FC<P> => {
  const WithAuthComponent: FC<P> = (props) => {
    const value = useContext(AuthContext);
    if (!value) {
      return <Fallback />;
    }
    return <WrappedComponent {...props} {...value} />;
  };
  return WithAuthComponent;
};

export default WithAuth;