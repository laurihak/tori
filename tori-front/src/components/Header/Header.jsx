import "./Header.css";
import { useHistory } from "react-router-dom";

const Header = ({ user, setLogInfo }) => {
  const history = useHistory();

  const handleClickOnLogin = () => {
    localStorage.clear();
    history.push(`/login`);
  };
  const handleClickOnLogOut = () => {
    setLogInfo(false);
    history.push("/products");
    localStorage.removeItem("loggedInUser");
  };
  const handleClickOnProducts = () => {
    history.push(`/product-list`);
  };
  const handleClickOnAddProduct = () => {
    history.push(`/add-product`);
  };
  const handleClickOnAddUser = () => {
    history.push(`/add-user`);
  };
  const handleClickOnLogo = () => {
    history.push(`/`);
  };

  return (
    <div className="Container">
      <header className="App-header">
        <div className="Header-container">
          <div className="Header-logo" onClick={handleClickOnLogo}>
            Logo
          </div>
          <div className="Header-item" onClick={handleClickOnProducts}>
            Ilmoitukset
          </div>
        </div>
        <div className="Header-container">
          {user ? null : (
            <div className="Header-item" onClick={handleClickOnAddUser}>
              Tee kayttaja
            </div>
          )}

          {user ? (
            <>
              <div className="Header-item" onClick={handleClickOnAddProduct}>
                Lisaa ilmoitus
              </div>
              <div className="Header-login" onClick={handleClickOnLogOut}>
                Kirjaudu ulos
              </div>
            </>
          ) : (
            <div className="Header-login" onClick={handleClickOnLogin}>
              Kirjaudu sisaan
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
