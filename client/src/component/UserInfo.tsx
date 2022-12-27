import {useEffect, useState} from 'react'
import axios from 'axios';
import { Link} from "react-router-dom"

//mui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//redux store
import { useSelector,useDispatch} from 'react-redux';
import {RootState} from '../store/store'




export function UserInfo(){

    interface UserInfo{id:string,psword:string,name:string}
    interface UserGenre{genre:string}
    interface UserLanguage{language:string,count:number}
    interface UserYear{year:string}
    interface UserMovies{movieID:number,image:string,title:string,summary:string,language:string,rate:string,year:string,date:string}

    const url = useSelector<RootState,string>(state=>{return state.serverUrl.url})
    const [userID,setUserID] = useState(sessionStorage.getItem('user_id'))
    const [userInfo, setUserInfo] = useState<UserInfo[]>([])
    const [userGenre,setUserGenre] = useState<UserGenre[]>([])
    const [userLanguage,setUserLanguage] = useState<UserLanguage[]>([])
    const [userYear,setUserYear] = useState<UserYear[]>([])
    const [userMovies,setUserMovie] = useState<UserMovies[]>([])
    
    
    const getUserInfo = async()=>{
        await axios.post(`${url}/api/get/user/info`,{userID:userID}).then((res)=>{
            if(res.data.success){
                setUserInfo(res.data.data)
            }else{

            }
        }).catch((err)=>{

        })
    }

    const getUserGenre = async()=>{
        await axios.post(`${url}/api/movieinfo/user/genre`,{userID:userID}).then((res)=>{
            if(res.data.success){
                setUserGenre(res.data.data)
            }else{

            }
        }).catch((err)=>{
            
        })
    }

    const getUserLanguage = async()=>{
        await axios.post(`${url}/api/get/user/language`,{userID:userID}).then((res)=>{
            if(res.data.success){
                setUserLanguage(res.data.data)
            }else{

            }
        }).catch((err)=>{
            
        })
    }

    const getUserlikeMoives = async()=>{
        await axios.post(`${url}/api/get/user/movies`,{userID:userID}).then((res)=>{
            if(res.data.success){
                setUserMovie(res.data.data)
            }else{

            }
        }).catch((err)=>{
            
        })
    }

    const getUserYear = async()=>{
        await axios.post(`${url}/api/get/user/year`,{userID:userID}).then((res)=>{
            if(res.data.success){
                setUserYear(res.data.data)
            }else{

            }
        }).catch((err)=>{
            
        })
    }

    useEffect(()=>{
        getUserInfo()
        getUserGenre()
        getUserLanguage()
        getUserlikeMoives()
        getUserYear()
    },[])

    useEffect(()=>{
        setUserID(sessionStorage.getItem('user_id'))
    },[sessionStorage.getItem('user_id')])

    useEffect(()=>{
        console.log(  {userGenre},{userYear},{userLanguage},{userInfo},{userMovies})
    },[userMovies])


    return  <Box>
                <Grid container spacing={3}  direction="row" justifyContent="flex-start" alignItems="stretch">
                    <Grid item xs>
                        <Box></Box>
                    </Grid>
                    <Grid item xs={8}>
                            <Card sx={{mt:6, minWidth:800}} elevation={3}>
                                <Box component='h2' sx={{mt:4,mb:5,ml:4}}>USER INFO</Box>
                                <Box sx={{ml:10,mb:2}}>
                                    USER ID: {userInfo[0]?.id}  
                                </Box>
                                <Box sx={{ml:10,mb:2}}>
                                    USER Name: {userInfo[0]?.name}
                                </Box>
                                <Box sx={{ml:10,mb:2}}>
                                    USER Genre: {userGenre[0]?.genre},{userGenre[1]?.genre}
                                </Box>
                                <Box sx={{ml:10,mb:2}}>
                                    USER Language: {userLanguage[0]?.language},{userLanguage[1]?.language}
                                </Box>
                                <Box sx={{ml:10,mb:2}}>
                                    USER Year: {userYear[0]?.year},{userYear[1]?.year}
                                </Box>
                                <Box component='h3' sx={{ml:5,mt:10,mb:2}}>
                                    USER's Favorite Movie
                                </Box>
                                <Box sx = {{ml:10}}>
                                    {userMovies.map((m)=>{
                                        return <Card>
                                                <CardActionArea component={Link} 
                                                                to={`/home/movie/${m.movieID}`} 
                                                                onClick={()=>{sessionStorage.removeItem('movie_summary'); 
                                                                            sessionStorage.setItem('movie_summary',m.summary)}}>
                                                    <Grid container spacing={2} direction="row" key={m.movieID} sx={{mb:2}}>
                                                        <Grid item component='img' sx={{width:100, mr:2 }} src={m.image}></Grid>
                                                        <Grid item sx={{fontSize:20}}>
                                                            <Box sx={{fontWeight: 'bold'}}>{m.title}</Box>
                                                            <Box>{m.year}</Box>
                                                            <Box>{m.language}</Box>
                                                            <Box>{m.rate}</Box>  
                                                            <Box>{m.date}</Box>
                                                        </Grid>
                                                    </Grid>
                                                </CardActionArea>
                                            </Card>
                                        })}
                                </Box>
                            </Card>
                    </Grid>
                    <Grid item xs>
                        <Box></Box>
                    </Grid>
                </Grid>
            </Box>
}

export default UserInfo;