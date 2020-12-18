import React, { useEffect, useState, useContext } from "react";
import img from "./d4.jpg";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

function ProfileScreen() {
  const { state } = useContext(UserContext);
  const [profile, setProfile] = useState([]);
  // const [edit, setEdit] = useState("");

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setProfile(result.mypost);
      });
  }, []);

  // useEffect(() => {
  //   fetch("/editpic", {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       // console.log(result);
  //       setEdit(result.profile);
  //     });
  // }, []);
  return (
    <>
      <div className="container" style={{ background: "#fff" }}>
        <div className="profile">
          <div>
            <div className="profile-image">
              <img src={img} alt="user" style={{ objectFit: "cover" }} />
            </div>
          </div>
          <div>
            <div className="profile-user-setting">
              <h3 className="profile-user-name">
                {state ? state.username : "loading.."}
              </h3>
              <button className="btn profile-edit-btn">
                <Link to="/edit">Edit Profile</Link>
              </button>
              <button
                className="btn profile-setting-btn"
                aria-label="Profile Setting"
              >
                <i className="fas fa-cog" aria-hidden></i>{" "}
              </button>
              <span
                className="profile-stat-count"
                style={{ marginLeft: 10, fontSize: 15, fontWeight: 600 }}
              >
                {profile.length}{" "}
              </span>
              posts
            </div>

            <div className="profile-stats">
              <ul>
                <span className="profile-stat-count">160 </span>followers
                <span className="profile-stat-count">190 </span>following
              </ul>
            </div>
            <div className="profile-bio">
              <p>
                <span className="profile-real-name">Learn your Religious Don't just Inherit It..</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* gallery  */}
      <main>
        <div className="grid-container1">
          {profile.map((item) => {
            return (
              <div className="gallery" key={item._id}>
                <div>
                  <img src={item.photo} alt="" />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default ProfileScreen;
