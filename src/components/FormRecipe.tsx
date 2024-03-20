"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase/connect";

type FormField = "nombre" | "tiempoCoccion" | "personas" | "imagen" | "raciones" | "ingredientes" | "pasos" | "categories";

export default function FormRecipe() {
  const [formData, setFormData] = useState({
    nombre: "",
    tiempoCoccion: "",
    personas: 0,
    imagen: "",
    raciones: "",
    ingredientes: [""],
    pasos: [""],
    categories: [""],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddField = (fieldName: "ingredientes" | "pasos") => {
    setFormData((prevState) => {
      if (fieldName === "ingredientes") {
        return {
          ...prevState,
          ingredientes: [...prevState.ingredientes, ""],
        };
      }
      if (fieldName === "pasos") {
        return {
          ...prevState,
          pasos: [...prevState.pasos, ""],
        };
      }
      return prevState;
    });
  };
  
  const handleRemoveField = (fieldName: "ingredientes" | "pasos", index: number) => {
    setFormData((prevState) => {
      if (fieldName === "ingredientes") {
        return {
          ...prevState,
          ingredientes: prevState.ingredientes.filter((_, i) => i !== index),
        };
      }
      if (fieldName === "pasos") {
        return {
          ...prevState,
          pasos: prevState.pasos.filter((_, i) => i !== index),
        };
      }
      return prevState;
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "recetas"), formData);
      console.log("Recipe added successfully!");
      setFormData({
        nombre: "",
        tiempoCoccion: "",
        personas: 0,
        imagen: "",
        raciones: "",
        ingredientes: [""],
        pasos: [""],
        categories: [""],
      });
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-5">
      <h2 className="pb-10">Formulario De Recetas</h2>
      <form onSubmit={handleSubmit} className="max-w-lg w-full space-y-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre de la receta"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="tiempoCoccion"
          value={formData.tiempoCoccion}
          onChange={handleChange}
          placeholder="Tiempo de cocción"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          name="personas"
          value={formData.personas}
          onChange={handleChange}
          placeholder="Número de personas"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          placeholder="URL de la imagen"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="raciones"
          value={formData.raciones}
          onChange={handleChange}
          placeholder="Raciones"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className="block">Categoría:</label>
        {["desayuno", "cena", "almuerzo", "merienda"].map((category, index) => (
          <label key={index} className="inline-block mr-4">
            <input
              type="checkbox"
              name="categories"
              value={category}
              checked={formData.categories.includes(category)}
              onChange={handleChange}
              className="mr-2"
            />
            {category}
          </label>
        ))}
        <div className="mb-4">
          <label className="block">Ingredientes:</label>
          {formData.ingredientes.map((ingrediente, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={ingrediente}
                onChange={(e) => {
                  const newIngredientes = [...formData.ingredientes];
                  newIngredientes[index] = e.target.value;
                  setFormData((prevState) => ({
                    ...prevState,
                    ingredientes: newIngredientes,
                  }));
                }}
                placeholder={`Ingrediente ${index + 1}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveField("ingredientes", index)}
                className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("ingredientes")}
            className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Agregar Ingrediente
          </button>
        </div>
        {/* Campo de Pasos */}
        <div className="mb-4">
          <label className="block">Pasos:</label>
          {formData.pasos.map((paso, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={paso}
                onChange={(e) => {
                  const newPasos = [...formData.pasos];
                  newPasos[index] = e.target.value;
                  setFormData((prevState) => ({
                    ...prevState,
                    pasos: newPasos,
                  }));
                }}
                placeholder={`Paso ${index + 1}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveField("pasos", index)}
                className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("pasos")}
            className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Agregar Paso
          </button>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Agregar Receta
        </button>
      </form>
    </main>
  );
}
