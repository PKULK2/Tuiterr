import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";
import {findAllUsers} from "../services/users-service";

// jest.mock('axios');

const MOCKED_USERS = [
    "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
    {
        id: "62183e799c2a88b17172e71a",
        tuit: "alice's first tuit, now im updating it",
        postedBy: "62183c899c2a88b17172e70d",
        postedOn: "2022-02-25T02:27:05.600+00:00t"
    }
];

test('can retrieve tuits from API', async () => {
    findAllTuits()
        .then(tuits => {
            console.log(tuits)
        })
    // const tuits = await findAllTuits();
    // console.log(tuits);
    // expect(tuits).toBeDefined();
})

test('tuit list renders static tuit array', () => {
    // TODO: implement this
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>);
    const linkElement = screen.getByText(/alice's first tuit, now im updating it/i);
    expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
    // TODO: implement this
    const mock = jest.spyOn(axios, "get");
    mock.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const tuit = screen.getByText(/alice's first tuit, now im updating it/i);
    expect(tuit).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
    // TODO: implement this
    const mock = jest.spyOn(axios, "get");
    mock.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);

    const tuit = screen.getByText(/alice's first tuit, now im updating it/i);
    expect(tuit).toBeInTheDocument();

});