export interface Cart {
  id: string;
}

export const newCart = (): Cart => ({
  id: crypto.randomUUID(),
});
