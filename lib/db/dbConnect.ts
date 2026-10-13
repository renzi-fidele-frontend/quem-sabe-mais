import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
   conn: typeof mongoose | null;
   promise: Promise<typeof mongoose> | null;
}

declare global {
   var mongoose: MongooseCache;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

/** Conecta ao banco de dados do MongoDB */
export async function dbConnect() {
   if (!MONGODB_URI) {
      throw new Error("MongoDB URI não encontrado!");
   }

   if (cached.conn) {
      console.log("Você já está conectado ao banco de dados cacheado!");
      return cached.conn;
   }

   if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => {
         console.log("Conectado ao banco de dados pela primeira vez com sucesso!");
         return mongoose;
      });
   }

   cached.conn = await cached.promise;

   return cached.conn;
}
