import { useEffect, useState } from "react";
import { mockDogoData } from "./mockData";
import "./styles.css";

export default function App() {
  const [isDogoSelcted, setDogoSelected] = useState(false);
  const [dogoInfo, setDogoInfo] = useState([]);

  const [isLightTheme, setLightTheme] = useState(true);
  const [isFilter, setFilter] = useState(false);

  const [filterBy, setFilterBy] = useState("");
  const [filterList, setFilterList] = useState([]);

  const [type, setType] = useState("");
  const stringToCamleCase = (str) => {
    let strToArr = str.split(" ");
    let firstWord =
      strToArr[0].charAt(0).toLowerCase() + strToArr[0].slice(1).toLowerCase();
    let remWords = "";
    let removedFirstInx = strToArr.splice(1, strToArr.length);
    removedFirstInx.map((word) => {
      return (remWords +=
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    });
    return firstWord + remWords;
  };

  const countryList = [];
  mockDogoData.map((el) =>
    el.origin?.length > 1 || el.country_code?.length > 1
      ? countryList.push(el.origin || el.country_code)
      : ""
  );

  var countrySet = new Set(countryList);
  // country list
  var country = [...countrySet].join(" ").replaceAll(",", "").split(" ");

  const breedGroupList = [];
  mockDogoData.map((el) =>
    el.breed_group?.length > 1 ? breedGroupList.push(el.breed_group) : ""
  );
  var breedDroupSet = new Set(breedGroupList);
  // breed grp list
  var breedGroup = [...breedDroupSet].join(" ").replaceAll(",", "").split(" ");

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
              <td>{dogoInfo.origin || dogoInfo.country_code}</td>
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

  const dogoElement = mockDogoData.map((el, key) => {
    let dogoComponent = "";
    if (el.breed_group === type) {
      dogoComponent = (
        <div
          className={`dogo-name pet-${isLightTheme ? "light" : "dark"}-theme`}
          key={key}
          onClick={() => {
            setDogoInfo(el);
            setDogoSelected(true);
          }}
        >
          <span>{el.name}</span>
        </div>
      );
    }
    if (el.origin?.includes(type) || el.country_code?.includes(type)) {
      dogoComponent = (
        <div
          className={`dogo-name pet-${isLightTheme ? "light" : "dark"}-theme`}
          key={key}
          onClick={() => {
            setDogoInfo(el);
            setDogoSelected(true);
          }}
        >
          <span>{el.name}</span>
        </div>
      );
    }
    if (type === "") {
      dogoComponent = (
        <div
          className={`dogo-name pet-${isLightTheme ? "light" : "dark"}-theme`}
          key={key}
          onClick={() => {
            setDogoInfo(el);
            setDogoSelected(true);
          }}
        >
          <span>{el.name}</span>
        </div>
      );
    }

    return dogoComponent;
  });

  const filterOnClickHandler = (grpName) => {
    setFilterBy(stringToCamleCase(grpName));
  };

  useEffect(() => {
    if (filterBy === "breedGroup") {
      setFilterList(breedGroup);
    } else if (filterBy === "country") {
      setFilterList(country);
    }
  }, [filterBy, type]);

  const filterComponent = (
    <div
      className={`${isDogoSelcted ? "nav-bar-none" : "filter-container"}  pet-${
        isLightTheme ? "light" : "dark"
      }-theme`}
    >
      {["Country", "Breed Group"].map((grpName, key) => (
        <span
          key={key}
          className={`group-element pet-${
            isLightTheme ? "light" : "dark"
          }-theme`}
          onClick={() => filterOnClickHandler(grpName)}
        >
          {grpName}
        </span>
      ))}
    </div>
  );

  const selectedFilter = (
    <div
      className={`${
        filterList.length ? "filter-is-visible" : "filter-is-not-visible"
      } ${
        isDogoSelcted ? "nav-bar-none" : "selected-filter-list-container"
      }  pet-${isLightTheme ? "light" : "dark"}-theme`}
    >
      {filterList?.map((ele) => (
        <span
          className={`filter-element pet-${
            isLightTheme ? "light" : "dark"
          }-theme`}
          onClick={() => setType(ele)}
        >
          {ele}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`App ${isDogoSelcted ? "pop-up" : ""} ${
        isLightTheme ? "light" : "dark"
      }-theme`}
    >
      <div className={`nav-bar ${isDogoSelcted ? "nav-bar-none" : ""}`}>
        <span className="pet-title">Pet Lover</span>
        <span className="pet-control">
          <span
            className={`pet-filter pet-${
              isLightTheme ? "light" : "dark"
            }-theme`}
            onClick={() => setFilter(!isFilter)}
          >
            Filter
          </span>
          <span
            onClick={() => {
              setLightTheme(!isLightTheme);
            }}
            className={`pet-${isLightTheme ? "light" : "dark"}-theme`}
          >
            {isLightTheme ? "Light-theme" : "Dark-theme"}
          </span>
        </span>
      </div>
      {isFilter ? filterComponent : ""}
      {isFilter ? selectedFilter : ""}
      <div className={`body-container`}>
        {isDogoSelcted ? dogoDetails : dogoElement}
      </div>
    </div>
  );
}
