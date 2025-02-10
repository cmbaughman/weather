#!/usr/bin/env node

import { Command } from 'commander';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENWEATHERMAP_API_KEY;
const units = process.env.OPENWEATHERMAP_UNITS;
const commander = new Command();

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-z, --zip <zip>', 'Zip code')
  .parse(process.argv);

const opts = commander.opts();
const zip = opts.zip;

if (!zip) {
  console.error('Zip code is required');
  process.exit(1);
}

async function getLocation(zip) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`
  );

  if (!response.ok) {
    console.log(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`);
    throw new Error(`Failed to fetch location data. HTTP status code: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

async function getWeather(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
  );

  if (!response.ok) {
    console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`);
    throw new Error(`Failed to fetch weather data. HTTP status code: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

console.log('Fetching weather data...');

try {
  let location = await getLocation(zip);
  let weather = await getWeather(location.lat, location.lon);
  console.log(`Current weather in ${weather.name}: ${weather.weather[0].description}, ${weather.main.temp}°F`);
}
catch (error) {
  console.error(error.message);
  process.exit(1);
}
