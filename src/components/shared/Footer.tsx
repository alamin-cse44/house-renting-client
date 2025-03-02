import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center p-4 text-gray-600 border ">
      <nav className="flex space-x-6">
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/press">Press</Link>
        <Link href="/accessibility">Accessibility</Link>
        <Link href="/partners">Partners</Link>
      </nav>
      <div className="flex space-x-4 my-4">
        <Link href="https://facebook.com" target="_blank"><FaFacebook size={20} /></Link>
        <Link href="https://instagram.com" target="_blank"><FaInstagram size={20} /></Link>
        <Link href="https://twitter.com" target="_blank"><FaTwitter size={20} /></Link>
        <Link href="https://github.com" target="_blank"><FaGithub size={20} /></Link>
        <Link href="https://youtube.com" target="_blank"><FaYoutube size={20} /></Link>
      </div>
      <p className="text-sm">&copy; 2024 Your Company, Inc. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
