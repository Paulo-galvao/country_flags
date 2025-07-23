import { useAuth } from "../UserContext";
import { Link } from "react-router";

export default function Profile() {
  const { user, loading } = useAuth();

  return (
    <div>
      {!loading && user ? (
        <div className="pb-10">
          <h1 className="text-xl py-10 pl-10 bg-gray-100">Dashboard</h1>
          <div className="pl-10 pt-5">
            <div className="flex items-center gap-1 text-lg">
              <i className="bx  bx-user-circle relative top-[1px]"></i>
              <span>{user.username}</span>
            </div>
            <button className="block cursor-pointer">Logout</button>
            <Link to={"/create"}>
              <button className="cursor-pointer block bg-blue-600 text-white p-3 mt-2 rounded-xl hover:bg-blue-500 duration-300 ease-in">
                Adicionar nova bandeira
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
}
