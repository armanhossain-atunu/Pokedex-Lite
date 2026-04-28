export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-center mb-4">
          About Pokédex App ⚡
        </h1>

        <p className="text-gray-600 text-center mb-6">
          A modern Pokémon explorer built with Next.js and the PokéAPI.
        </p>

        <div className="space-y-4 text-gray-700">
          <p>
            This application allows users to explore Pokémon with real-time
            search, filtering by type, pagination, and favorite system.
          </p>

          <p>
            It uses the <strong>PokéAPI</strong> to fetch data dynamically and
            demonstrates real-world frontend development practices.
          </p>

          <p>
            Features include:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Search Pokémon by name</li>
            <li>Filter by type (Fire, Water, Grass, etc.)</li>
            <li>Favorite system with localStorage</li>
            <li>Pagination system</li>
            <li>Loading skeleton UI</li>
          </ul>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Built with ❤️ using Next.js & Tailwind CSS
        </div>
      </div>
    </div>
  );
}