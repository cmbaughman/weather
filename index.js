// const axios = require('axios');

// async function getWeather(city) {
//   const apiKey = 'your_openweathermap_api_key';
//   const response = await axios.get(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
//   );
//   const data = response.data;
//   console.log(`Current weather in ${city}: ${data.weather[0].description}, ${data.main.temp}°C`);
// }

// getWeather('New York');

import commander from 'commander';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENWEATHERMAP_API_KEY;

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-c, --city <city>', 'City name')
  .parse(process.argv);

const opts = commander.opts();
const city = opts.city;

if (!city) {
  console.error('City is required');
  process.exit(1);
}

console.log(`City: ${city}`);
console.log(`API Key: ${apiKey}`);
console.log('Fetching weather data...');
