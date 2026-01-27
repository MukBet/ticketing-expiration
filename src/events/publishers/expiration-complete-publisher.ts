import { Publisher, ExpirationCompleteEvent, Subjects } from '@motway_ticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
