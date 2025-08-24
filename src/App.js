import logo from './logo.svg';
import './App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import { Container, Typography } from '@mui/material';
import { Padding } from '@mui/icons-material';
import CardComponent from './component/CardComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';



import moment from "moment";
import 'moment/min/locales'

const theme = createTheme({
  typography:{
    fontFamily: ["Rubik"]
  }
})
function App() {
  const { t, i18n } = useTranslation();

const [lang, setLang] = useState('en')
      // moment.locale(lang);

  return (
    <div className="App" style={{backgroundColor:"#113F67"}}>
      <ThemeProvider theme={theme}>
        <Container  sx={{width:"fit-Content", height:"100vh",display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column"}}>  
        
       <CardComponent local={lang}/>
       <Button sx={{alignSelf:"start",color:"#fff"}} onClick={()=>{
        if(i18n.language == 'ar'){
       i18n.changeLanguage('en')
       setLang('en')

      }else{
      i18n.changeLanguage('ar')
       setLang('ar')
        }
       }}>{t('Arabic')}</Button>
    </Container>
 
    </ThemeProvider>
    </div>
  );
}

export default App;
