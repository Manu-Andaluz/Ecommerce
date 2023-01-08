import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useRef } from "react";

const NavBar = () => {
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <Link to="/" className="logo">
        <h2>Logo</h2>
      </Link>
      <nav ref={navRef}>
        <div>
          <Link
            to="/cart"
            onClick={(e) =>
              e.target.className === "responsive_nav" ? "" : showNavbar()
            }
          >
            <div className="nav-bag">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-handbag-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
              </svg>
              <span className="bag-quantity">
                <span>{cartTotalQuantity}</span>
              </span>
            </div>
          </Link>
        </div>

        <div>
          {auth._id ? (
            <Links>
              {auth.isAdmin ? (
                <div>
                  <Link to="/admin/products">Admin</Link>
                </div>
              ) : null}
              <div
                onClick={() => {
                  dispatch(logoutUser(null));
                  toast.warning("Logged out!", { position: "bottom-left" });
                }}
              >
                Cerrar sesión
              </div>
            </Links>
          ) : (
            <div className="account-links">
              <Link
                to="/login"
                onClick={(e) =>
                  e.target.className === "responsive_nav" ? "" : showNavbar()
                }
              >
                Ingresar
              </Link>
              <Link
                to="register"
                onClick={(e) =>
                  e.target.className === "responsive_nav" ? "" : showNavbar()
                }
              >
                Registrar
              </Link>
            </div>
          )}
        </div>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <i className="fa-solid fa-x"></i>
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </header>
  );
};

export default NavBar;

const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;
