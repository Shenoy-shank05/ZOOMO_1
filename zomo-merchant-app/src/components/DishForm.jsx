import { useState } from "react";

export default function DishForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    imageUrl: initialData.imageUrl || "",
    ingredients: initialData.ingredients || "",
    calories: initialData.calories || "",
    preparationTime: initialData.preparationTime || "",
    isVegetarian: initialData.isVegetarian || false,
    isVegan: initialData.isVegan || false,
    isGlutenFree: initialData.isGlutenFree || false,
    isAvailable:
      initialData.isAvailable !== undefined
        ? initialData.isAvailable
        : true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4"
    >
      {/* NAME */}
      <div>
        <label className="block font-medium mb-1">
          Dish Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block font-medium mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />
      </div>

      {/* PRICE */}
      <div>
        <label className="block font-medium mb-1">
          Price (₹)
        </label>
        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* IMAGE URL */}
      <div>
        <label className="block font-medium mb-1">
          Image Path (from public/)
        </label>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="/chicken-tandoori-pizza.jpg"
        />

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="w-40 mt-2 rounded"
            onError={(e) =>
              (e.target.style.display = "none")
            }
          />
        )}
      </div>

      {/* INGREDIENTS */}
      <div>
        <label className="block font-medium mb-1">
          Ingredients
        </label>
        <input
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* CALORIES */}
      <div>
        <label className="block font-medium mb-1">
          Calories
        </label>
        <input
          name="calories"
          type="number"
          value={form.calories}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* PREP TIME */}
      <div>
        <label className="block font-medium mb-1">
          Preparation Time (minutes)
        </label>
        <input
          name="preparationTime"
          type="number"
          value={form.preparationTime}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* CHECKBOXES */}
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVegetarian"
            checked={form.isVegetarian}
            onChange={handleChange}
          />
          Vegetarian
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVegan"
            checked={form.isVegan}
            onChange={handleChange}
          />
          Vegan
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isGlutenFree"
            checked={form.isGlutenFree}
            onChange={handleChange}
          />
          Gluten Free
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAvailable"
            checked={form.isAvailable}
            onChange={handleChange}
          />
          Available
        </label>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded font-semibold"
      >
        Save Dish
      </button>
    </form>
  );
}
