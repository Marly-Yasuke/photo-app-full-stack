import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import DiamondIcon from "@mui/icons-material/Diamond";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";
// import BookData from '../Data.json'

function Searchbar({ placeHolderSearch }) {
  const [filterData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    if (!wordEntered) return;
    axios
      .get(`http://localhost:8080/api/user?username=${wordEntered}`)
      .then((res) => {
        setFilteredData(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, [wordEntered]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };
  const clearInput = () => {
    setFilteredData([]);
  };
  return (
    <div className="search">
      {/* {isLoggedIn && ( */}
      <>
        <div className="searchInput">
          <input
            type="text"
            placeholder={placeHolderSearch}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {/* SearchIcon onClick function to define */}
            {filterData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {filterData.length !== 0 && (
          <div className="dataResult">
            {filterData.slice(0, 4).map((userItem) => {
              return (
                //                {/* value.title = the value parameter and the value wanted */}

                <Link
                  key={userItem._id}
                  className="dataItem"
                  to={"/user/" + userItem.username.toLowerCase()}
                >
                  <p>
                    {userItem.username}{" "}
                    {userItem.role.includes("photographer") && (
                      <CameraEnhanceIcon />
                    )}
                    {userItem.role.includes("model") && <DiamondIcon />}
                    {userItem.role.includes("makeup artist") && (
                      <AutoFixHighIcon />
                    )}
                    {userItem.role.includes("hair designer") && (
                      <ColorLensIcon />
                    )}
                    {userItem.role.includes("producer") && <AttachMoneyIcon />}
                    {userItem.role.includes("props master") && <WorkIcon />}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </>
      {/* )} */}
      {/* {!isLoggedIn && <></>} */}
    </div>
  );
}

export default Searchbar;
