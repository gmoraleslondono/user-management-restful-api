import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());

const PORT = 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "A simple Express users API",
    },
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, (req, res) => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

/**
 * @swagger
 * /:
 *  get:
 *    summary: Welcome message
 *    description: Returns a welcome message
 *    responses:
 *      200:
 *        description: Hello devs!
 */
app.get("/", (req, res) => {
  res.send("Hello devs!");
});

let users = [
  { id: 1, name: "Gloria" },
  { id: 2, name: "Tomas" },
];

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Getting all users
 *    description: Returns a list of all users in the database
 *    responses:
 *      200:
 *        description: A list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 */

app.get("/users", (req, res) => {
  res.json(users);
});

/**
 * @swagger
 *  /users:
 *    post:
 *      summary: Adding a new user
 *      description: Add a new user to the database
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *               - name
 *              properties:
 *                name:
 *                  type: string
 *      responses:
 *        200:
 *          description: User added successfully!
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 */
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.json({ message: "User added successfully!", data: newUser });
});

/**
 * @swagger
 *  /users/{id}:
 *    put:
 *      summary: Updating a user by ID
 *      description: Update a existing user in the database
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of user to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *      responses:
 *        200:
 *          description: User updated successfully!
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      name:
 *                       type: string
 *          404:
 *            description: User not found!
 */
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  user.name = req.body.name;
  res.json({ message: "User updated successfully!", data: user });
});

/**
 * @swagger
 *  /users/{id}:
 *    delete:
 *      summary: Deleting a user by ID
 *      description: Delete a user from the database
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of user to delete
 *      responses:
 *        200:
 *          description: User deleted successfully!
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        404:
 *          description: user not found!
 */
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.json({ message: "User deleted successfully!", data: users });
});
