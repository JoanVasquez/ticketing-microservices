import supertest from "supertest";
import app from "../../index";
import {
  createTicketDao,
  listTicketByIdDao,
  listTicketsDao,
  updateTicketDao,
} from "./ticket.dao";

const tmpTicket = {};

test("Ticket DAO functions should exist", () => {
  expect(createTicketDao).toBeDefined();
  expect(listTicketsDao).toBeDefined();
  expect(listTicketByIdDao).toBeDefined();
  expect(updateTicketDao).toBeDefined();
});

describe("Tickets REST API tests", () => {
  test("Testing creation of ticket", async () => {
    return supertest(app)
      .post("/api/tickets")
      .set("Cookie", global.signup())
      .send(tmpTicket)
      .expect(201);
  });

  test("Can only be accessed if the user iss signed in", async () => {
    return supertest(app).post("/api/tickets").send(tmpTicket).expect(401);
  });

  test("Testing creation of ticket ==> title", async () => {
    //return supertest(app).post("/api/tickets/create").send({}).expect(400);
  });

  test("Testing creation of ticket ==> price", async () => {
    //return supertest(app).post("/api/tickets/create").send({}).expect(400);
  });

  test("Testing 404", async () => {
    return supertest(app).get("/api/tickets/test").expect(404);
  });
});
