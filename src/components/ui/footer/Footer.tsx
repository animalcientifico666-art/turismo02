import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm md:text-base px-4">
        
        {/* Logo y año */}
        <Link href='/' className="flex items-center mb-3 md:mb-0 hover:text-gray-900 dark:hover:text-white transition-colors">
          <span className={`${titleFont.className} antialiased font-bold text-lg md:text-xl`}>Turismo</span>
          <span className="ml-1">| shop</span>
          <span className="ml-2 text-gray-500 dark:text-gray-400">© {new Date().getFullYear()}</span>
        </Link>

        {/* Enlaces */}
        <div className="flex space-x-4 md:space-x-6">
          <Link href='/' className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Privacidad & Legal
          </Link>
          <Link href='/' className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Ubicaciones
          </Link>
        </div>

      </div>
    </footer>
  );
}
