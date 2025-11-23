const http = require("http");
const { createClient } = require("redis");

const PORT = process.env.PORT || 8080;


const client = createClient({
	url: "redis://redis:6379"
});

client.on("error", (err) => console.error("Redis error", err));
client.connect();

const server = http.createServer(async (req, res) => {
	const count = await client.incr("counter");

	
	res.writeHead(200, {"Content-Type": "text/html; charset=utf=8" });
	res.end(`<h1>Docker work!</h1> <p>Hit counter:  ${count}</p>`);
});

server.listen(PORT, () => {
	console.log("Server started on port " + PORT);
});
