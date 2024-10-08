interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  theme: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  theme,
}: PaginationProps) {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 rounded-lg transition-all duration-300 ${
          theme === "light"
            ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Précédent
      </button>

      <span className="px-4 py-2 mx-1">
        Page {currentPage} sur {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 rounded-lg transition-all duration-300 ${
          theme === "light"
            ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Suivant
      </button>
    </div>
  );
}
