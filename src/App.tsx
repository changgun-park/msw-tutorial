import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios
      .get("api/blogs")
      .then((res) => {
        setPosts(res.data);
      })
      .catch(console.log);
  }, []);

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("api/blogs/new", {
        title,
        body,
      })
      .then(console.log)
      .catch(console.log)
      .finally(() => {
        setBody("");
        setTitle("");
      });

    axios
      .get("api/blogs")
      .then((res) => {
        setPosts(res.data);
      })
      .catch(console.log);
  };

  return (
    <div>
      <section>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </section>
      <br />
      <section>
        <h2>New Project</h2>
        <form onSubmit={handleUpload}>
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
          />
          <label htmlFor="body">Body</label>
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            name="body"
            type="text"
            id="body"
          />
          <button type="submit">upload</button>
        </form>
      </section>
    </div>
  );
}

export default App;
