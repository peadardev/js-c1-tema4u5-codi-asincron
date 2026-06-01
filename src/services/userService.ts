export interface User {
  id: number;
  name: string;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch('http://api.ejemplo.com/users');

  if (!response.ok) {
    throw new Error('Error en obtenir la llista d usuaris');
  }

  return response.json();
}
