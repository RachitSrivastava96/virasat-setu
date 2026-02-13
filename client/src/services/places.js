// src/services/places.js
// Service for fetching places, artisans, and city data

import { API_URL } from "./auth";

export const placesService = {
  /**
   * Get complete city data (matches backend /api/places/city/:cityName)
   */
  getCityData: async (cityName) => {
    try {
      const response = await fetch(
        `${API_URL}/api/places/city/${encodeURIComponent(cityName)}`,
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching city data:", error);
      throw error;
    }
  },

  /**
   * Search for places in a city by category
   * @param {string} city - City name
   * @param {string} category - Category (monument, restaurant, etc.)
   * @returns {Promise<Object>} Places data
   */
  searchPlaces: async (city, category = "attraction") => {
    try {
      const response = await fetch(
        `${API_URL}/api/places/search?city=${encodeURIComponent(
          city
        )}&category=${category}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  },

  /**
   * Get artisans in a city
   * @param {string} city - City name
   * @param {string} specialty - Optional specialty filter
   * @returns {Promise<Object>} Artisans data
   */
  getArtisans: async (city, specialty = null) => {
    try {
      let url = `${API_URL}/api/places/artisans/${encodeURIComponent(city)}`;
      if (specialty) {
        url += `?specialty=${encodeURIComponent(specialty)}`;
      }

      const response = await fetch(url, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch artisans");
      }

      return await response.json();
    } catch (error) {
      console.error("Artisans error:", error);
      throw error;
    }
  },

  /**
   * Add a new artisan (requires authentication)
   * @param {Object} artisanData - Artisan information
   * @returns {Promise<Object>} Created artisan
   */
  addArtisan: async (artisanData) => {
    try {
      const response = await fetch(`${API_URL}/api/places/artisan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(artisanData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add artisan");
      }

      return data;
    } catch (error) {
      console.error("Add artisan error:", error);
      throw error;
    }
  },

  /**
   * Get hot/popular cities
   * @returns {Promise<Object>} Hot cities data
   */
  getHotCities: async () => {
    try {
      const response = await fetch(`${API_URL}/api/places/hot-cities`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch hot cities");
      }

      return await response.json();
    } catch (error) {
      console.error("Hot cities error:", error);
      throw error;
    }
  },
};