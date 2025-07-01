"use client";

import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation"; 

interface CategoryPopoverProps {
  categories: Category[];
}

function CategoryPopover({ categories }: CategoryPopoverProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();  

  const handleNavigation = (slug?: string) => {
    if (slug) {
      router.push(`/category/${slug}`);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button  className="bg-black text-white border border-gray-300 hover:bg-gray-100100">
          Categories
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <ul className="space-y-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id}>
                <button
                  className="block p-2 hover:bg-gray-100 rounded w-full text-left"
                  onClick={() => category.slug && handleNavigation(category.slug.current)}
                >
                  {category.title}
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500 p-2">No categories found.</p>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export default CategoryPopover;
