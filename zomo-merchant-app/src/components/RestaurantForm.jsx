import React from "react";
import ImageUpload from "./ImageUpload";

export default function RestaurantForm({ restaurant, onSubmit }) {
  const [form, setForm] = React.useState(
    restaurant || {
      name: "",
      description: "",
      address: "",
      phone: "",
      email: "",
      openingHours: "",
      cuisineType: "",
      priceRange: "",
      isActive: true,
    }
  );

  const [image, setImage] = React.useState(
    restaurant?.imageUrl
      ? { preview: restaurant.imageUrl }
      : null
  );

  const submit = (e) => {
    e.preventDefault();

    if (!form.name || !form.address) {
      alert("Restaurant name and address are required");
      return;
    }

    onSubmit({
      ...form,
      image,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Image */}
      <ImageUpload image={image} setImage={setImage} />

      <input
        placeholder="Restaurant Name"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <textarea
        placeholder="Full Address"
        className="w-full border p-2 rounded"
        value={form.address}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="Phone"
          className="border p-2 rounded"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
      </div>

      <input
        placeholder="Opening Hours (e.g. 10 AM - 11 PM)"
        className="w-full border p-2 rounded"
        value={form.openingHours}
        onChange={(e) =>
          setForm({ ...form, openingHours: e.target.value })
        }
      />

      <input
        placeholder="Cuisine Type (e.g. Italian)"
        className="w-full border p-2 rounded"
        value={form.cuisineType}
        onChange={(e) =>
          setForm({ ...form, cuisineType: e.target.value })
        }
      />

      <select
        className="w-full border p-2 rounded"
        value={form.priceRange}
        onChange={(e) =>
          setForm({ ...form, priceRange: e.target.value })
        }
      >
        <option value="">Price Range</option>
        <option value="$">$</option>
        <option value="$$">$$</option>
        <option value="$$$">$$$</option>
        <option value="$$$$">$$$$</option>
      </select>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) =>
            setForm({ ...form, isActive: e.target.checked })
          }
        />
        Restaurant is active
      </label>

      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Save Changes
      </button>
    </form>
  );
}
