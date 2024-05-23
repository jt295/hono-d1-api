import { Hono } from "hono";
import todosRoutes from "./routes/todos";
import { drizzle } from "drizzle-orm/d1";
import postRoutes from "./routes/posts";
import productRoutes from "./routes/products";

const app = new Hono();

// Drizzle middleware
app.use(async (c, next) => {
  c.set("db", drizzle(c.env.DB));
  await next();
});

app.get("/", (c) => {
  return c.text("Hello from the CMS API!");
});

app.get("/home", (c) => {
  return c.json({
    title: "Homepage",
    description: "This is an example homepage, with an image and some content",
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09",
    listOfSiteFeatures: [
      "Content - homepage, posts, products, and todo list",
      "API endpoints for fetching content",
      "Todo list CRUD api",
      "Database for storing posts, products, and todos",
    ],
    content: `<h2>This is an h2 title</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla fuga, doloremque et rerum debitis a autem eos nisi quasi illo quos atque alias, illum ut, incidunt dolorum nihil. Suscipit, culpa repellat laudantium fuga optio a quia quisquam corrupti nostrum libero.</p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt culpa tempore nobis tempora quidem ducimus.</p>

    <h2>This is a second h2 title</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cum natus nisi labore. Eius blanditiis cum natus neque sunt reiciendis nesciunt unde quod quibusdam adipisci deserunt minus, molestias autem quaerat?
    Repellat sapiente numquam corporis eum tempore impedit consectetur tempora culpa dignissimos corrupti. Error distinctio odit commodi perferendis obcaecati. Eius itaque consequatur nostrum nesciunt inventore dolore ducimus reiciendis vitae aperiam exercitationem?
    Voluptates id minus cumque eaque, ratione reiciendis ad ducimus ipsum repellat voluptatum architecto. Pariatur officiis doloremque laborum tenetur necessitatibus facere mollitia voluptas dolorum voluptate, officia dignissimos ipsam inventore eaque quas!</p>

    <h2>Below is a list</h2>
    <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur labore ut nam corrupti corporis odio!</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur labore ut nam corrupti corporis odio!</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur labore ut nam corrupti corporis odio!</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur labore ut nam corrupti corporis odio!</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur labore ut nam corrupti corporis odio!</li>
    </ul>`,
  });
});

app.route("/todos", todosRoutes);
app.route("/posts", postRoutes);
app.route("/products", productRoutes);

export default app;
