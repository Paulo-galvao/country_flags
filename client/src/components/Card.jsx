import { Link, useLocation } from "react-router";



export default function Card({ props }) {
  const location = useLocation();


  return (
    <div className="w-full my-15 space-y-15 grid md:grid-cols-4">
      
      {props.map((flag) => {
        return (
          <div
            key={flag.id}
            className=" w-8/10 mx-auto px-5 py-3 border-1 border-gray-400 rounded-md shadow-xl"
          >
            <Link to={`/show/${flag.id}`}>
              <h2 className="text-xl font-bold mb-4 overflow-hidden">
                {flag.name}
              </h2>
              <img className="md:w-full" src={flag.flag_url} alt={flag.name} />
              <ul className="py-2 mt-2 space-y-1 text-[15px]">
                <li>Capital: {flag.capital} </li>
                <li>Continente: {flag.continent} </li>
                <li>População estimada: {flag.population} </li>
              </ul>
            </Link>
            {location.pathname == "/dashboard" ? (
              <div className="flex justify-between gap-1">
                <Link className="w-5/10" to={`/update/${flag.id}`}>
                  <button className="bg-blue-600 text-white text-sm w-full h-8 cursor-pointer">
                    Editar
                  </button>
                </Link>
                <Link className="w-5/10" to={`/destroy/${flag.id}`}>
                  <button className="bg-red-600 text-white text-sm w-full h-8 cursor-pointer">
                    Excluir
                  </button>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}
