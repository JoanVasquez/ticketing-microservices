import { NotFoundError, NotAuthorizedError } from "@jvtickets22/common";
import Ticket from "./ticket.model";

export const createTicketDao = async (data: any, userId: string) => {
  const { title, price } = data;
  const ticket = Ticket.build({
    title,
    price,
    userId,
  });

  await ticket.save();
  return ticket;
};
export const listTicketsDao = async () => {
  const tickets = await Ticket.find({});
  return tickets;
};

export const listTicketByIdDao = async (ticketId: string) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError();
  }

  return ticket;
};

export const updateTicketDao = async (data: any, currentUserId: string) => {
  const ticket = await Ticket.findById(data.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  if (ticket.userId !== currentUserId) {
    throw new NotAuthorizedError();
  }

  ticket.set({
    title: data.title,
    price: data.price,
  });

  await ticket.save();

  return ticket;
};
