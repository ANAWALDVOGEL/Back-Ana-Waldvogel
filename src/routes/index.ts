import { Router } from 'express';
import { uuid } from 'uuidv4';

const routes = Router();

interface User {
    id: string;
    name: string;
    dateOfBirth: string;
    cpf: number;
    cellPhone: number;
    dateOfCreation: Date;
    dateOfActualization: Date;
};

const usersArray = [] as User[];

routes.post('/users', (req,resp) => {
    const { id, name, dateOfBirth, cpf, cellPhone, dateOfCreation, dateOfActualization } = req.body;     

    if (usersArray.find(user => user.cpf === cpf))
        return resp.status(400).json({ message: "User with this cpf already exists"});

    const user = {
        id: uuid(),
        name,
        dateOfBirth,
        cpf,
        cellPhone,
        dateOfCreation: new Date(),
        dateOfActualization: new Date()
    } as User;

    usersArray.push(user);

    if (!name || !cpf || !cellPhone || !dateOfBirth)
        return resp.status(400).json({ message: "Cannot create an account because some information is missing"});
    else
        return resp.json(usersArray);
});

routes.get("/users", (req,resp) => {
    return resp.json(usersArray);
});

export default routes;

