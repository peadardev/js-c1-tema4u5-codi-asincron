import { describe, it, expect, vi } from 'vitest';
import { getUsers, type User } from '@/services/userService';

describe('userService.ts', () => {
  it('hauria de tornar la llista de usuaris quan la resposta és correcta', async () => {
    //arrange
    const usersMock: User = [
      { id: 1, name: 'usuari num 1' },
      { id: 2, name: 'usuari num 2' },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(usersMock),
      })
    );

    //act
    const resultat = await getUsers();

    //assert
    expect(resultat).toEqual(usersMock);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it('hauria de llençar una excepció quan la resposta del server falla', async () => {
    //arrange
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    //act & assert
    await expect(getUsers()).rejects.toThrow('Error en obtenir la llista d usuaris');
  });
});
