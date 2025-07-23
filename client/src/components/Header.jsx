import Logo from "../components/Logo";
import { useState } from "react";
import { useAuth } from "../UserContext";
import { Link, useNavigate, useLocation } from "react-router";

export default function Header() {
  const { user, logout, api_url } = useAuth();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuIsClosed, setMenuIsClosed] = useState(true);
  const [query, setQuery] = useState(null);
  const location = useLocation();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function openMenu() {
    setMenuIsOpen(true);
    setMenuIsClosed(false);
  }

  function closeMenu() {
    setMenuIsClosed(true);
    setMenuIsOpen(false);
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  async function handleSearch(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${api_url}/flags/search?name=${query}`);
      const data = await response.json();

      if (response.ok) {
        navigate(`/show/${data.flag.id}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="h-15 border-b-1 border-gray-500">
      <header className="h-full flex items-center justify-between max-w-5xl mx-auto">
        <div className="w-1/10 ml-2">
          <Logo />
        </div>
        <div className="w-8/10 relative">
          <i className="bx  bx-search-alt absolute text-xl text-gray-400 left-2 top-[7px]"></i>
          <form onSubmit={handleSearch}>
            <input
              onChange={(e) => setQuery(e.target.value)}
              className="py-1 px-9 rounded-md border-1 focus:border-2 outline-none focus:border-blue-500 border-gray-400 w-full max-w-4xl mx-auto"
              placeholder="Pesquisar"
              type="text"
            />
          </form>
        </div>

        {location.pathname != "/dashboard" ? (
          <div className="w-1/10">
            {token ? (
              <div className="flex justify-end mr-2">
                {menuIsClosed ? (
                  <i
                    onClick={openMenu}
                    className="text-[30px] bx bx-menu cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={closeMenu}
                    className="text-[30px] bx bx-x cursor-pointer"
                  ></i>
                )}
              </div>
            ) : (
              <div className="flex justify-end mr-3 ">
                <button
                  className="cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-1/10"></div>
        )}
      </header>

      {menuIsOpen && (
        <ul className="mt-4 flex flex-col space-y-4 z-1 relative bg-white border-b-1 border-gray-500 py-3">
          <li className="flex items-center gap-2 text-xl border-b-1 border-gray-300 pb-6">
            <i className="bx  bx-user-circle relative top-[1px]"></i>
            <span>{user.username}</span>
          </li>
          <li className="text-sm">
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-sm">
            <span onClick={handleLogout} className="cursor-pointer">
              Logout
            </span>
          </li>
        </ul>
      )}
    </div>
  );
}
