import React from "react";
import { useFirestore } from "../../contexts/FirestoreContext";
import CreateOne from "../CreateOne";

function Mousem() {
  const { pageName, displayArrayMousem } = useFirestore();
  return (
    <div className="table-div">
      <h1>maw3ed mousem of {pageName}</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Num</th>
            <th>Count</th>
            <th>start</th>
            <th>fin</th>
            <th>prix</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(displayArrayMousem).map((key) => (
            <DisplayComp key={key} obj={displayArrayMousem[key]} />
          ))}
        </tbody>
      </table>
      <CreateOne type={"mousem"} />
    </div>
  );
}

const DisplayComp = ({ obj }) => {
  return (
    <tr>
      <td>{obj.name}</td>
      <td>{obj.num}</td>
      <td>{obj.count}</td>
      <td>{obj.start}</td>
      <td>{obj.fin}</td>
      <td>{obj.prix}</td>
    </tr>
  );
};

export default Mousem;
