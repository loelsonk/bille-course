import faker from 'faker';

export const users = [
    {
        id: 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
    },
    {
        id: 2,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
    },
    {
        id: 3,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
    },
]

export const posts = [
    {
        id: 1,
        title: faker.random.words(3),
        description: faker.lorem.sentences(1),
        content: faker.lorem.text(),
        date: faker.date.past(),
        authorId: 1,
    },
    {
        id: 2,
        title: faker.random.words(3),
        description: faker.lorem.sentences(1),
        content: faker.lorem.text(),
        date: faker.date.past(),
        authorId: 1,
    },
    {
        id: 3,
        title: faker.random.words(3),
        description: faker.lorem.sentences(1),
        content: faker.lorem.text(),
        date: faker.date.past(),
        authorId: 1,
    },
    {
        id: 4,
        title: faker.random.words(3),
        description: faker.lorem.sentences(1),
        content: faker.lorem.text(),
        date: faker.date.past(),
        authorId: 2,
    },
    {
        id: 5,
        title: faker.random.words(3),
        description: faker.lorem.sentences(1),
        content: faker.lorem.text(),
        date: faker.date.past(),
        authorId: 3,
    },
    {
        id: 6,
        title: faker.random.words(3),
        description: faker.lorem.sentences(1),
        content: faker.lorem.text(),
        date: faker.date.past(),
        authorId: 3,
    },
];

export const comments = [
    {
        id: 1,
        authorId: 1,
        postId: 1,
        content: faker.lorem.sentences(3),
        date: faker.date.past(),
    },
    {
        id: 2,
        authorId: 2,
        postId: 1,
        content: faker.lorem.sentences(3),
        date: faker.date.past(),
    },
    {
        id: 3,
        authorId: 3,
        postId: 1,
        content: faker.lorem.sentences(3),
        date: faker.date.past(),
    },
    {
        id: 4,
        authorId: 1,
        postId: 2,
        content: faker.lorem.sentences(3),
        date: faker.date.past(),
    },
    {
        id: 5,
        authorId: 2,
        postId: 2,
        content: faker.lorem.sentences(3),
        date: faker.date.past(),
    },
    {
        id: 6,
        authorId: 3,
        postId: 3,
        content: faker.lorem.sentences(3),
        date: faker.date.past(),
    },
    {
        id: 7,
        authorId: 3,
        postId: 4,
        content: faker.lorem.sentences(3),
        date: faker.date.past(),
    },
    {
        id: 8,
        authorId: 2,
        postId: 4,
        content: faker.lorem.sentences(3),
        date: faker.date.past(),
    },
];
