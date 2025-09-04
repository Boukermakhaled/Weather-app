import { Card, CardContent, Typography } from "@mui/material"
import CloudIcon from '@mui/icons-material/Cloud';
import axios from 'axios'
import moment from "moment";
import 'moment/min/locales'
import {useEffect, useState} from 'react'

//translation
import { useTranslation } from 'react-i18next';
// media query
import useMediaQuery from "@mui/material";

  let cancelAxios = null;
export default function CardComponent({local}){
    const { t, i18n } = useTranslation();
    // console.log(i18n.language + 3)
      moment.locale(local)

  const [temp, setTemp] = useState({
    tmp: null,
    max: null,
    min: null
  });
  const [weather, setWeather] = useState({
    main: '',
    description: '',
    icon: '',
  })
  const [dateTime, setDate] = useState(null);

  useEffect(()=>{
    
    setDate(moment().format('MMMM Do YYYY, h:mm:ss a'));
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=34.1140&lon=2.0974&appid=544feac5663efc7eea534deea8db1d69',
      {
        cancelToken: new axios.CancelToken((c)=>{
           cancelAxios = c;
        })
      }
    )
  .then(function (response) {
    // handle success
    setTemp({ 
      max:Math.round(response.data.main.temp_max- 272.15),
      min:Math.round(response.data.main.temp_min- 272.15),
       tmp: Math.round(response.data.main.temp- 272.15)
      });
    setWeather({
      main: response.data.weather[0].main,
       description:response.data.weather[0].description,
        icon:`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` 
      });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  return () =>{
    cancelAxios();
  }
  },[])
    return(
        <Card className="Card" sx={{  
        bgcolor:"#ffffff17", 
        borderRadius:"24px",
        border:".8px solid #ffffff2c",
        color:"#fff",
        boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.24)"
         }}>
      <CardContent>
        <div style={{padding:"10px",display:"flex", flexDirection:"row-reverse", alignItems:"end", gap:"20px"}}>
          <Typography variant="h2" sx={{fontWeight:500}}>{t('Aflou')}</Typography>
          <Typography variant="p" sx={{fontWeight:500}}>{moment().format('MMMM Do YYYY, h:mm:ss a')}</Typography>
        </div>
        <hr style={{color:"#fff"}}></hr>
        <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <CloudIcon sx={{fontSize:"180px"}}/>
            </div>
          <div style={{textAlign:"right",display:"flex",flexDirection:"column", gap:"10px"}}>
            <div style={{height:"100%",display:"flex", justifyContent:"space-between",alignItems:"center", gap:"20px"}}>
             <img src={weather.icon}/> 
              <Typography  sx={{fontWeight:400, fontSize:"80px"}} variant="h3 ">{temp.tmp}°</Typography>
            </div>
            <Typography sx={{fontWeight:300}}>{t(`${weather.description}`)}</Typography>
            <div style={{display:"flex" ,justifyContent:"end", gap:"20px"}}>
              <Typography sx={{fontWeight:500}}>{temp.min}° :{t('Min')}</Typography>
              <Typography sx={{fontWeight:500}}>{temp.max}° :{t('Max')}</Typography>
            </div>
          </div>
        </div>
      </CardContent>
      
    </Card>
    )
}