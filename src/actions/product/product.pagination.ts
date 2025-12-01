'use server';

import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions{
        page?: number;
        take?: number;
        gender?:Gender;
    }

export const getPaginatedProductsWithImages=async({
    page=1,
    take=4,
    gender
}:PaginationOptions)=>{

    if(isNaN(Number(page))) page=1;
    if(page<1) page = 1;
    

    try{
         console.log("PAGE:", page, "TAKE:", take, "SKIP:", (page - 1) * take);
        const products = await prisma.product.findMany({

            
            take: take,
            skip:(page-1)*take,
            
            include:{
                ProductImage:{
                    take:2,
                    
                    select:{
                        url:true
                    }
                }
            },

            where:{
               gender:gender
            }
        })
        console.log(products);

        //Obtener numero de paginas
        const totalCount=await prisma.product.count({})
        const totalPages=Math.ceil(totalCount/take);


        return {
        currentPage: page,
        totalPages: totalPages,
        products: products.map((product: any) => ({
                    ...product,
                    images: (product.ProductImage || []).map((image: any) => image.url)
                        }))
        };



    }catch(error){
        console.log('Error:', error);

    //  retorna algo válido siempre
    return {
      currentPage: 1,
      totalPages: 1,
      products: []
    };
    }
}