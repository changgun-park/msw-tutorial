import { useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  axios
    .get("api/blogs")
    .then((res) => {
      setPosts(res.data);
    })
    .catch(console.log);

  return (
    <div>
      {posts.map((post) => (
        <section key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </section>
      ))}
    </div>
  );
}

export default App;
