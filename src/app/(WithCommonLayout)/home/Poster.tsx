"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import { listingCategory } from "@/types/object";


export default function Poster() {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative w-full h-[350px] flex items-end">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/poster.avif')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div> {/* Dark Overlay */}
      </div>

      {/* Search Section */}
      <div className="relative z-10 w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Search Your Next Home</h2>

        {/* Category & Search */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Select onValueChange={(value) => setCategory(value === "all" ? "" : value)}>
            <SelectTrigger className="w-full md:w-60">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {listingCategory.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search by family, bachelor, office, warehouse"
            className="w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* View Button */}
          <Link href={`/available-listings?category=${category}&search=${searchTerm}`}>
            <Button className="w-full md:w-24">Search</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
