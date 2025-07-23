import { useEffect, useState } from "react";
import { useAuth } from "../UserContext";
import { useNavigate } from "react-router";

import Header from "../components/Header";
import Profile from "../components/Profile";
import Card from "../components/Card";
import Container from "../components/Container";

export default function Dashboard() {
  const { user, api_url } = useAuth();
  const [flags, setFlags] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function getFlags() {
    try {
      const response = await fetch(`${api_url}/users/show/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.ok) {
        setFlags(data.flags);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getFlags();
  }, [user]);

  return (
    <div>
      <Header />

      <Container>
        <Profile />
        {flags ? (
          <>
            <div className="pl-10">Suas Postagens</div>
            <Card props={flags}></Card>
          </>
        ) : (
          <div>Não foi possivel encontrar nenhuma postagem</div>
        )}
      </Container>

    </div>
  );
}
