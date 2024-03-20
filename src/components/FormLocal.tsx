"use client";
import { useState } from "react";
import { auth, app, firestore } from "../firebase/connect";
import { collection, addDoc } from "firebase/firestore";

export default function FormLocal() {
  const [formData, setFormData] = useState<{
    lat: number;
    lng: number;
    name: string;
    photoUrl: string;
    opening_hours: { [day: string]: string[] };
    address: string;
    urlLink: string;
    phoneNumber: string;
    country: string;
    categories: string[];
    rating: number;
    vicinity: string;
    reviews: number;
  }>({
    lat: 0,
    lng: 0,
    name: "",
    photoUrl: "",
    opening_hours: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
    address: "",
    urlLink: "",
    phoneNumber: "",
    country: "",
    categories: [],
    rating: 0,
    vicinity: "",
    reviews: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "category") {
      if (checked) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          categories: [...prevFormData.categories, value],
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          categories: prevFormData.categories.filter(
            (category) => category !== value
          ),
        }));
      }
    } else if (
      name.startsWith("Monday") ||
      name.startsWith("Tuesday") ||
      name.startsWith("Wednesday") ||
      name.startsWith("Thursday") ||
      name.startsWith("Friday") ||
      name.startsWith("Saturday") ||
      name.startsWith("Sunday")
    ) {
      const day = name.split("_")[0];
      const index = parseInt(name.split("_")[1]) - 1;
      setFormData((prevFormData) => ({
        ...prevFormData,
        opening_hours: {
          ...prevFormData.opening_hours,
          [day]: [
            ...prevFormData.opening_hours[day].slice(0, index),
            value,
            ...prevFormData.opening_hours[day].slice(index + 1),
          ],
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "locales"), formData);
      console.log("Data added successfully!");
      setFormData({
        lat: 0,
        lng: 0,
        name: "",
        photoUrl: "",
        opening_hours: {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        },
        address: "",
        urlLink: "",
        phoneNumber: "",
        country: "",
        categories: [],
        rating: 0,
        vicinity: "",
        reviews: 0,
      });
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-5">
      <h2 className="pb-10">Formulario De Los locales</h2>
      <form onSubmit={handleSubmit} className="max-w-lg w-full space-y-4">
        <input
          type="number"
          name="lat"
          onChange={handleChange}
          placeholder="latitud"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          name="lng"
          onChange={handleChange}
          placeholder="longitud"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Nombre del local"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="photoUrl"
          onChange={handleChange}
          placeholder="URL de la foto"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="address"
          onChange={handleChange}
          placeholder="Dirección"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="urlLink"
          onChange={handleChange}
          placeholder="Enlace URL"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="tel"
          name="phoneNumber"
          onChange={handleChange}
          placeholder="Número de teléfono"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="country"
          onChange={handleChange}
          placeholder="País"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className="block">Horario de Apertura:</label>
        {[...Array(7)].map((_, index) => (
          <input
            key={index}
            type="text"
            name={`${Object.keys(formData.opening_hours)[index]}_${index + 1}`}
            onChange={handleChange}
            placeholder={`${
              Object.keys(formData.opening_hours)[index]
            } - Horario ${index + 1}`}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        ))}
        <input
          type="number"
          name="rating"
          onChange={handleChange}
          placeholder="Rating"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="vicinity"
          onChange={handleChange}
          placeholder="Vicinity"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          name="reviews"
          onChange={handleChange}
          placeholder="Reviews"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className="block">Categoría:</label>
        {[
          "restaurante",
          "cafe",
          "saludable",
          "tienda",
          "saludable",
        ].map((category, index) => (
          <label key={index} className="inline-block mr-4">
            <input
              type="checkbox"
              name="category"
              value={category}
              checked={formData.categories.includes(category)}
              onChange={handleChange}
              className="mr-2"
            />
            {category}
          </label>
        ))}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Agregar Local
        </button>
      </form>
    </main>
  );
}
