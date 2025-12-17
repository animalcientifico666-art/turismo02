import Image from "next/image";
import Link from "next/link";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPinterest,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-[#4a463b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10">


        {/* LOGO + DESCRIPCIÓN */}
        <div className="space-y-1 ">
          <Image
            src="/logo-footer.png"
            alt="Pakary Travel Perú"
            width={220}
            height={120}
          />
          <p className="text-sm text-gray-200">
            Agencia Oficial de Huancaya, especializada en turismo vivencial,
            naturaleza y experiencias únicas en Perú.
          </p>
        </div>

       

        {/* LINKS */}
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">Más información</h3>

          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Testimonios</Link></li>
            <li><Link href="#">Contáctanos</Link></li>
            <li><Link href="#">Términos y condiciones</Link></li>
            <li><Link href="#">Política de privacidad</Link></li>
            <li><Link href="#">Sitemap</Link></li>
          </ul>
        </div>

        {/* CONTACTO */}
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">Ubícanos</h3>

          <p className="flex items-center gap-2 text-sm">
            <FaPhoneAlt /> (01) 562-0000
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaWhatsapp /> 999-121710
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaEnvelope /> correo@.com
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaMapMarkerAlt />
            Calle Nro.000– Huancayo<br />
            Huancayo – Huancayo
          </p>

          <p className="text-sm mt-2">
            <strong>Horario:</strong><br />
            L – S<br />
            8:00 AM a 5:00 PM
          </p>

          {/* REDES */}
          <div className="flex gap-4 mt-4">
            <FaPinterest className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
            <FaTwitter className="cursor-pointer" />
            <FaYoutube className="cursor-pointer" />
            <FaFacebookF className="cursor-pointer" />
          </div>
        </div>

      </div>

      {/* BARRA INFERIOR */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()}Todos los derechos reservados
      </div>
    </footer>
  );
};
