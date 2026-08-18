import type { Category } from "../../api/categories";

interface PostFiltersProps {
  search: string;
  category: string;
  sort: string;
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function PostFilters({
  search,
  category,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: PostFiltersProps) {
   return (
    <section className="post-filters" aria-label="Filtrera inlägg">
      <div className="post-filters__field post-filters__field--search">
        <label htmlFor="post-search">Sök efter ett inlägg</label>

        <input
          id="post-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Sök efter titel eller innehåll"
        />
      </div>

      <div className="post-filters__field">
        <label htmlFor="post-category">Kategori</label>

        <select
          id="post-category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="">Alla kategorier</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="post-filters__field">
        <label htmlFor="post-sort">Sortera</label>

        <select
          id="post-sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="">Nyast först</option>
          <option value="oldest">Äldst först</option>
        </select>
      </div>
    </section>
  );
}
