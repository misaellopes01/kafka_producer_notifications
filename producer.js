import { Kafka } from "kafkajs";
import { randomUUID } from 'node:crypto'

async function bootstrap(){
  const kafka = new Kafka({
    clientId: 'notifications-producer',
        brokers: ['golden-rodent-12803-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'Z29sZGVuLXJvZGVudC0xMjgwMyROapGX2oijStw0Pi_iTIILuu-iRgp_1N-GRm0',
          password:
            'EttfOEy_Ah8Ceu2HteaGZyKQKbEa9_hfUMhUYi72WxRdJuPtppaUAK5DOosDUjEdLLobLg==',
        },
        ssl: true,
  })
  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
        {
          value: JSON.stringify({
            recipientId: randomUUID(),
            content: "Foi mencionado em uma publicação!",
            category: "social"
          })
        },
        {
          value: JSON.stringify({
            recipientId: randomUUID(),
            content: "Nova solicitação de amizade!",
            category: "social"
          })
        }
      ]
    })

    await producer.disconnect()
}

bootstrap()