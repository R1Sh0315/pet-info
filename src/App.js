import { useState } from "react";
import { mockDogoData } from "./mockData";
import "./styles.css";

export default function App() {
  const [isDogoSelcted, setDogoSelected] = useState(false);
  const [dogoInfo, setDogoInfo] = useState([]);

  const dogoDetails = (
    <div>
      <div className="close-btn" onClick={() => setDogoSelected(false)}>
        X
      </div>
      <div className="dogo-contianer">
        <div>
          <img
            className="dogo-image"
            alt={dogoInfo.name}
            src={dogoInfo.image?.url}
          />
        </div>
        <div className="dogo-info">
          <table>
            <tr>
              <th>Name</th>
              <td>{dogoInfo.name}</td>
            </tr>
            <tr>
              <th>Origin</th>
              <td>{dogoInfo.origin}</td>
            </tr>
            <tr>
              <th>Purpose</th>
              <td>{dogoInfo.bred_for}</td>
            </tr>
            <tr>
              <th>Temperament</th>
              <td>{dogoInfo.temperament}</td>
            </tr>
            <tr>
              <th>Breed Group</th>
              <td>{dogoInfo.breed_group}</td>
            </tr>
            <tr>
              <th>Life Span</th>
              <td>{dogoInfo.life_span}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );

  const dogoElement = mockDogoData.map((el, key) => (
    <div
      className="dogo-name"
      key={key}
      onClick={() => {
        setDogoInfo(el);
        setDogoSelected(true);
      }}
    >
      <span>{el.name}</span>
    </div>
  ));
  return (
    <div className={`App ${isDogoSelcted ? "pop-up" : ""}`}>
      <div className={`nav-bar ${isDogoSelcted ? "nav-bar-none" : ""}`}>
        <span className="pet-title">Pet Lover</span>
        <span className="pet-filter">Filter</span>
      </div>
      <div className="body-container">
        {isDogoSelcted ? dogoDetails : dogoElement}
      </div>
    </div>
  );
}
