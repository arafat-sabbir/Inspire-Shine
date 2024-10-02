import { useRef, FormEvent, useState } from "react";
import ProductCardSkeleton from "@/components/skeletonLoader/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "@/layout/Container/Container";
import {  Search } from "lucide-react";
import NotFound from "@/components/NotFound";
import useServices from "@/hooks/useServices";
import { TService } from "@/types/services";
import ServiceCard from "@/components/ServiceCard";


const Services = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sort, setSort] = useState("asc");
  const [pageSize] = useState(10);
  const categories = ["Basic Wash", "Interior Detailing", "Exterior Shine", "Engine Cleaning", "Headlight Restoration","Full Service"];
  const [searchTerm, setSearchTerm] = useState("");

  // Ref to clear the input value
  const searchInputRef = useRef<HTMLInputElement>(null);

  const query = {
    searchTerm,
    page: currentPage,
    categories: selectedCategories,
    sort,
  };

  const { data, isLoading, isError } = useServices(query)
  const totalPages = Math.ceil(data?.totalProduct / pageSize);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(
      (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value
    );
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category]
    );
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const resetQuery = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    setSort("asc");

    // Clear the search input value
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  if (isError) {
    return (
      <div className="text-center text-red-500">Error loading products</div>
    );
  }
console.log(data);
  return (
    <Container className="py-10 min-h-[65vh]">
      {/* Category Filters */}
      <form
        onSubmit={handleSearch}
        className="flex border-2 border-gray-300 rounded-full  mb-6 lg:w-2/3 w-11/12 mx-auto"
      >
        <Input
          type="text"
          placeholder="Search"
          name="title"
          ref={searchInputRef}
          className="rounded-full border-0"
        />
        <Select onValueChange={(value) => setSort(value)}>
          <SelectTrigger className="lg:w-[250px] border-r-2 w-[100px] bg-white dark:bg-black outline-none">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="desc">High To Low</SelectItem>
              <SelectItem value="asc">Low To High</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <button type="submit" className="bg-white dark:bg-black px-6">
          <Search />
        </button>
        <button
          className="bg-red-500/90 text-white px-6 rounded-full rounded-l-none"
          type="button"
          onClick={resetQuery}
        >
          Reset
        </button>
      </form>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((name) => (
          <div
            key={name}
            className={`py-1 px-4 rounded-full cursor-pointer transition duration-300 ${
              selectedCategories.includes(name)
                ? "bg-red-500 text-white"
                : "bg-gray-300/60 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleCategoryClick(name)}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </div>
        ))}
      </div>
      {isLoading && (
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden 2xl:grid-cols-4 gap-10 py-10 justify-center items-center justify-items-center ">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </Container>
      )}
      {!isLoading && !data?.length && (
       <NotFound title="No Products Found"/>
      )}
      {/* Products Grid */}
      {data?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center items-center justify-items-center ">
          {data?.map((product: TService) => (
            <ServiceCard key={product._id} item={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-6 items-center py-8">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </Button>
        <span className="text-gray-700">{currentPage}</span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Services;
