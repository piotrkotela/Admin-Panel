import "./Header.css";

const Header = (props) => {
  return (
    <header>
      <div>
        <h1>Fake Store</h1>
        <p>Admin panel</p>
      </div>
      <div>
      <button onClick={props.changeSection.bind(null, "users")}>Users</button>
      <button onClick={props.changeSection.bind(null, "products")}>Products</button>
      </div>
    </header>
  );
};
export default Header;
