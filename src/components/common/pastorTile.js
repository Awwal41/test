import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function PastorTile({
  name,
  role,
  image,
  description,
  profilePath,
}) {
  return (
    <div className="group flex flex-col items-center text-center p-6 rounded-xl bg-white backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full justify-between">
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-4 overflow-hidden rounded-full">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => console.error(`Failed to load ${image}`)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-full" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#90651b] transition-colors duration-300">
          {name}
        </h3>
        <p className="text-lg text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
          {role}
        </p>
        <p className="text-sm text-gray-700 mt-2 mb-4 group-hover:text-gray-900 transition-colors duration-300">
          {description}
        </p>
      </div>
      <Link
        href={profilePath}
        className="inline-flex items-center text-[#90651b] hover:text-[#a67a2a] transition-colors group/link"
      >
        <span className="text-sm font-medium">Learn More</span>
        <ArrowRightIcon className="ml-1 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
