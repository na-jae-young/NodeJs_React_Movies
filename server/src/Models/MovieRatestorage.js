
const moment = require('moment');
const db = require("../config/db");

class MovieRatestorage{
    static async read(column , where, value){

        return new Promise(async (resolve, reject) =>{
            const sqlselect = `select ${column} from movie_rate ${where} `
            await db.query(sqlselect ,value,(err, result) =>{
                if(err){
                    console.log(err)
                    reject(`${err}`)
                }else{
                    resolve({success:true , message:'success',data:result})
                }
            })
        })
    }

    // static async GetRate(column,where){
    //     return new Promise(async(resolve,reject) => {
    //         const sqlselect = `select ${column} from movie_rate ${where}` 
    //         await db.query(sqlselect, (err, result) => {  
    //             if(err) {reject(`${err}`) }
    //             else{
    //                 resolve ({success: true,message: 'success', data: result})
    //             }
    //         })
    //     })
    // }

    static async create(body){
        const userID = body.userID
        const movieID = body.movieID
        const rate = body.rate
        const date =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        return new Promise( async (resolve, reject) => {
            const sql = "INSERT INTO movie_rate(userID,movieID,rate,date) values (?,?,?,?);"
            await db.query(sql,[userID,movieID,rate,date],(err,result) =>{
                if(err) {reject(`${err}`) }
                else{
                    resolve ({success: true,message: 'success', data: result})
                }
            })
        })
    }

    static async update(body){
        const userID = body.userID
        const movieID = body.movieID
        const rate = body.rate
        const date =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        return new Promise( async (resolve, reject) => {
            const sql = "update movie_rate set rate = ? , date = ? where userID = ? and movieID = ?"
            await db.query(sql,[rate,date,userID,movieID],(err, result)=>{
                if(err){reject(`${err}`)}
                else{
                    resolve({success: true,message: 'success', data: result})
                }
            })
        })
    }

    static async delete(body){
        const userID = body.userID
        const movieID = body.movieID
        const sqlDelete = `delete from movie_rate where userID = ? AND movieID = ? `

        return new Promise((resolve, reject) => {
                db.query(sqlDelete,[userID,movieID], (err, result)  => {
                    if(err){ reject(`${err}`)}
                    else{ resolve({success: true, message  : 'delete success'})}

                })
            })
    }

    // static async confirm(column,where){
    //     return new Promise(async(resolve,reject) => {
    //         const sqlselect = `select ${column} from movie_rate ${where}` 
    //         await db.query(sqlselect, (err, result) => {  
    //             if(err) {
    //                 console.log(err)
    //                 reject(`${err}`) }
    //             else{
    //                 resolve ({success: true,message: 'success', data: result})
    //             }
    //         })
    //     })
    // }




}

module.exports = MovieRatestorage