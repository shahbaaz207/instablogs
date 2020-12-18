import React, { useState } from "react"
import { useEffect } from "react"
import { UserContext } from "../../App"
import { useContext } from "react"
import icon from "./download.png"

function HomeScreen() {
  const [data, setData] = useState([])

  const { state } = useContext(UserContext)
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts)
      })
  }, [])

  const LikePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const UnLikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const makeComment = async (text, postId) => {
    await fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: postId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      {data.map((item) => {
        return (
          <div key={item._id}>
            <div className='container1'>
              <div className='post'>
                <div className='post-header'>
                  <div>
                    {" "}
                    <h2>{item.postedBy.username}</h2>
                  </div>
                  <div>
                    {" "}
                    <span>12:00</span>
                  </div>
                </div>
                <div>
                  <img src={item.photo} alt='' />
                </div>
                <div>
                  <span className=''>
                    <img
                      src={icon}
                      style={{ width: 25, height: 30, marginRight: 10 }}
                      alt=''
                    />
                    {item.likes.length}
                  </span>
                  {item.likes.includes(state._id) ? (
                    <span
                      style={{ fontSize: 15, fontWeight: 600 }}
                      onClick={() => {
                        UnLikePost(item._id)
                      }}
                    >
                      Unlike
                    </span>
                  ) : (
                    <span
                      style={{ fontSize: 15, fontWeight: 600 }}
                      onClick={() => {
                        LikePost(item._id)
                      }}
                    >
                      Like
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ margin: "0 10px" }}>{item.body}</p>
                  {item.comments.map((record, index) => {
                    return (
                      <h5 key={index}>
                        <span style={{ marginRight: 20, color: "#444" }}>
                          {record.postedBy.username}
                        </span>
                        {record.text}
                      </h5>
                    )
                  })}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    makeComment(e.target[0].value, item._id)
                  }}
                  style={{ padding: 10 }}
                >
                  <input
                    type='text'
                    placeholder='add a comment..'
                    style={{ width: "100%", border: "2px soild black" }}
                  />
                </form>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default HomeScreen
