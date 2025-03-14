const { faker } = require('@faker-js/faker')
const { MongoClient } = require('mongodb')

const dbUrl = 'mongodb://localhost:27017'
const dbCount = 1000000
const dbName = 'test'

async function seedDataBase() {
    try {
        const client = await MongoClient.connect(dbUrl)
        console.log("Connected");

        const db = client.db(dbName)
        console.log(db);

        const personDb = []

        for (i = 0; i < dbCount; i++) {
            const firstName = faker.person.firstName;
            const lastName = faker.person.lastName;
            const age = faker.number.int({ max: 85, min: 18 })

            const person = {
                name: `${firstName} ${lastName}`,
                age,
                occupation: faker.helpers.arrayElement([
                    'engineer',
                    'doctor',
                    'writer',
                    'artist',
                    'teacher',
                    'developer',
                ]),
                salary: faker.finance.amount({
                    min: 30000 + age * 1000,
                    max: 150000 + age * 1000,
                    dec: 0,
                }),
                personality: {
                    traits: Array.from({ length: 3 }, () => faker.word.adjective()),
                    mbti: faker.helpers.arrayElement([
                        'INTJ',
                        'INTP',
                        'ENTJ',
                        'ENTP',
                        'INFJ',
                        'INFP',
                        'ENFJ',
                        'ENFP',
                        'ISTJ',
                        'ISFJ',
                        'ESTJ',
                        'ESFJ',
                        'ISTP',
                        'ISFP',
                        'ESTP',
                        'ESFP',
                    ]),
                    favoriteColor: faker.color.human(),
                },
                createdAt: faker.date.recent({ days: 30 }),
            }
            personDb.push(person)
            if ((i + 1) % 1000 === 0) {
                console.log(`${i + 1} person created`);
            }
        }

        await db.collection('person').insertMany(personDb)
        console.log('Data insertion complete');

        await client.close();

    } catch (e) {
        console.log(e);
    }
}

seedDataBase();