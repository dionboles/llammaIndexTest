import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { jsx } from 'hono/jsx'
import { query_engine } from "./main"
const app = new Hono()
async function queryValue() {
  const response = await (await query_engine()).query({ query: "How to do a commit" });
  return response.message.content;
}
app.get('/', (c) => {
  return c.html(`
    function TextareaForm() {
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Comment:</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
    `
  )
})

app.get('/api', async (c) => {
  return c.json(await queryValue())
})


const port = 3000;
console.log(`Server is running on port http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
