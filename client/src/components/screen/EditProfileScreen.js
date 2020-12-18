import React, { useState } from 'react'

export default function EditProfileScreen(props) {
    const [bio,setBio]=useState('')
    const [setImage]=useState('')
    
    // const [url, setUrl] = useState("");

  //   useEffect(()=>{
  //     if(url){
  //   fetch("/edit", {
  //       method: "post",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("jwt"),
  //       },
  //       body: JSON.stringify({
  //         bio,
  //         pic: url,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //           props.history.push("/profile");
  //       });
  //     }
  // },[url])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('comming soon')
    props.history.push('/profile')
    }


  
    return (
        <div className="center" style={{width:300}}>
        <form onSubmit={handleSubmit}>
          <div>
            <h3 style={{ marginBottom: 20, textAlign: "center" }}>Upload Profile Pic</h3>
          </div>
          <div className="error">
            
          </div>
          <input
            type="file"
            style={{ height: 32 }}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input
            type="text"
            style={{ marginTop: 15 }}
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            
          />
          <input type="submit" value="Upload" style={{width:100}} />
        </form>
      </div>
    )
}
