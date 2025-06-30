import { Link } from "react-router-dom";
import Mylogo from "../images/mylogo.png";
import { FaShoppingBasket } from "react-icons/fa";
import { CgSun } from "react-icons/cg";
import { FaMoon } from "react-icons/fa6";
import { useState } from "react";
import { useCartStor } from "../store/cartStore";

const Header = () => {
  const [theme, setTheme] = useState<boolean>(true);
  const [showCart, setShowCart] = useState<boolean>(false);

  const { cart } = useCartStor();

  const changeTheme = () => {
    const htmlElement = document.documentElement;

    setTheme((prev) => !prev);

    if (theme) {
      htmlElement.classList.remove("scheme-normal");
      htmlElement.classList.add("scheme-light-dark");
    } else {
      htmlElement.classList.remove("scheme-light-dark");
      htmlElement.classList.add("scheme-normal");
    }
  };

  const totalPrice = cart.reduce((acc, item) => {
    const quantity = item.quanitity || 1;
    return acc + item.price * quantity;
  }, 0);

  return (
    <header className="header">
      <div className="flex flex-row items-center justify-between myNav">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={Mylogo} alt="Logo" width={180} />
          </Link>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>
        </div>

        <div className="myNav__right">
          <div className="searchBox flex items-center">
            <input
              type="text"
              className="search outline-0 border-b-1 p-2"
              placeholder="search something.."
            />
            <div onClick={changeTheme} className="cursor-pointer">
              {theme ? (
                <FaMoon className=" ml-2 size-5" />
              ) : (
                <CgSun className=" ml-2 size-5" />
              )}
            </div>

            <div className="relative">
              <FaShoppingBasket
                className="ml-4 size-7 cursor-pointer"
                onClick={() => setShowCart((prev) => !prev)}
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cart.length}
                </span>
              )}

              {showCart && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border rounded z-50 p-4">
                  <h3 className="font-bold mb-2">Sepetteki Ürünler</h3>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-2 border-b"
                    >
                      <div className="text-sm">
                        <p className="font-medium">{item.title}</p>
                        <p>
                          {item.quanitity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                  ))}
                  <div className="text-right mt-6">
                    <p className="text-xl font-bold">
                      Toplam: ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <Link
                    to="/cart"
                    className="block text-center mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setShowCart(false)}
                  >
                    Sepete Git
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
