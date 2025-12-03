import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const { name, email, role, image } = session.user;

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <Title title="Perfil" />

      {/* Card principal */}
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-lg mt-6 border border-gray-200">
        
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={image || "/default-avatar.png"}
            alt="Avatar"
            className="w-28 h-28 rounded-full shadow-md mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600">{email}</p>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Rol</h3>
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium shadow">
            {role}
          </span>
        </div>

      </div>
    </div>
  );
}
