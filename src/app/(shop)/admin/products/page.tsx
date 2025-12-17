export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const params = await searchParams;

  const page = parseInt(params?.page ?? "1", 10);

  const { products, totalPages } =
    await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Título
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Inventario
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                {/* Imagen */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      width={80}
                      height={80}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>

                {/* Título */}
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>

                {/* Precio */}
                <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>

                {/* Inventario */}
                <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <DeleteProductButton productId={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
