export const avatars = Array.from({ length: 20 }).map((v, index) => ({
   id: index + 1,
   src: `/img/avatars/${index + 1}.jpg`,
}));
