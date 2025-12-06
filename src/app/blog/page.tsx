import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "[http://localhost:3000](http://localhost:3000)";

export default async function BlogPage() {
const res = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });

if (!res.ok) {
console.error("Error fetching posts:", res.status);
return <div className="text-red-600 font-semibold">Error cargando posts</div>;
}

const posts = await res.json();

return ( <main className="p-6 max-w-7xl mx-auto space-y-6">
{/* Header */} <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"> <h1 className="text-4xl font-extrabold text-gray-900">Noticias</h1> <Link
       href="/components/post/PostForm"
       className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
     >
Nuevo Post </Link> </header>


  {/* Grid de posts */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {posts.map((post: any) => (
      <Link
        key={post.id}
        href={`/blog/${post.id}`}
        className="group block bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300 overflow-hidden"
      >
        {/* Imagen */}
        {post.imageUrl && (
          <div className="h-48 w-full overflow-hidden rounded-t-xl">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Contenido */}
        <div className="p-5 flex flex-col h-full justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
              {post.title}
            </h2>
            <p className="mt-2 text-gray-600 line-clamp-3">{post.content}</p>
          </div>

          <span className="mt-4 inline-block text-sm font-medium text-green-600 group-hover:text-green-700 transition-colors duration-300">
            Leer más &rarr;
          </span>
        </div>
      </Link>
    ))}
  </div>
</main>


);
}
