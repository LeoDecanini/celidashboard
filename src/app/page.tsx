"use client";
import { useState } from "react";
import { auth, app, firestore } from "../firebase/connect";
import { collection, addDoc } from "firebase/firestore";

type OpeningHours = {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
};

export default function Home() {
  const [formData, setFormData] = useState<{
    name: string;
    photoUrl: string;
    opening_hours: OpeningHours;
    address: string;
    urlLink: string;
    phoneNumber: string;
    country: string;
  }>({
    name: "",
    photoUrl: "",
    opening_hours: {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
    },
    address: "",
    urlLink: "",
    phoneNumber: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      name.startsWith("Monday") ||
      name.startsWith("Tuesday") ||
      name.startsWith("Wednesday") ||
      name.startsWith("Thursday") ||
      name.startsWith("Friday") ||
      name.startsWith("Saturday") ||
      name.startsWith("Sunday")
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        opening_hours: {
          ...prevFormData.opening_hours,
          [name]: value,
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
        name: "",
        photoUrl: "",
        opening_hours: {
          Monday: "",
          Tuesday: "",
          Wednesday: "",
          Thursday: "",
          Friday: "",
          Saturday: "",
          Sunday: "",
        },
        address: "",
        urlLink: "",
        phoneNumber: "",
        country: "",
      });
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit} className="max-w-lg w-full space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre del local"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="photoUrl"
          value={formData.photoUrl}
          onChange={handleChange}
          placeholder="URL de la foto"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Dirección"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="urlLink"
          value={formData.urlLink}
          onChange={handleChange}
          placeholder="Enlace URL"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Número de teléfono"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="País"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className="block">Horario de Apertura:</label>
        <input
          type="text"
          name="Monday"
          value={formData.opening_hours.Monday}
          onChange={handleChange}
          placeholder="Monday"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="Tuesday"
          value={formData.opening_hours.Tuesday}
          onChange={handleChange}
          placeholder="Tuesday"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="Wednesday"
          value={formData.opening_hours.Wednesday}
          onChange={handleChange}
          placeholder="Wednesday"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="Thursday"
          value={formData.opening_hours.Thursday}
          onChange={handleChange}
          placeholder="Thursday"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="Friday"
          value={formData.opening_hours.Friday}
          onChange={handleChange}
          placeholder="Friday"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="Saturday"
          value={formData.opening_hours.Saturday}
          onChange={handleChange}
          placeholder="Saturday"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="Sunday"
          value={formData.opening_hours.Sunday}
          onChange={handleChange}
          placeholder="Sunday"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
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
