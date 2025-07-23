import Header from "../components/Header";
import Label from "../components/form/Label";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import DashForm from "../components/form/DashForm";

import { useParams, useNavigate } from "react-router";
import { useAuth } from "../UserContext";
import { useEffect, useState } from "react";


export default function Update() {
  const { id } = useParams();
  const { api_url } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [continent, setContinent] = useState("");
  const [capital, setCapital] = useState("");
  const [population, setPopulation] = useState("");
  const [flagUrl, setFlagUrl] = useState("");

  async function getOne() {
    try {
      const response = await fetch(`${api_url}/flags/${id}`);
      const data = await response.json();

      if (response.ok) {
        setName(data.name);
        setContinent(data.continent);
        setCapital(data.capital);
        setPopulation(data.population);
        setFlagUrl(data.flag_url);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function update(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${api_url}/flags/update/${id}`, {
        method: "PATCH",
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
        alert("Atualizado");
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getOne();
  }, []);

  return (
    <div>
      <Header />

      <DashForm type="Atualizar">
        
        <form onSubmit={update}>
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

          <Button>Atualizar</Button>
        </form>
      </DashForm>
    </div>
  );
}
