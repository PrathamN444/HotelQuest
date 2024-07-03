import mongoose from "mongoose"

export const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "HotelQuest_database",
    })
    .then((c) => console.log(`database connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
}