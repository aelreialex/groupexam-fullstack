import express from "express";

const app = express();
app.use(express.json());

app.get("/api/health", (_req, res) => {
	res.json({ status: "ok" });
});

app.listen(8080, () => {
	console.log("API running on http://localhost:8080");
});
