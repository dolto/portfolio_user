import {MongoClient} from "mongodb";
const url = process.env.MongoDB_URI as string;
const options = {useNewUrlParser:true}
let connectDB:Promise<MongoClient>;

if(process.env.NODE_ENV === 'development'){
    // @ts-ignore
    let mongo:Promise<MongoClient> = global._mongo;
    if(!mongo){
        mongo = new MongoClient(url).connect();
    }
    connectDB = mongo;
} else {
    connectDB = new MongoClient(url).connect();
}
export {connectDB}