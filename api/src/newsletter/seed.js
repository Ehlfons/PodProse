// seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const templates = [
    {
      subject: 'Your Daily Update from PodProse',
      body: '<p>Here is your daily update from PodProse!</p>',
    },
    {
      subject: 'Latest News from PodProse',
      body: '<p>Check out the latest news from PodProse!</p>',
    },
    {
      subject: 'New Features on PodProse',
      body: '<p>Discover the new features on PodProse!</p>',
    },
  ];

  for (const template of templates) {
    await prisma.emailTemplate.create({
      data: template,
    });
  }

  console.log('Email templates seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
