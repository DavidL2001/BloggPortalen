import type { Category } from "../../api/categories";

interface CategorySelectProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelect({
  categories,
  value,
  onChange,
}: CategorySelectProps) {
  return (
    <div>
      <label htmlFor="category">Kategorier</label>

      <select
        id="category"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      >
        <option value="">Välj en kategori</option>

        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}