import { Fragment, useRef, useEffect } from "react";

import { useUsers } from "@components/hooks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faPodcast, faGear, faCircleXmark, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "@components/loader";

import "./ProfilePage.css";

const ProfilePage = () => {
  const {
    user,
    isLoading,
    editProfileForm,
    isEditingProfile,
    
    updateIsLoading,
    updateIsEditingProfile,
    updateEditProfileForm,
    
    handleLogout,
    handleImageUpload,
    patchUserData,
    getUser,
  } = useUsers();

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (editProfileForm.email !== user.email) {
      toast.warning('Es necesario cerrar sesión al cambiar el email', {
        action:
        <button onClick={() => {
          patchUserData();
          setTimeout(() => {
            handleLogout();
          } , 2000);
          toast.dismiss();
        }}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </button>,
      });
    } else {
      patchUserData();
    }
  };

  useEffect(() => {
    updateIsLoading(true);
    // Simulate loading time para cargar la imagen
    setTimeout(() => {
      updateIsLoading(false);
    }, 1500);
  } , []);

  return (
    <Fragment>
      <main
        id="profile-main"
        style={{ backgroundImage: `url(${user?.url_img})` }}
      >
        <section className="profile">
          <div className="profile-overlay">
            <div className="profile-name">
              {isEditingProfile ? (
                <input
                  className="edited-input"
                  type="text"
                  value={editProfileForm.username}
                  onChange={(e) =>
                    updateEditProfileForm("username", e.target.value)
                  }
                />
              ) : (
                <h1>{user?.username}</h1>
              )}
              <i
                onClick={() => {
                  updateIsEditingProfile(!isEditingProfile);
                  !isEditingProfile && getUser();
                }}
              >
                {isEditingProfile ? (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    title="Cancelar edición"
                    className="cancel-editing"
                  />
                ) : (
                  <FontAwesomeIcon icon={faGear} title="Editar perfil" />
                )}
              </i>
            </div>
            <img
              src={user?.url_img}
              alt=""
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {isEditingProfile ? (
              <div className="name-email-inputs">
                <input
                  className="edited-input"
                  type="text"
                  value={editProfileForm.name}
                  onChange={(e) =>
                    updateEditProfileForm("name", e.target.value)
                  }
                />
                <input
                  className="edited-input"
                  type="email"
                  value={editProfileForm.email}
                  onChange={(e) =>
                    updateEditProfileForm("email", e.target.value)
                  }
                />
              </div>
            ) : (
              <>
                <h2>{user?.name}</h2>
                <h2>{user?.email}</h2>
              </>
            )}
            {isEditingProfile && (
              <button onClick={(e)=>{handleSubmitClick(e)}}>
                Guardar
              </button>
            )}
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
      {isLoading && <Loader />}
    </Fragment>
  );
};

export default ProfilePage;
