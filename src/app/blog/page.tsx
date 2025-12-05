import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

export default async function BlogPage() {
  const res = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Error fetching posts:", res.status);
    return <div className="text-red-600 font-semibold">Error cargando posts</div>;
  }

  const posts = await res.json();

  return (
    <main className="p-6 space-y-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">Noticias</h1>
        <Link
          href="/blog/new"
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Nuevo Post
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition hover:-translate-y-1 duration-200 overflow-hidden"
          >
            {post.imageUrl && (
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-600 line-clamp-3">
                {post.content}
              </p>
              <span className="mt-3 inline-block text-sm text-gray-500">
                Leer más &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
