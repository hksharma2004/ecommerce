import React, { useEffect, useState } from "react";
import { assets, productsDummyData } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Determine the specific products to display based on the user requirement
    // Indices 0, 2, and 3 correspond to Apple AirPods Pro, Samsung Galaxy S23, and Garmin Venu 2
    const selectedProducts = [
      productsDummyData[0],
      productsDummyData[2],
      productsDummyData[3]
    ];
    setProducts(selectedProducts);
    setLoading(false);
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (products.length === 0) return <div className="text-center py-10">No featured products available</div>;

  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map((product) => (
          <div key={product._id} className="relative group">
            <Image
              src={product.image?.[0] || assets.product_list_icon}
              alt={product.name}
              width={400}
              height={300}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 right-8 p-4 bg-black/70 rounded-lg text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{product.name}</p>
              <p className="text-sm lg:text-base leading-5">
                ₹{product.offerPrice || product.price}
              </p>
              <Link
                href={`/product/${product._id}`}
                className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded hover:bg-orange-700 transition"
              >
                Buy now <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
