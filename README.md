# Clockpy
This is my first project with Raspberry Pi 3 B+ and LCD display 3.5".
I needed a watch next to my bed that shows: city (position), time, date, sunrise or sunset, weather, temperature and humidity.

<img src="https://github.com/frakka92/Alarmpy/blob/master/img/screenshot.png" style="width:480px, height=320px;">

## Features
- **Location & Time**: Displays current city and real-time clock (HH:MM format)
- **Date**: Shows day of week and date (e.g., Monday, 25 March)
- **Sunrise/Sunset**: Displays next sunrise or sunset time with automatic icon switching
- **Weather**: Shows current weather condition with weather icons
- **Temperature**: Displays current temperature in Celsius
- **Humidity**: Shows current humidity percentage
- **Night Mode**: Automatically switches to dark theme after sunset

## Technologies used
<ul>
  <li>Bootstrap (Responsive Grid Layout)</li>
  <li><a href="https://erikflowers.github.io/weather-icons/"> Erik Flower's weather icons </a></li>
  <li><a href="https://openweathermap.org/api/"> OpenWeatherMap API </a></li>  
  <li>jQuery for DOM manipulation and AJAX calls</li>
  <li>Geolocation API for position detection</li>
</ul>

## Recent Updates
- Added date display (day and date)
- Fixed time/date formatting consistency
- Improved responsive design for date element
- Enhanced sunset time formatting
