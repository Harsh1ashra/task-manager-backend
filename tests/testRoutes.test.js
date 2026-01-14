const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Task = require("../models/Task");

jest.setTimeout(30000);

beforeAll(async () => {
  await mongoose.connect(
    process.env.MONGO_URI_TEST || "mongodb://127.0.0.1:27017/todoDB_test"
  );
});

afterEach(async () => {
  await Task.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Task API", () => {

  test("POST /tasks creates a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
    expect(res.body.status).toBe("incomplete");

    const taskInDb = await Task.findById(res.body._id);
    expect(taskInDb).not.toBeNull();
  });

  test("GET /tasks returns all tasks", async () => {
    await Task.create([{ title: "Task 1" }, { title: "Task 2" }]);

    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty("title");
  });

  test("PUT /tasks/:id updates a task", async () => {
    const task = await Task.create({ title: "Old Task" });

    const res = await request(app)
      .put(`/tasks/${task._id}`)
      .send({ title: "Updated Task", status: "complete" });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Task");
    expect(res.body.status).toBe("complete");

    const updatedTask = await Task.findById(task._id);
    expect(updatedTask.title).toBe("Updated Task");
  });

  test("DELETE /tasks/:id deletes a task", async () => {
    const task = await Task.create({ title: "Delete Me" });

    const res = await request(app)
      .delete(`/tasks/${task._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task deleted");

    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });
});
