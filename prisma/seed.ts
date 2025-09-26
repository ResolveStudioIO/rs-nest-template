import { PrismaClient } from 'generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            email: 'admin@example.com',
            name: 'Admin',
        },
    });

    const users = Array.from({ length: 10 }).map(() => ({
        email: faker.internet.email(),
        name: faker.person.fullName(),
    }));

    await prisma.user.createMany({ data: users });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
