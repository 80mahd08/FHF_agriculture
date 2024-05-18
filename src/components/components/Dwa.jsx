import React from "react";
import { useFirestore } from "../../contexts/FirestoreContext";
import CreateOne from "../CreateOne";

function Dwa() {
  const { pageName, displayArrayDwa } = useFirestore();

  return (
    <div className="table-div">
      <h1>maw3ed dwa of {pageName}</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Elkmiya</th>
            <th>Date start</th>
            <th>Date fin</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(displayArrayDwa).map((key) => (
            <DisplayComp key={key} obj={displayArrayDwa[key]} />
          ))}
        </tbody>
      </table>
      <CreateOne type={"dwa"} />
    </div>
  );
}

const DisplayComp = ({ obj }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) {
      return "Invalid date";
    }
    try {
      const date = timestamp.toDate();
      return date.toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  return (
    <tr>
      <td>{obj.name}</td>
      <td>{obj.type}</td>
      <td>{obj.elkmiya}</td>
      <td>{formatDate(obj.date_start)}</td>
      <td>{formatDate(obj.date_fin)}</td>
    </tr>
  );
};

export default Dwa;