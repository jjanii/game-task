import { Game } from "@/types/types";

export const loginUser = async (username: string, password: string) => {
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // To include cookies in the request
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json(); // Assuming the server sends a JSON response
};

export const fetchGames = async (): Promise<Game[]> => {
  const response = await fetch("http://localhost:4000/games", {
    credentials: "include", // to include cookies for session-based authentication
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Failed to fetch games");
    }
  }
  const data = await response.json();
  return data;
};

export const logoutUser = async () => {
  const response = await fetch("http://localhost:4000/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // To include cookies in the request
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }

  return response.json(); // Assuming the server sends a JSON response
};
