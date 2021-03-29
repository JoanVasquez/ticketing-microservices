import { Publisher, Subjects, TicketCreatedEvent } from "@jvtickets22/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
