"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/product/search?q=${encodeURIComponent(query || "")}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {products.length === 0 ? (
        <p>No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchPage;
