"use client";

import { Building, Users, Home, Briefcase, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const categories = [
  {
    name: "Family House",
    href: "familyHouse",
    icon: <Home className="w-6 h-6 text-blue-500" />,
  },
  {
    name: "Bachelor Mess",
    href: "bachelorMess",
    icon: <Users className="w-6 h-6 text-red-500" />,
  },
  {
    name: "Female Mess",
    href: "femaleMess",
    icon: <Building className="w-6 h-6 text-green-500" />,
  },
  {
    name: "Office",
    href: "office",
    icon: <Briefcase className="w-6 h-6 text-yellow-500" />,
  },
  {
    name: "Warehouse",
    href: "warehouse",
    icon: <Package className="w-6 h-6 text-purple-500" />,
  },
];

export default function HomeCategories() {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-4">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/available-listings?category=${category.href}`}
          >
            <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-xl hover:bg-gray-100 transition duration-200 cursor-pointer">
              {category.icon}
              <p className="mt-2 text-sm font-medium">{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
