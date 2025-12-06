import { use } from "react";

async function fetchPost(id: string) {
const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "[http://localhost:3000](http://localhost:3000)";
const res = await fetch(`${baseUrl}/api/posts/${id}`, { cache: "no-store" });

if (!res.ok) {
throw new Error(`Error fetching post: ${res.status}`);
}

return res.json();
}

export default async function PostPage({ params }: any) {
const resolvedParams = await params;
const id = resolvedParams.id;

if (!id) return <div>ID inválido</div>;

let post;
try {
post = await fetchPost(id);
} catch (err) {
console.error(err);
return <div>Error cargando el post</div>;
}

return ( <main className="p-6 max-w-6xl mx-auto"> <h1 className="text-4xl font-bold mb-6">{post.title}</h1>


  <div className="flex flex-col lg:flex-row gap-6">
    {post.imageUrl && (
      <div className="lg:w-1/2 flex-shrink-0">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="rounded-xl shadow-lg w-full object-cover h-full"
        />
      </div>
    )}

    <div className="lg:w-1/2 flex flex-col justify-start text-gray-700 space-y-4">
      <p className="text-lg leading-relaxed">{post.content}</p>
    </div>
  </div>
</main>


);
}
