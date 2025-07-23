import React from "react";
import { useNavigate } from "react-router";

export const UserContext = React.createContext();

export function AuthProvider({ children }) {
  const api_url = import.meta.env.VITE_API_URL;
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${api_url}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if(!res.ok) throw new Error("Token Inválido");
        return res.json()
      })
      .then((data) => {
          setUser(data);
          setLoading(false)
      }).catch(() => {
        setUser(null);
        localStorage.removeItem("token");
        setLoading(false)
      })
      
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  async function login(loginResponse) {
  const token = loginResponse.token;
  localStorage.setItem("token", token);

  const res = await fetch(`${api_url}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Token inválido");
  }

  const userInfo = await res.json();
  setUser(userInfo); 
}

  async function signup(signupResponse) {
    const token = signupResponse.token;
    localStorage.setItem("token", token);

    const res = await fetch(`${api_url}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userInfo = await res.json();
    setUser({ ...userInfo, token: signupResponse.token });
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <UserContext.Provider value={{ user, login, logout, signup, loading, api_url }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(UserContext);
}
