import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats-wrapper";

interface PayLoad {
  orderId: string;
}

const expirationQueue = new Queue<PayLoad>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  // Received a job.
  console.log('Publish an expiration event for orderId:', job.data.orderId);
  // Here you would typically publish an event to NATS or perform other actions
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });

});

export { expirationQueue };