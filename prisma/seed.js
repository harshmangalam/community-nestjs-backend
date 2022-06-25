const { PrismaClient, prisma } = require('@prisma/client');
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    // getTags().map((tag) => {
    //   return db.tag.create({ data: tag });
    // }),

    getArticles().map((article) => {
      return db.article.create({
        data: {
          title: article.title,
          content: article.content,
          readTime: article.readTime,
          authorId: article.authorId,
          coverImage: article.coverImage,
          tags: {
            connect: {
              id: article.tags[0],
            },
          },
        },
      });
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

function getArticles() {
  return [
    {
      title: 'Introduction to Dynamic Memory Allocation',
      tags: [
        '48a8a89b-65f4-4c58-ab7d-48ffb2435c7a',
        'ff61eb33-1be2-4b6d-9f69-f9ab0a46fd15',
      ],
      authorId: '48546eb9-cda6-421d-81ab-969bc14e5921',
      readTime: '12 min',
      coverImage:
        'https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1656053965815%2FfSqctHSnz.png%3Fw%3D1600%26h%3D840%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=1920&q=75',
      content: `The blog is a detailed introduction to Dynamic memory allocation; starting with pointers, it works its way up to the nub of memory handling. The blog carefully explains the working of pointers, arrays, and their applications
      Pointer Introduction
      A pointer is a variable used to store the address of another variable. Pointers, like other variables, are allocated memory in the memory stack.
      The syntax for declaring a pointer of a specific data type is as simple as,A statement of this syntax declares a pointer of <data_type> with the name,<pointer_name>.
      As said before, the value stored in a pointer is the memory address of another variable. Before starting with a simple code, let's visualize a pointer,
      
      `,
    },
    {
      title: 'Introduction to Dynamic Memory Allocation',
      tags: [
        '48a8a89b-65f4-4c58-ab7d-48ffb2435c7a',
        '8902d0c0-62e9-4a84-b767-041ab9df5628',
      ],
      authorId: 'a046f06c-ff12-404a-8c3a-4eea75cfebe5',
      readTime: '12 min',
      coverImage:
        'https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1656011136499%2FhSCGKBq7-.png%3Fw%3D1600%26h%3D840%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=1920&q=75',
      content: `After sharing 50 websites for remote work I decided to share another list for design inspiration.
      here are +30 websites. my advice tries them all and makes five that work for you your favorite. If you find it useful don't forget to leave a comment or share it with the community 🚀
      A pointer is a variable used to store the address of another variable. Pointers, like other variables, are allocated memory in the memory stack.
      The syntax for declaring a pointer of a specific data type is as simple as,A statement of this syntax declares a pointer of <data_type> with the name,<pointer_name>.
      As said before, the value stored in a pointer is the memory address of another variable. Before starting with a simple code, let's visualize a pointer,
      
      `,
    },
    {
      title: 'Introduction to Dynamic Memory Allocation',
      tags: [
        'ff61eb33-1be2-4b6d-9f69-f9ab0a46fd15',
        'c16295f0-d0af-46fc-9323-76f03c5352c1',
      ],
      authorId: '48546eb9-cda6-421d-81ab-969bc14e5921',
      readTime: '2 min',
      coverImage:
        'https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1656011136499%2FhSCGKBq7-.png%3Fw%3D1600%26h%3D840%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=1920&q=75',
      content: `After sharing 50 websites for remote work I decided to share another list for design inspiration.
      here are +30 websites. my advice tries them all and makes five that work for you your favorite. If you find it useful don't forget to leave a comment or share it with the community 🚀
      A pointer is a variable used to store the address of another variable. Pointers, like other variables, are allocated memory in the memory stack.
      The syntax for declaring a pointer of a specific data type is as simple as,A statement of this syntax declares a pointer of <data_type> with the name,<pointer_name>.
      As said before, the value stored in a pointer is the memory address of another variable. Before starting with a simple code, let's visualize a pointer,
      
      `,
    },
  ];
}
