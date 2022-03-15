import {
    findAllTuits, findTuitByUser, findTuitById,
    createTuit, updateTuit, deleteTuit, deleteTuitByContent
} from "../services/tuits-service";
import {
    createUser,
    deleteUser,
    deleteUsersByUsername,
    findAllUsers,
    findUserByCredentials
} from "../services/users-service";

describe('can create tuit with REST API',  () => {
    // TODO: implement this
    // sample tuit to insert
    const ripley = {
        username: 'trump',
        password: 'lv426',
        email: 'trump@aliens.com'
    }
    const hello = {tuit: "Hello World!"}
    // setup test before running test

    /*beforeAll(() => {
        // use return, Jest will wait for this promise to resolve before running tests.
        // remove any/all tuits to make sure we create it in the test
        return deleteTuitByContent(hello.tuit);
    })*/

    // clean up after test runs
    afterAll(() => {
            // remove any data we created
            const promise1 = deleteTuitByContent(hello.tuit)
            const promise2 = deleteUsersByUsername(ripley.username)
            // The Promise.all() method takes an iterable of promises as an input
            // must use Promise.all([])  or pass an iterable such as .map()
            return Promise.all([promise1, promise2])
        }
    )

    test('can create new tuit with REST API', async () => {
        // insert new user in the database
        const newUser = await createUser(ripley)
        const newTuit = await createTuit(newUser._id, hello);

        expect(newTuit.tuit).toEqual(hello.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
    });
});


describe('can delete tuit with REST API', () => {
    // TODO: implement this
    const ripley = {
        username: 'trump',
        password: 'lv426',
        email: 'trump@aliens.com'
    }
    const hello = {tuit: "Hello World!"}

    afterAll(async () => {
            // remove any data we created
            // use await to wait until all promises finished
            await deleteTuitByContent(hello.tuit)
            await deleteUsersByUsername(ripley.username)
        }
    )

    test('can delete users from REST API by username', async () => {
        // create new tuit
        const newUser = await createUser(ripley);
        const newTuit = await createTuit(newUser._id, hello)
        // delete a tuit by its id.
        const status = await deleteTuit(newTuit._id);
        // verify we deleted at least one tuit by their id
        expect(status.deletedCount).toBe(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // TODO: implement this
    const ripley = {
        username: 'trump',
        password: 'lv426',
        email: 'trump@aliens.com'
    }
    const hello = {tuit: "Hello World!"}

    afterAll(async () => {
            // remove any data we created
            // use await to wait until all promises finished
            await deleteTuitByContent(hello.tuit)
            await deleteUsersByUsername(ripley.username)
        })

    test('can retrieve a tuit from REST API by primary key', async () => {
        // create new tuit
        const newUser = await createUser(ripley);
        const newTuit = await createTuit(newUser._id, hello)

        // verify new tuit matches the parameter tuit && new user's id(primary key)
        expect(newTuit.tuit).toEqual(hello.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

        // retrieve the user from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved tuit matches parameter tuit && new user's id
        expect(existingTuit.tuit).toEqual(hello.tuit);
        // existingTuit is a tuit object with a populated postedBy(user) object
        expect(existingTuit.postedBy._id).toEqual(newUser._id);
    });
});

describe('can retrieve all tuits with REST API', () => {
    // TODO: implement this
    const ripley = {
        username: 'trump',
        password: 'lv426',
        email: 'trump@aliens.com'
    }

    const tuits = ["Hey", "Hello", "Bye"]

    beforeAll(async () => {
        const user = await createUser(ripley)
        ripley._id = user._id
        await Promise.all(tuits.map(content =>
            createTuit(user._id, {tuit: content})))
    });

    afterAll(async () => {
            await Promise.all(tuits.map(content =>
                deleteTuitByContent(content)))
            await deleteUsersByUsername(ripley.username)
        }
    );

    test('can retrieve all users from REST API', async () => {
        const tuit = await findAllTuits();

        const tuitsWeInserted = tuit.filter(
            tweet => tuits.indexOf(tweet.tuit) >= 0);

        expect(tuit.length).toBeGreaterThanOrEqual(tuits.length);

        tuitsWeInserted.forEach(user => {
            const result = tuits.find(result => result === user.tuit);
            expect(user.tuit).toEqual(result)
            //console.log(result)
            //expect(tuit.postedBy._id).toEqual(ripley._id);
        });
    });
});