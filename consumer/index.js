console.log('consumer...');
import Kafka from 'node-rdkafka';
import eventType from './../eventType.js';

// creates a stream that we will write our events to
const consumer = Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:9092'
},{});

// this connects the consumer to the broker
consumer.connect();

// when the consumer is in the 'ready' state the anonymous function will be called
consumer.on('ready', () => {
  console.log('consumer ready..')
  // subscribes to the topic **data type of arguement must be an array, unconfirmed if it can have multiple arrays
  consumer.subscribe(['quickstart-events']);
  // consumes information in topic as it is entered
  consumer.consume(); 
  // when the consumer changes to the 'data' state (recieves new data), anonymous func is invoke with data object passed in as an argument
}).on('data', (data) => {
  // prints message with temperal literal of the value of the data.value property
  console.log(`received message: ${eventType.fromBuffer(data.value)}`)  

});