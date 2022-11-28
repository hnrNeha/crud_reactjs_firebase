import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { auth, db, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import { toast } from "react-toastify";

import "./blog_page.css";
import Post from "../blog/blog";
import CreatePost from "../blog/create_modal";


const images = [
  "https://images.unsplash.com/photo-1637014387463-a446e89abb68?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1637019838019-5f14d84ee308?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1471516145542-072ca3be18c4?ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2ODkyNTczNg&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1666901945699-f49fbf6386b8?ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2ODkyNTgxMQ&ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
]


function BlogPage() {
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [userdata, setData] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // Use Effect to load Post Data on application loading
  useEffect(() => {
    let url = 'https://jsonplaceholder.typicode.com/posts'
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        toast("Unable to get Post Data");
      });
  }, []);


  // Function to delete a post and update Post list
  const deletePost = (blog_id) => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + blog_id, {
       method: 'DELETE',
    }).then((response) => response.json())
    .then((json) => {
      toast("Post deleted")
      const modifiedPost = posts.filter(eachPost => {
        return eachPost.id !== blog_id;
      });
      setPosts(modifiedPost);
    })
    .catch((error) => {
        toast(error)
    });
  }

  // Function to edit a post and update the Post List
  const editPost = (blog_id, title, description) => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + blog_id, {
      method: 'PUT',
      body: JSON.stringify({
        id: blog_id,
        title: title,
        body: description,
        userId: user?.user_id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      toast("Post Updated");
      const modifiedPosts = posts.map(post => {
        if (post.id === blog_id) {
          return {...post, title: title, body: description};
        }
        return post;
      })
      setPosts(modifiedPosts);
    })
    .catch((error) => {
      toast(error)
    });
  }

  // Function to add a Post and update the Post List
  const addPost = (title, body) =>{
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: user?.user_id,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        toast("Post Added successfully")
        json.userID = userdata.user_id
        const modifiedPost = [json, ...posts]
        handleClose();
        setPosts(modifiedPost);
    })
    .catch((error) => {
        toast(error)
    });
  }

  // UseEffect to modify user related data state management
  useEffect(() => {
    if (loading) return;
    const fetchUserData = () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = getDocs(q);
        doc.then((temp_data) => {
          const data = temp_data.docs[0]?.data();
          setData(data);
        })
        .catch((error) => {
          toast(error);
        })
      } catch(err) {
        toast("Not able to fetch user data");
      }
    };
    if (user) {
      fetchUserData();
    }
  }, [user, loading, navigate]);

  return (
    <div className="app">
      <div className="app__header">
        <div className="app__headerWrapper">
          <strong>Blog Posts</strong>
          { !user ?
            <div className="app__headerButtons">
              <Link to="/login"><button className="primary__button">Login</button></Link>
              <Link to="/register"><button className="text__button">Signup</button></Link>
            </div>
          :
            <div className="app__headerButtons">
              <Avatar
                className="post__avatar"
                alt={user?.email}
                src="/static/images/avatar/1.jpg"
              />
              <button className="text__button" onClick={handleOpen}>
                <Avatar
                  className="post__avatar"
                  alt="+"
                  src="/static/images/avatar/1.jpg"
                />
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <CreatePost addPost={addPost} title={""} description={""}/>
              </Modal>
              <button className="text__button" onClick={logout}>Logout</button>
            </div>
          }
        </div>
      </div>

      <Container maxWidth="lg" className="blogContainer">
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Post
              key={post.id}
              blog_id={post.id}
              user_id={post.userId}
              title={post.title}
              description={post.body}
              imageUrl={images[Math.floor(Math.random() * 4)]}
              userData={userdata}
              deletePost={deletePost}
              editPost={editPost}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
}
export default BlogPage;