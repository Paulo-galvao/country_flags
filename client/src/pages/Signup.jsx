import AuthArea from "../components/form/AuthArea";
import Logo from "../components/Logo";
import Label from "../components/form/Label";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../UserContext";

export default function Signup() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, api_url } = useAuth();

  async function handleSignin(e) {
    e.preventDefault();

    const response = await fetch(`${api_url}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      signup(data);
      alert(data.message);
      navigate("/");
    } else {
      alert(data.message);
    }
  }

  return (
    <AuthArea>
      <form className="pb-6.5" onSubmit={handleSignin}>
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

        <Button>Criar uma nova conta</Button>
      </form>
    </AuthArea>
  );
}
