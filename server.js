import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello devs!");
});

let users = [
  { id: 1, name: "Gloria" },
  { id: 2, name: "Tomas" },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.json({ message: "User added successfully!", data: newUser });
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  user.name = req.body.name;
  res.json({ message: "User updated successfully!", data: user });
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.json({ message: "User deleted successfully!", data: users });
});
