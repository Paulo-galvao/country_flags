import Header from "../components/Header";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../UserContext";

export default function Destroy() {
  const navigate = useNavigate();
  const { api_url } = useAuth();
  const { id } = useParams();
  const token = localStorage.getItem("token");


  async function destroy(e) {
    e.preventDefault();

    const response = await fetch(`${api_url}/flags/destroy/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);
        navigate(-1);
      } else {
        alert(data.message);
      }
    try {
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div>
      <Header />
      <div className="flex justify-center ">
        <form className="mt-30" onSubmit={destroy}>
          <div>Tem certeza que deseja excluir este item?</div>
          <button
            type="submit"
            className="mr-1 bg-red-600 text-white w-5/10 rounded-xl cursor-pointer hover:bg-red-500 duration-300"
          >
            Sim
          </button>
          <span
            onClick={() => navigate(-1)}
            className="px-[40px] py-[3px] bg-blue-600 text-white w-5/10 rounded-xl cursor-pointer hover:bg-blue-500 duration-300"
          >
            Cancelar
          </span>
        </form>
      </div>
    </div>
  );
}
