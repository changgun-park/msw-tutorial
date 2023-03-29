import { rest } from "msw";

const blogs = [
  {
    id: 1,
    title: "sunt aut facere",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum",
  },
  {
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel",
  },
  {
    id: 3,
    title: "ea molestias quasi",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur",
  },
];

export const handlers = [
  rest.get("api/blogs", (req, res, ctx) => {
    return res(ctx.json(blogs));
  }),
  rest.get("api/blogs/:id", (req, res, ctx) => {
    const id = req.params.id;
    const blog = blogs.find((blog) => blog.id === id);

    if (blog) {
      return res(ctx.json(blog));
    } else {
      return res(ctx.json({ message: "blog not found" }));
    }
  }),
  rest.post("api/blogs/new", async (req, res, ctx) => {
    const blog = await req.json();
    blog.id = blogs.length + 1;
    blogs.push(blog);
    return res(
      ctx.status(201),
      ctx.json({
        id: blogs.length + 1,
        blog,
      })
    );
  }),
  rest.delete("api/blogs/:id", async (req, res, ctx) => {
    const id = req.params.id;
    const blogIndex = blogs.find((blog) => blog.id === id);
    blogs.splice(blogIndex, 1);
    return res(ctx.json({ message: "deleted successfully" }));
  }),
  rest.patch("api/blogs/:id", async (req, res, ctx) => {
    const id = req.params.id;
    const reqBody = await req.json();
    const blog = blogs.find((blog) => blog.id === id);

    blog.title = reqBody.title;
    blog.body = reqBody.body;

    return res(ctx.json({ message: "updated successfully" }));
  }),
];
