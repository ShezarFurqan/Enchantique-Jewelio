import mongoose from "mongoose";

const connectDB = async ()=>{

    mongoose.connection.on('connected',() => {
        console.log("DB Connected");
        
    })

    await mongoose.connect(`mongodb+srv://webweavers883:headphone@cluster0.nu8mo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/e-commerce`)
}

export default connectDB