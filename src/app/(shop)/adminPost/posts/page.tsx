    export const revalidate = 0;

    import { getPaginatedPosts } from "@/actions";
    import { Pagination, Title } from "@/components";
    import Link from "next/link";

    interface Props {
    searchParams: {
        page?: string;
    };
    }

    // Función para generar un resumen del contenido
    const getExcerpt = (content: string, length = 100) => {
    if (content.length <= length) return content;
    return content.slice(0, length) + "...";
    };

    export default async function BlogPostsPage({ searchParams }: Props) {
    const params = await searchParams;
    let page = parseInt(params?.page ?? "1", 10);

    const { posts, totalPages } = await getPaginatedPosts({ page });

    return (
        <>
        <Title title="Blog" />

        <div className="flex justify-end mb-5">
            <Link href="/adminPost/post/new" className="btn-primary">
            Nuevo post
            </Link>
        </div>

        <div className="mb-10 overflow-x-auto">
            <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
                <tr>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Imagen</th>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Título</th>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Fecha</th>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Resumen</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                <tr key={post.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {post.imageUrl ? (
                        <Link href={`/adminPost/post/${post.id}`} className="hover:underline">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-20 h-20 object-cover rounded"
                        />
                        </Link>
                    ) : (
                        <div className="w-20 h-20 bg-gray-300 rounded flex items-center justify-center text-gray-500">
                        No Image
                        </div>
                    )}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/adminPost/post/${post.id}`} className="hover:underline">
                        {post.title}
                    </Link>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {getExcerpt(post.content, 80)}
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
