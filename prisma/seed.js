const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getTags().map((tag) => {
      return db.tag.create({ data: tag });
    }),
  );
}

seed();

function getTags() {
  return [
    {
      name: 'Javascript',
      coverImage:
        'https://www.brcline.com/wp-content/uploads/2020/06/javascript-logo.png',
    },
    {
      name: 'React',
      coverImage:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    },
    {
      name: 'Svelte',
      coverImage:
        'https://pbs.twimg.com/profile_images/1121395911849062400/7exmJEg4_400x400.png',
    },
    {
      name: 'SolidJs',
      coverImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOeQnOP8xxw7MwZMvUDCiDKyLX7j_KcYmQfH7ZM9KjoTAgw4J2uatzwzYWiZudQZ8MOA&usqp=CAU',
    },
  ];
}
