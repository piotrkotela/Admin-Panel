import "./Users.css";
import { useState } from "react";
// finds distance between two points on a sphere using Haversine formula
const findDistance = (lat1, long1, lat2, long2) => {
  lat1 = lat1 * (Math.PI / 180);
  long1 = long1 * (Math.PI / 180);
  lat2 = lat2 * (Math.PI / 180);
  long2 = long2 * (Math.PI / 180);
  const dlon = long2 - long1;
  const dlat = lat2 - lat1;
  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat2) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));
  const EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS;
};

const Users = (props) => {
  const users = props.users;
  const [twoUsers, setTwoUsers] = useState([]);
  const [hide, setHide] = useState(false);

  const findTwoFurthestUsers = () => {
    let bestDist = 0;
    let bestUser1;
    let bestUser2;
    for (const user1 of users) {
      for (const user2 of users) {
        const lat1 = parseFloat(user1.address.geolocation.lat);
        const long1 = parseFloat(user1.address.geolocation.long);
        const lat2 = parseFloat(user2.address.geolocation.lat);
        const long2 = parseFloat(user2.address.geolocation.long);
        let dist = findDistance(lat1, long1, lat2, long2);
        if (dist > bestDist) {
          bestDist = dist;
          bestUser1 = user1;
          bestUser2 = user2;
        }
      }
    }
    setTwoUsers([bestDist, bestUser1, bestUser2]);
    setHide(!hide);
  };

  const hideHandler = () => {
    setHide(!hide);
  };
  return (
    <div className="mainBox">
      <div className="options">
        <p>Options:</p>
        <button onClick={props.sortFunc.bind(null)}>Sort carts by value</button>
        <button onClick={findTwoFurthestUsers}>
          Find two users living furthest away from each other
        </button>
      </div>
      {hide && (
        <div className="twoUsers">
          <p>
            The two users are: {twoUsers[1].username} and {twoUsers[2].username}
            . The distance between them is:{" "}
            {Math.round(twoUsers[0] * 100) / 100} km
          </p>
          <button className="hideButton" onClick={hideHandler}>
            Hide
          </button>
        </div>
      )}
      <table className="userTable">
        <thead>
          <tr>
            <th>Full name</th>
            <th>Address</th>
            <th>Username</th>
            <th>Email</th>
            <th>Cart value</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td className="fullName">{`${user.name.firstname} ${user.name.lastname}`}</td>
              <td className="adress">{`${user.address.city}, ${user.address.street}`}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>$ {user.cartvalue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
