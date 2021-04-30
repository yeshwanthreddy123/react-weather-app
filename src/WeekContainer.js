
import React from 'react';

import DayCard from './DayCard';
class WeekContainer extends React.Component {
  state = {
    fullData: [],
    dailyData: [],
    error:' '
  }
   

  getWeather = (zip,city,lat,lon) => {
    let weatherURL=''
        if(zip.length>0)
            weatherURL=`http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&units=imperial&APPID=${process.env.REACT_APP_KEY}`
        else if(city.length>0)
        weatherURL=`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${process.env.REACT_APP_KEY}`
        else
        weatherURL=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_KEY}`


      
    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      document.getElementById("zip").value='';
      document.getElementById("loc").value='';
      document.getElementById("lat").value='';
      this.setState({
        fullData: data.list,
        dailyData: dailyData,
        error:''
      }, () => console.log(""))
    }).catch((error)=>{
        this.setState({error:"enter correct location"})
        document.getElementById("zip").value='';
        document.getElementById("loc").value='';
        document.getElementById("lat").value='';
    })
  }
  formatDayCards = () => {
      if(this.state.error)
      {
          return <h1>{this.state.error}</h1>
      }
    return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
  }

  render() {
    return (
        <div className="container">
      <h1 className="display-1 jumbotron">5-Day Forecast.</h1>

      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" onClick={(e)=>{
          e.preventDefault();
          this.getWeather(document.getElementById("zip").value,'','','');
      }} type="button" id="button-addon1">SubmitZipCode</button>
        <input type="text" id="zip" className="form-control" placeholder="Enter zipcode" aria-label="Example text with button addon" aria-describedby="button-addon1" />
      </div>

      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" onClick={(e)=>{
         e.preventDefault();
         this.getWeather('',document.getElementById("loc").value,'','');
      }} type="button" id="button-addon1">Submit Location</button>
        <input type="text" id="loc" className="form-control" placeholder="Enter Location" aria-label="Example text with button addon" aria-describedby="button-addon1" />
      </div>


      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" onClick={(e)=>{
          e.preventDefault();
          var lat_lon=document.getElementById("lat").value.split(" ");
          if(lat_lon.length===2)
            this.getWeather('','',lat_lon[0],lat_lon[1]);
          else{
                document.getElementById("lat").value='';
                this.setState({error:'Enter Correct Latitude and  Longitude '})  
            }
      }} type="button" id="button-addon1">Submit lat and lon</button>
        <input type="text" id="lat" className="form-control" placeholder="Enter latitude and Longitude separated by a space" aria-label="Example text with button addon" aria-describedby="button-addon1" />
      </div>

  

      
      
      

       


      
      <h5 className="display-5 text-muted"></h5>
        <div className="row justify-content-center">

          {this.formatDayCards()}

        </div>
      </div>
    )
  }
}

export default WeekContainer;