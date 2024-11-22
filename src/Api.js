import axios from "axios";

const API_URL = "https://67281988270bd0b975545c66.mockapi.io/api/v1/students";


export async function getStudents() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error.response?.data?.message || error.message);
    throw error;
  }
}


export async function getStudent(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with ID ${id}:`, error.response?.data?.message || error.message);
    throw error;
  }
}


export async function createStudent(data) {
  try {
    if (!data.favorite_food) {
      throw new Error("Favorite food is required.");
    }

    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error.response?.data?.message || error.message);
    throw error;
  }
}


export async function updateStudent(id, data) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating student with ID ${id}:`, error.response?.data?.message || error.message);
    throw error;
  }
}


export async function deleteStudent(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting student with ID ${id}:`, error.response?.data?.message || error.message);
    throw error;
  }
}
