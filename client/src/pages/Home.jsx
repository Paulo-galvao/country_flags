import Header from "../components/Header";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useAuth } from "../UserContext";
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

      setFlags(data);
    } catch (error) {
      console.log(error.message);
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
