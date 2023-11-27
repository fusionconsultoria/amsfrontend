import { api, requestConfig } from "../utils/config";

// Publish an user's note
const publishNote = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/notes", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get user notes
const getUserNotes = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/notes/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Delete a note
const deleteNote = async (id, token) => {
  const config = requestConfig("DELETE", "", token);

  try {
    const res = await fetch(api + "/notes/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get note
const getNote = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/notes/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const searchNotes = async (query) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/notes/search?q=" + query, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get all notes
const getNotes = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/notes", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Update a note
const updateNote = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/notes/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};


const noteService = {
  publishNote,
  getUserNotes,
  deleteNote,
  getNote,
  searchNotes,
  getNotes,
  updateNote
};

export default noteService;