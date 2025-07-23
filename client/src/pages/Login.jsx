import Label from "../components/form/Label";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import Logo from "../components/Logo";
import AuthArea from "../components/form/AuthArea";

import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../UserContext";

export default function Login() {
  const { login, api_url } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const response = await fetch(`${api_url}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      login(data);
      alert(data.message);
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  }

  return (
    <AuthArea>
      <form onSubmit={handleLogin}>
        <div className="mb-10">
          <Logo />
        </div>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            name="username"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
          />
        </div>

        <Button>Entrar em sua conta</Button>
      </form>

      <div>
        Ainda não é cadastrado?{" "}
        <Link className="text-blue-800" to={"/signup"}>
          Inscreva-se
        </Link>
      </div>
    </AuthArea>
  );
}
