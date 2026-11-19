"use server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function remover_imagem(public_id: string) {
   await cloudinary.uploader.destroy(public_id);
}

export async function carregar_imagem(file: File): Promise<UploadApiResponse> {
   const buffer = Buffer.from(await file.arrayBuffer());
   return new Promise((resolve, reject) => {
      cloudinary.uploader
         .upload_stream(
            {
               folder: "Quem Sabe Mais",
            },
            (error, result) => {
               if (error) reject(error);
               else resolve(result as UploadApiResponse);
            },
         )
         .end(buffer);
   });
}
