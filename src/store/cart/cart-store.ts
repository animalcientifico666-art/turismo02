
import type {CartProduct} from '@/interfaces';
import { Product } from '@prisma/client';
import {create} from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';

interface State{
    cart: CartProduct[];

    addProductTocart:(product:CartProduct)=>void;

    getTotalItems:()=>number;
    
    getSummaryInformation:()=>{
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart:number
    };

    updateProductQuantity:(product: CartProduct, quantity:number)=>void;

    removeProduct:(product: CartProduct)=>void;

}
export const useCartStore=create<State>()(

    persist(

        (set,get)=>({
        cart:[],

        getTotalItems:()=>{
            const{cart}=get();
            return cart.reduce((total, item)=>total+item.quantity,0);
        },

        getSummaryInformation:()=>{

            const{cart}=get();

            const subTotal = cart.reduce(
                (subTotal, product)=>product.quantity*product.price+subTotal,
                0
            );
            const tax=subTotal*0.15;    
            const total = subTotal+tax;
            const itemsInCart=cart.reduce((total,item)=>total+item.quantity,0);

            return{
                subTotal,tax,total,itemsInCart
            }


        },

        //metfods
        addProductTocart:(product: CartProduct)=>{

            const{cart} = get();

            //revisa si el producto existe en el carrito

            const productInCart = cart.some(
                (item)=>(item.id===product.id && item.size===product.size)
            );

            if(!productInCart){
                set({cart:[...cart,product]});
                return;
            }

            //se q el producto existe

            const updateCartProducts = cart.map((item)=>{

                if(item.id===product.id && item.size===product.size){
                    return{...item, quantity: item.quantity+product.quantity}
                }

                return item;
            });

            set({cart:updateCartProducts})

        },
        updateProductQuantity(product: CartProduct, quantity:number) {
            const{cart}=get();

            const updatedCartProducts=cart.map(item=>{
                if(item.id===product.id && item.size===product.size){
                    return{...item,quantity:quantity};
                }
                return item;
            });

            set({cart:updatedCartProducts});

        },
        removeProduct:(product:CartProduct)=>{
            const{cart}=get();
            const updateCartProducts=cart.filter(
                (item)=>item.id !== product.id || item.size !== product.size
            );
            set({cart:updateCartProducts});
        }
    })



        ,{
            name:'shopping-cart',
            storage: createJSONStorage(() => localStorage),
        }
    )

)