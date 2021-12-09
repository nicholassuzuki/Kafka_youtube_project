console.log('producer...')
import Kafka from 'node-rdkafka';
//schema for event objects
import eventType from './../eventType.js';

// creates a stream that we will write our events to
const stream = Kafka.Producer.createWriteStream({
  // createWriteStream takes 3 parameters. 1. broker to connect to, 2. options (empty object in this instance) , 3.topic
  'metadata.broker.list': 'localhost:9092'
},{}, {topic: 'quickstart-events'});

const getRandomAnimal = () => {
  // these are the two symbols in enum so they are the only symbols we can pass in. will not work with anything not in there
  const categories = ['CAT', 'DOG'];
  // randomly returns one of the elements in the random array
  return categories[Math.floor(Math.random() * categories.length)]


}

const getRandomNoise = animal => {
  if (animal === 'CAT') {
    // two noise options for Cat
    const noises = ['meow', 'purr'];
    return noises[Math.floor(Math.random() * noises.length)]
  } else if (animal === 'DOG') {
    const noises = ['woof', 'bark!'];
    return noises[Math.floor(Math.random() * noises.length)]

  }

}

// function that create a message to send to the stream, also has an error handler
const queueMessage = () => {
  const category = getRandomAnimal();
  const noise = getRandomNoise(category);

  
  const event = { category, noise };
  // this is will write a buffer to the stream with the defined event in line 14
  const success = stream.write(eventType.toBuffer(event));

  if (success) {
    console.log('message wrote successfully to stream');
    } else {
      console.log('something went wrong...')
    }


  // console.log(result)
}

// interval to write messages to stream every 3 seconds
setInterval(() => {
  queueMessage();
  }, 3000);