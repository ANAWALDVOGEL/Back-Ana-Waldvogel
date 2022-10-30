import { Router } from "express";
import { uuid } from "uuidv4";

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

let usersArray = [] as User[];

routes.post("/users", (req, resp) => {
  const {
    id,
    name,
    dateOfBirth,
    cpf,
    cellPhone,
    dateOfCreation,
    dateOfActualization,
  } = req.body;

  if (usersArray.find((user) => user.cpf === cpf))
    return resp.status(400).json({ message: "User with this cpf already exists" });

  const user = {
    id: uuid(),
    name,
    dateOfBirth,
    cpf,
    cellPhone,
    dateOfCreation: new Date(),
    dateOfActualization: new Date(),
  } as User;

  usersArray.push(user);

  if (!name || !cpf || !cellPhone || !dateOfBirth)
    return resp.status(400).json({ message: "Cannot create an account because some information is missing"});
  else 
    return resp.json(usersArray);
});

routes.get("/users", (req, resp) => {
  return resp.json(usersArray);
});

routes.get('/users/:id', (req,resp) => {
    const { id } = req.params;

    const userIdFind = usersArray.find((user) => user.id === id);

    if (!userIdFind) return resp.status(404).json({ message: "User not found" });

    resp.json(userIdFind);
});

routes.put('/users/:id', (req,resp) => {
    const { id } = req.params; 

    const { name, dateOfBirth, cpf, cellPhone, dateOfActualization } = req.body;

    const userData = { 
        name,
        dateOfBirth,
        cpf,
        cellPhone,
        dateOfActualization: new Date()
    } as User;

    const userId = usersArray.findIndex((user) => user.id === id);

    const verificateCpf = usersArray.findIndex((user) => user.cpf === cpf && user.id !== id);

    if (verificateCpf !== -1) return resp.status(400).json({ message: "User with this cpf already exists" });
    
    if (!name || !cpf || !cellPhone || !dateOfBirth)
      return resp.status(400).json({ message: "Cannot create an account because some information is missing"});
    
    usersArray[userId] = {...usersArray[userId], ...userData};

    return resp.json(usersArray[userId]);
});

routes.delete('/users/:id', (req,resp) => {
    const { id } = req.params;

    const verificateId = usersArray.find((user => user.id === id));

    if (!verificateId) return resp.status(404).json({ message: "User not found"});

    usersArray = usersArray.filter((user) => user.id !== id); 
  
    resp.json(usersArray);
});
  

interface Piu {
  id: string;
  idUser: string;
  text: string;
  dateOfCreation: Date;
  dateOfActualization: Date;
};

let piusArray = [] as Piu[];

routes.post("/pius", (req, resp) => {
  const { id, idUser, text, dateOfCreation, dateOfActualization } = req.body;

  const findIdUser = usersArray.find((user) => user.id === idUser);
    
  if (!findIdUser) return resp.status(400).json({ message: "Cannot create a piu because user was not found"});

  if (text.length > 140)
    return resp.status(400).json({ message: "Cannot create piu because you exceeded the limit of characters"});  
    
  const piu = {
    id: uuid(),
    idUser,
    text,
    dateOfCreation: new Date(),
    dateOfActualization: new Date(),
  } as Piu;
    
  piusArray.push(piu);

  if (!text)
    return resp.status(400).json({ message: "Cannot create a Piu because text is empty"});
  else 
    return resp.json(piusArray);
    
});

routes.get("/pius", (req, resp) => {
  return resp.json(piusArray);
});

routes.get('/pius/:id', (req,resp) => {
  const { id } = req.params;

  const piuIdFind = piusArray.find((piu) => piu.id === id);

  if (!piuIdFind) return resp.status(404).json({ message: "Piu not found" });

  resp.json(piuIdFind);
});

routes.put('/pius/:id', (req,resp) => {
    const { id } = req.params;

    const piuId = piusArray.findIndex((piu) => piu.id === id);

    if (piuId === -1) return resp.status(404).json({ message: "Piu not found"});

    const { text } = req.body;
  
    if (text.length > 140)
      return resp.status(400).json({ message: "Cannot create piu because you exceeded the limit of characters"});  
      
    const piuData = {
      text,
      dateOfActualization: new Date()
    } as Piu;

    if (!text)
    return resp.status(400).json({ message: "Cannot create a Piu because text is empty"});

    piusArray[piuId] = {...piusArray[piuId], ...piuData};

    return resp.json(piusArray[piuId]);
});

routes.delete('/pius/:id', (req,resp) => {
  const { id } = req.params;

  const verificateId = piusArray.find((piu => piu.id === id));

  if (!verificateId) return resp.status(404).json({ message: "Piu not found"});

  piusArray = piusArray.filter((piu) => piu.id !== id); 

  resp.json(piusArray);
});

export default routes;
