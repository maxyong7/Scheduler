import { Component, Input, OnInit } from '@angular/core';
import { TimelistService } from 'src/app/services/timelist.service';


@Component({
  selector: 'app-top-container',
  templateUrl: './top-container.component.html',
  styleUrls: ['./top-container.component.css'],

})
export class TopContainerComponent implements OnInit {
  private daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private date = new Date();
  public hour: any;
  public minute!: string;
  public second!: string;
  public ampm!: string;
  public day!: string;
  // public weatherData!: boolean;
  WeatherData: any;

  presetHot!: boolean;
  presetCool!: boolean;
  presetNight!: boolean;

  allowLocation: boolean = false
  themeSet!: string


  x = document.getElementById("demo");


  constructor(private timeService: TimelistService) { }

  ngOnInit(): void {

    const date = new Date()
    this.updateDate(date);
    setInterval(() => {
      const date = new Date()
      this.updateDate(date);
    }, 1000)

    this.day = this.daysArray[this.date.getDay()];


    this.WeatherData = {
      main: {},
      isDay: true,
      temp_feels_like: 25
    };
    this.getLocation()
    //Update weather every 5 minutes
    setInterval(() => { this.getLocation() }, 300000)

    // console.log(this.WeatherData);
  }



  private updateDate(date: Date) {
    const hours = date.getHours()
    this.ampm = hours >= 12 ? 'PM' : 'AM' //If hours > 12, then show "PM", else, show "AM"
    let hour12 = hours % 12 //Convert to 12 hour format
    let hourFinal = hour12 ? hour12 : 12 //If hour is 0, then show 12 instead (For 12:00AM, midnight)
    this.hour = hourFinal < 10 ? '0' + hourFinal : hourFinal //If hour is single digit, then add a '0' in front


    const minute = date.getMinutes()
    this.minute = minute < 10 ? '0' + minute : minute.toString() //If minute is single digit, then add a '0' in front

    const second = date.getSeconds()
    this.second = second < 10 ? '0' + second : second.toString() //If second is single digit, then add a '0' in front
  }

  // setWeather(data: any) {
  //   this.weatherData = data
  // }

  getWeatherData(lat?: string, lon?: string) {
    // fetch('https://api.openweathermap.org/data/2.5/weather?lat=45.553057&lon=-94.154819&appid=4d7784d60f34d3d8c5f282dbdfc12f12')
    //   .then(response => response.json())
    //   .then(data => { console.log(data), this.setWeatherData(data); })

    if (lat && lon) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4d7784d60f34d3d8c5f282dbdfc12f12`)
        .then(response => response.json())
        .then(data => { this.setWeatherData(data); })
    }
    else {

      //Fake Data
      let data = JSON.parse('{"coord": {"lon": -122.08,"lat": 37.39},"weather": [{"id": 800,"main": "Clear","description": "clear sky","icon": "01d"}],"base": "stations","main": {"temp": 282.55,"feels_like": 300.86,"temp_min": 280.37,"temp_max": 284.26,"pressure": 1023,"humidity": 100},"visibility": 10000,"wind": {"speed": 1.5,"deg": 350},"clouds": {"all": 1},"dt": 1560350645,"sys": {"type": 1,"id": 5122,"message": 0.0139,"country": "US","sunrise": 1560343627,"sunset": 165668810822},"timezone": -25200,"id": 420006353,"name": "Mountain View","cod": 200}');
      this.setWeatherData(data);
    }

  }

  setWeatherData(data: any) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit'
    });
    let sunriseTime = new Date(this.WeatherData.sys.sunrise * 1000);
    this.WeatherData.sunrise_time = sunriseTime.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit'
    });
    // console.log("sunriseTime")
    // console.log(sunriseTime)
    // console.log(this.WeatherData.sunrise_time)
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    //Farenheit
    this.WeatherData.temp_farenheit = ((this.WeatherData.main.temp - 273.15) * (9 / 5) + 32).toFixed(0);
    this.WeatherData.temp_min_farenheit = ((this.WeatherData.main.temp_min - 273.15) * (9 / 5) + 32).toFixed(0);
    this.WeatherData.temp_max_farenheit = ((this.WeatherData.main.temp_max - 273.15) * (9 / 5) + 32).toFixed(0);
    this.WeatherData.temp_feels_like_farenheit = ((this.WeatherData.main.feels_like - 273.15) * (9 / 5) + 32).toFixed(0);
    if (this.WeatherData.isDay && this.WeatherData.temp_feels_like_farenheit > 86) {
      this.themeSet = 'hot'
    }
    else if (this.WeatherData.isDay && this.WeatherData.temp_feels_like_farenheit < 86) {
      this.themeSet = 'cool'
    }
    else if (!this.WeatherData.isDay) {
      this.themeSet = 'night'
    }
    // console.log(this.themeSet)
  }

  changePreset() {
    if (this.allowLocation) {
      if (this.themeSet == 'cool') {
        this.WeatherData.isDay = false
        this.themeSet = 'night'
        console.log(this.WeatherData.isDay)
        console.log(this.themeSet)
      }
      else if (this.themeSet == 'night') {
        this.WeatherData.isDay = true
        this.themeSet = 'hot'
        console.log(this.WeatherData.isDay)
        console.log(this.themeSet)
      }
      else if (this.themeSet == 'hot') {
        this.WeatherData.isDay = true
        this.themeSet = 'cool'
        console.log(this.WeatherData.isDay)
        console.log(this.themeSet)
      }
    }
    else {
      if (this.WeatherData.isDay) {
        if (this.WeatherData.temp_feels_like < 30) {
          this.WeatherData.isDay = false
          this.WeatherData.temp_feels_like = 16

          this.WeatherData.temp_farenheit = 53
          this.WeatherData.temp_feels_like_farenheit = 46
          this.WeatherData.temp_min_farenheit = 45
          this.WeatherData.temp_max_farenheit = 55

        }
        else if (this.WeatherData.temp_feels_like > 30) {
          this.WeatherData.temp_feels_like = 18


          this.WeatherData.temp_farenheit = 60
          this.WeatherData.temp_feels_like_farenheit = 60
          this.WeatherData.temp_min_farenheit = 59
          this.WeatherData.temp_max_farenheit = 61
        }
      }
      else if (!this.WeatherData.isDay) {
        this.WeatherData.isDay = true
        this.WeatherData.temp_feels_like = 37


        this.WeatherData.temp_farenheit = 95
        this.WeatherData.temp_feels_like_farenheit = 100
        this.WeatherData.temp_min_farenheit = 94
        this.WeatherData.temp_max_farenheit = 105
      }
    }

  }

  // // Server Timing Too Slow
  // getGeoLocation() {
  //   let lat: string
  //   let lon: string
  //   this.timeService.getLocation().subscribe((data) => { lat = data.latitude, lon = data.longitude; this.getWeatherData(lat, lon) })
  // }

  getLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success function
        data => {
          this.showPosition(data),
            this.allowLocation = true
        },

        // Error function
        fail => {
          this.getWeatherData()
        },
        // Options. See MDN for details.
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
    } else {
      this.getWeatherData()
    }
  }

  showPosition(position: any) {

    // console.log(position)
    this.getWeatherData(position.coords.latitude, position.coords.longitude)
  }
}





