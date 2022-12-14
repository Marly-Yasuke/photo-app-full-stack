import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { API_URL } from "../utils/consts";

const DeleteImage = ({ imageId, getLatestPictures }) => {
  const { token } = useContext(AuthContext);

  const handleClick = (event) => {
    event.preventDefault();
    const config = {
      baseURL: API_URL,
      url: `/api/images/${imageId}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    };
    axios(config)
      .then((res) => {
        console.log(res.data);
        getLatestPictures();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return <button onClick={handleClick}>Delete picture</button>;
};

export default DeleteImage;
