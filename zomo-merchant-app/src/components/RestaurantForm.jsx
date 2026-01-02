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
    <form onSubmit={submit} className="space-y-10">

      {/* ================= IMAGE ================= */}
      <Section title="Restaurant Image">
        <ImageUpload image={image} setImage={setImage} />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          This image will be shown to customers
        </p>
      </Section>

      {/* ================= BASIC INFO ================= */}
      <Section title="Basic Information">
        <Field label="Restaurant Name" required>
          <input
            className="input-zoomo"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </Field>

        <Field label="Description">
          <textarea
            className="input-zoomo resize-none"
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </Field>

        <Field label="Full Address" required>
          <textarea
            className="input-zoomo resize-none"
            rows={2}
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </Field>
      </Section>

      {/* ================= CONTACT ================= */}
      <Section title="Contact Details">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Phone Number">
            <input
              className="input-zoomo"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              className="input-zoomo"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </Field>
        </div>
      </Section>

      {/* ================= BUSINESS INFO ================= */}
      <Section title="Business Information">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Opening Hours">
            <input
              className="input-zoomo"
              placeholder="e.g. 10 AM – 11 PM"
              value={form.openingHours}
              onChange={(e) =>
                setForm({ ...form, openingHours: e.target.value })
              }
            />
          </Field>

          <Field label="Cuisine Type">
            <input
              className="input-zoomo"
              placeholder="e.g. Italian, Indian"
              value={form.cuisineType}
              onChange={(e) =>
                setForm({ ...form, cuisineType: e.target.value })
              }
            />
          </Field>
        </div>

        <Field label="Price Range">
          <select
            className="input-zoomo"
            value={form.priceRange}
            onChange={(e) =>
              setForm({ ...form, priceRange: e.target.value })
            }
          >
            <option value="">Select price range</option>
            <option value="$">$ (Budget)</option>
            <option value="$$">$$ (Mid-range)</option>
            <option value="$$$">$$$ (Premium)</option>
            <option value="$$$$">$$$$ (Luxury)</option>
          </select>
        </Field>
      </Section>

      {/* ================= STATUS ================= */}
      <Section title="Restaurant Status">
        <label
          className="
            flex items-center justify-between
            px-4 py-3 rounded-2xl
            bg-gray-100 dark:bg-[#1f1f1f]
          "
        >
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Restaurant is active
          </span>
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) =>
              setForm({ ...form, isActive: e.target.checked })
            }
            className="h-5 w-5 accent-emerald-600"
          />
        </label>
      </Section>

      {/* ================= SUBMIT ================= */}
      <div className="pt-2">
        <button
          type="submit"
          className="
            w-full py-3 rounded-2xl
            bg-emerald-600 hover:bg-emerald-700
            text-white font-semibold
            transition
          "
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, children }) {
  return (
    <div
      className="
        rounded-3xl
        bg-white/95 dark:bg-[#141414]
        border border-black/5 dark:border-white/10
        p-6
        space-y-4
      "
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, children, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
        {required && <span className="text-emerald-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
