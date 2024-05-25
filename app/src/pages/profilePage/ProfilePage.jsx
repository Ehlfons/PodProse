import { Fragment } from "react";

import { useUsers } from "@components/hooks";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faPodcast } from "@fortawesome/free-solid-svg-icons";

import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, handleLogout, updateIsLoading } = useUsers();

  const navigate = useNavigate();
  return (
    <Fragment>
      <main
        id="profile-main"
        style={{ backgroundImage: `url(${user?.url_img})` }}
      >
        <section className="profile">
          <div className="profile-overlay">
            <h1>{user?.username}</h1>
            <img src={user?.url_img} alt="" />
            <h2>{user?.name}</h2>
            <h2>{user?.email}</h2>
            <div className="profile-button-container">
              <button
                className="button-with-icon"
                onClick={() => {
                  updateIsLoading(true);
                  navigate("/my-content");
                }}
              >
                <FontAwesomeIcon icon={faPodcast} />
                <p>Mis podcasts</p>
              </button>
              <button className="button-with-icon" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightToBracket} />
                <p>Cerrar sesión</p>
              </button>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default ProfilePage;
