import { useEffect, useState } from "react";
import { useAuth } from "../UserContext";
import Header from "../components/Header";
import Card from "../components/Card";
import Container from "../components/Container";

export default function Home() {
  const { api_url } = useAuth();
  const [flags, setFlags] = useState([]);

  async function getFlags() {
    try {
      const response = await fetch(`${api_url}/flags`, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        setFlags(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getFlags();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Card props={flags} />
      </Container>
    </>
  );
}
