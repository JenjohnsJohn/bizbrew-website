import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { verifyToken } from './api';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => Promise<boolean>;
  logout: () => void;
}

const STORAGE_KEY = 'bizbrew_admin_token';

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  loading: true,
  login: async () => false,
  logout: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  });
  const [loading, setLoading] = useState(() => {
    try { return !!localStorage.getItem(STORAGE_KEY); } catch { return false; }
  });

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    verifyToken(token)
      .then((valid) => {
        if (cancelled) return;
        if (!valid) {
          setToken(null);
          localStorage.removeItem(STORAGE_KEY);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setToken(null);
        localStorage.removeItem(STORAGE_KEY);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(async (newToken: string) => {
    const valid = await verifyToken(newToken);
    if (valid) {
      setToken(newToken);
      localStorage.setItem(STORAGE_KEY, newToken);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
