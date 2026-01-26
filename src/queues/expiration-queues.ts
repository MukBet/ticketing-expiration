import { Queue } from "bull";

interface PayLoad {
  orderId: string;
}

const expirationQueue = new Queue<PayLoad>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  console.log('Publish an expiration event for orderId:', job.data.orderId);
  // Here you would typically publish an event to NATS or perform other actions
});

export { expirationQueue };