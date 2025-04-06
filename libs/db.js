import mongoose from 'mongoose';

const DBconn = async ()=>{
  try {
    const connectionInstance = mongoose.connect(process.env.MONGODB_URL)
    console.log(`Mongodb is connected ${(await connectionInstance).connection.host}`)
  } catch (error) {
    console.log('mongodb connection error',error)
  }
}

export default DBconn