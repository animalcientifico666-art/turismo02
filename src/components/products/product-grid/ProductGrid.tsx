
import { Product } from "@/interfaces/product.interface"
import { ProductGridItem } from "./ProductGridItem";

interface Props{
    products:Product[];
}

export const ProductGrid=({products}:Props)=>{
    
    return(
        <div className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            gap-6
            ">
            
            {
                products.map(product=>(
                    <ProductGridItem
                        key={product.slug}
                        product={product}
                    
                    />
                ))
            }
        </div>
    )
}