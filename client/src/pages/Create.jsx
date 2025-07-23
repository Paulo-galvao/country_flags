import Header from "../components/Header";
import Label from "../components/form/Label";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import DashForm from "../components/form/DashForm";

import { useNavigate } from "react-router";
import { useAuth } from "../UserContext";
import { useState } from "react";

export default function Create() {
  const { api_url } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [continent, setContinent] = useState("");
  const [capital, setCapital] = useState("");
  const [population, setPopulation] = useState("");
  const [flagUrl, setFlagUrl] = useState("");

  async function create(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${api_url}/flags/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          continent,
          capital,
          population,
          flag_url: flagUrl,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Sucesso");
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <Header />
      <DashForm type="Adicionar Nova Bandeira">
        <form onSubmit={create}>
          <Label htmlFor="name">País: </Label>
          <Input
            value={name}
            id="name"
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />

          <Label htmlFor="continent">Continente: </Label>
          <Input
            value={continent}
            id="continent"
            name="continent"
            type="text"
            onChange={(e) => setContinent(e.target.value)}
          />

          <Label htmlFor="population">População: </Label>
          <Input
            value={population}
            id="population"
            name="population"
            type="text"
            onChange={(e) => setPopulation(e.target.value)}
          />

          <Label htmlFor="capital">Capital: </Label>
          <Input
            value={capital}
            id="capital"
            name="capital"
            type="text"
            onChange={(e) => setCapital(e.target.value)}
          />

          <Label htmlFor="flag_url">Url da imagem: </Label>
          <Input
            value={flagUrl}
            id="flag_url"
            name="flag_url"
            type="text"
            onChange={(e) => setFlagUrl(e.target.value)}
          />

          <Button>Enviar Dados</Button>
        </form>
      </DashForm>
    </div>
  );
}
