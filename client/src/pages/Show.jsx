import Header from "../components/Header";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../UserContext";

export default function Show() {
  const { api_url } = useAuth();
  const [flag, setFlag] = useState([]);
  const [error, setError] = useState(false);
  const { id } = useParams();

  async function getFlag() {
    try {
      const response = await fetch(`${api_url}/flags/${id}`, {
        method: "GET",
      });

      const data = await response.json();

      setFlag(data);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    getFlag();
  }, []);


  return (
    <div>
      <Header />
      <div className="w-full my-15 mx-auto space-y-15 max-w-4xl">
        {!error && flag ? (
          <div className="w-8/10 mx-auto px-5 py-3 border-1 border-gray-400 rounded-md shadow-xl">
            
              <h2 className="text-xl font-bold mb-4">{flag.name}</h2>
              <img src={flag.flag_url} alt={flag.name} />
              <ul className="py-2 space-y-1 text-[15px]">
                <li>Capital: {flag.capital} </li>
                <li>Continente: {flag.continent} </li>
                <li>População estimada: {flag.population} </li>
              </ul>
            
          </div>
        ) : (
          <div>Não foi possivel encontrar nenhuma postagem</div>
        )}
      </div>
    </div>
  );
}
