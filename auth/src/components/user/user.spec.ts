import supertest from "supertest";
import app from "../../index";
import { signInDao, signUpDao } from "./user.dao";

const tmpUser = {
  email: "test@test.com",
  password: "123456",
};

test("User DAO functions should exist", () => {
  expect(signUpDao).toBeDefined();
  expect(signInDao).toBeDefined();
});

describe("User REST API tests", () => {
  test("Testing signup", async () => {
    return supertest(app).post("/api/users/signup").send(tmpUser).expect(201);
  });

  test("Request signup validations ==> email", async () => {
    return supertest(app)
      .post("/api/users/signup")
      .send({ email: "test", password: "123456" })
      .expect(400);
  });

  test("Request signup validations ==> password", async () => {
    return supertest(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "" })
      .expect(400);
  });

  test("dissallow duplicate emails", async () => {
    await supertest(app).post("/api/users/signup").send(tmpUser).expect(201);
    await supertest(app).post("/api/users/signup").send(tmpUser).expect(400);
  });

  test("Testing signin", async () => {
    await supertest(app).post("/api/users/signup").send(tmpUser).expect(201);
    await supertest(app).post("/api/users/signin").send(tmpUser).expect(200);
  });

  test("Request signin validations ==> email", async () => {
    return supertest(app)
      .post("/api/users/signin")
      .send({ email: "test", password: "123456" })
      .expect(400);
  });

  test("Request signin validations ==> password", async () => {
    return supertest(app)
      .post("/api/users/signin")
      .send({ email: "test@test", password: "" })
      .expect(400);
  });

  test("Request invalid credentials singin ==> Email", async () => {
    return supertest(app).post("/api/users/signin").send(tmpUser).expect(400);
  });

  test("Request invalid credentials signin ==> Password", async () => {
    await supertest(app).post("/api/users/signup").send(tmpUser).expect(201);
    await supertest(app)
      .post("/api/users/signin")
      .send({ email: "test@test.com", password: "asfsagfssdg" })
      .expect(400);
  });

  test("clears the cookie after signing out", async () => {
    await supertest(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    const response = await supertest(app)
      .post("/api/users/signout")
      .send({})
      .expect(200);

    expect(response.get("Set-Cookie")[0]).toEqual(
      "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });

  test("responds with details about the current user", async () => {
    const cookie = await global.signup();

    const response = await supertest(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .send();
    expect(200);
    expect(response.body.currentUser.email).toEqual("test@test.com");
  });

  test("Respond with null if not aunthenticated", async () => {
    const response = await supertest(app)
      .get("/api/users/currentuser")
      .send()
      .expect(200);

    expect(response.body.currentUser).toEqual(null);
  });

  test("Testing 404", async () => {
    return supertest(app).get("/api/users/test").expect(404);
  });
});
