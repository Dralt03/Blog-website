import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [posts, setposts] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [cmts, setcmts] = useState([]);
  const [cmtid, setcmtid] = useState(0);
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setposts(data);
      });
  }, []);

  const goBack = () => {
    if (start !== 0) {
      setStart(start - 5);
      setEnd(end - 5);
    }
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  }

  const goForward = () => {
    if (end !== posts.length) {
      setStart(start + 5);
      setEnd(end + 5);
    }
  };

  const expand = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setcmts(data);
      });

    setcmtid(id);
  };

  return (
    <div className="main">
      <header className="header">
        <nav className="navbar">
          <span className="Head">Blog</span>
          <div className="custom">
            <span onClick={() => setAdd(true)} className="user-option">Add</span>
            <span id="profile" className="user-option">
              Profile
            </span>
          </div>
        </nav>
      </header>
      {!add ? (<div className="blogs">
        {posts.slice(start, end).map((post) => {
          return (
            <div key={post.id} className="card">
              <p onClick={() => expand(post.id)} className="title">
                {post.title}
              </p>
              <p className="body">{post.body}</p>
              {cmtid === post.id ? (
                cmts.map((cmt) => {
                  return (
                    <li className="cmt" key={cmt.id}>
                      <span>{cmt.email}</span>
                      <span>{cmt.body}</span>
                    </li>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>)
      :
      (<>
      <div className="form-wrapper">
        <form className="post" onSubmit={(e) => e.preventDefault()}>
          <label>Title</label>
          <input className="blog-title" type="text" value={title} onChange={(e) => changeTitle(e)}></input>
          <label>Body</label>
          <textarea className="blog-body" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
          <button onClick={() => setAdd(false)} id="submit" className="button" type="Submit"> Post </button>
        </form>
      </div>
      </>)}

      <div className="change-page">
        <button className="button" onClick={goBack}>Previous</button>
        <button className="button" onClick={goForward}>Next</button>
      </div>
    </div>
  );
}

export default App;
