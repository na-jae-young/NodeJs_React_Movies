import { useEffect,useState } from "react";
import Axios from 'axios'
import { MovieReview } from "./MovieReview";

//mui
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import Box from '@mui/material/Box';

//redux store
import { useSelector} from 'react-redux';
import {RootState} from '../store/store'


export function MovieReviewList(props:{id:string}){
    interface ReviewData{ID:any, userID:string|null, movieReview:string, date:Date, updated:string}

    const url = useSelector<RootState,string>(state=>{return state.serverUrl.url})
    const userID = useSelector<RootState,string>(state=>{return state.userId.id})

    const [movieId, setMovieId] = useState(props.id)
    //const [userID,setUserID] = useState(sessionStorage.getItem("user_id"))
    const [movieReview,setMovieReview] = useState('') //사용자에게 입력받은 리뷰내용
    const [movieReviewList,setMovieReviewList] = useState<ReviewData[]>([]) //영화에 달린 리뷰 리스트 
    const [newReviewList,setNewReviewList] = useState<ReviewData[]>([]) //새로운 리뷰가 추가된 리뷰 리스트
    const [reviewCount,setReviewCount] = useState<number>(0)

    const getReviewData =  ()=>{
        Axios.post(`${url}/api/movie/reviews/get`,{movieID:movieId}).then((res)=>{
         if(res.data.success){
           setMovieReviewList(res.data.data)
         }else{
           alert('data load fail')
         }
       })
    }

    useEffect(()=>{
        getReviewData()
    },[])

    useEffect(()=>{
      setMovieReviewList(newReviewList)
    },[newReviewList])

    useEffect(()=>{
      setReviewCount(movieReviewList.length)
    },[movieReviewList])

    const submitReview = async ()=>{
        const nowDATE = new Date();
        if(userID === null){ 
          setMovieReview('')
          return alert('login이 필요합니다.')
        }
        if(movieReview === '') return alert('리뷰를 입력하세요') 
        Axios.post(`${url}/api/insert`,{
          movieName:'',
          movieID:movieId,
          movieReview:movieReview,
          userID:userID,
          data: nowDATE
        }).then((res)=>{
           if(res.data.success){
            alert(res.data.message)
            const newReview ={ID:res.data.data.data ,userID:userID,movieReview:movieReview ,date :nowDATE,updated:'n'}
            setNewReviewList( [...movieReviewList,newReview])
            setMovieReview('')
          }else{
            console.log(res.data.err)
            alert('insert fail')
          }
        }).catch((err)=>{
          console.log(err)
          alert('insert error 관리자에 문의 review submit')
        })
      }




    return <>
        <Box width="40%" sx={{fontWeight:'bold',ml:5 }}>
          <CommentTwoToneIcon/>comments: {reviewCount}  
        </Box>
        <Typography component="div" sx={{minWidth:450, backgroundColor:'white', m:5,boxShadow: 1 ,borderRadius: 1}}>
          <FormControl fullWidth sx={{ m: 1,maxWidth:'97%'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Review</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"  
              multiline  
              minRows={5}   
              maxRows={5}                           
              value={movieReview} 
              placeholder='Review...' 
              onChange={(e)=>{
                setMovieReview(e.target.value)
              }}

              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={submitReview}>
                    <SendIcon color="primary"/>
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Typography>



        <div >
            {movieReviewList.map((value)=>{return(
                    <div key={value.ID}>
                      <MovieReview movieID={movieId} 
                                  reviewID = {value.ID} 
                                  userID={value.userID} 
                                  movieReview={value.movieReview}
                                  date={value.date} 
                                  updated={value.updated}
                                  />
                    </div>
            )})}
        </div>
    
    </>

}

export default MovieReviewList; 