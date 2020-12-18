import React, { useState, useEffect } from "react";

function CreatePostScreen(props) {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(()=>{
      if(url){
    fetch("/createpost", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            setError(data.error);
          } else {
            setMessage(data.message);
            props.history.push("/");
          }
        });
  }
  },[url,body,image,props.history])

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "socilapp");
    data.append("cloud_name", "alikhan");
    fetch("https://api.cloudinary.com/v1_1/alikhan/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  return (
    <div className="center">
      <form>
        <div>
          <h3 style={{ marginBottom: 20, textAlign: "center" }}>Create Post</h3>
        </div>
        <div className="error">
          <span style={{ color: "red" }}>{error}</span>
          <span>{message}</span>
        </div>
        <input
          type="file"
          required
          style={{ height: 32 }}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <i className="far fa-image"></i>
        <input
          type="text"
          style={{ marginTop: 15 }}
          placeholder="Write a caption...."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default CreatePostScreen;
