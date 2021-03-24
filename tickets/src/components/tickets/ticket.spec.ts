import supertest from "supertest";
import app from "../../index";
import {
  createTicketDao,
  listTicketByIdDao,
  listTicketsDao,
  updateTicketDao,
} from "./ticket.dao";
import Ticket from "./ticket.model";
import mongoose from "mongoose";

const tmpTicket: any = {
  title: "Any title",
  price: 50,
};

const createTicket = () => {
  return supertest(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send(tmpTicket);
};

test("Ticket DAO functions should exist", () => {
  expect(createTicketDao).toBeDefined();
  expect(listTicketsDao).toBeDefined();
  expect(listTicketByIdDao).toBeDefined();
  expect(updateTicketDao).toBeDefined();
});

describe("Tickets REST API tests", () => {
  test("Testing creation of ticket", async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await createTicket().expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(50);
  });

  test("Can only be accessed if the user is signed in ==> Creation", async () => {
    return supertest(app).post("/api/tickets").send(tmpTicket).expect(401);
  });

  test("Testing creation of ticket validation ==> title", async () => {
    return supertest(app)
      .post("/api/tickets")
      .set("Cookie", global.signup())
      .send({ title: "", price: 20 })
      .expect(400);
  });

  test("Testing creation of ticket validation ==> price", async () => {
    return supertest(app)
      .post("/api/tickets")
      .set("Cookie", global.signup())
      .send({ title: "Any title" })
      .expect(400);
  });

  test("Testing list ticket by Id", async () => {
    const response = await createTicket().send(tmpTicket);

    const ticketResponse = await supertest(app)
      .get(`/api/tickets/${response.body.id}`)
      .expect(200);

    expect(ticketResponse.body.title).toEqual(tmpTicket.title);
    expect(ticketResponse.body.price).toEqual(tmpTicket.price);
  });

  test("Testing ticket by ID not found ==> Get By Id", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();
    await supertest(app).get(`/api/tickets/${ticketId}`).expect(404);
  });

  test("Fetching list of tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await supertest(app).get("/api/tickets").expect(200);

    expect(response.body.length).toEqual(3);
  });

  test("Testing ticket by ID not found ==> Update", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();
    tmpTicket.id = ticketId;
    await supertest(app)
      .put("/api/tickets")
      .set("Cookie", global.signup())
      .send(tmpTicket)
      .expect(404);
  });

  test("Can only be accessed if the user is signed in ==> Updating", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();
    tmpTicket.id = ticketId;
    return supertest(app).put("/api/tickets").send(tmpTicket).expect(401);
  });

  test("Testing if the user own the ticket", async () => {
    const response = await supertest(app)
      .post("/api/tickets")
      .set("Cookie", global.signup())
      .send(tmpTicket);

    response.body.title = "A new title";
    await supertest(app)
      .put("/api/tickets")
      .set("Cookie", global.signup())
      .send(response.body)
      .expect(401);
  });

  test("Updating ==> input validation", async () => {
    const cookie = global.signup();

    await supertest(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send(tmpTicket);

    await supertest(app)
      .put("/api/tickets")
      .set("Cookie", cookie)
      .send({ title: "", price: -10 })
      .expect(400);
  });

  test("Testing updating of ticket", async () => {
    const cookie = global.signup();

    const response = await supertest(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send(tmpTicket);

    tmpTicket.id = response.body.id;
    tmpTicket.title = "A new title";

    await supertest(app)
      .put("/api/tickets")
      .set("Cookie", cookie)
      .send(tmpTicket)
      .expect(200);

    const ticketResponse = await supertest(app).get(
      `/api/tickets/${response.body.id}`
    );

    expect(ticketResponse.body.title).toEqual("A new title");
  });

  test("Testing 404", async () => {
    return supertest(app).get("/api/safdsf").expect(404);
  });
});
