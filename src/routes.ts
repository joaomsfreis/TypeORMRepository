import { Router, Request, Response } from 'express';
import {getTasks, saveTask, getTask, updateTask, finishedTask, removeTask} from "./controller/TasksController";

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({ massege: 'Hello World 2!' })
});

routes.get('/tasks', getTasks);
routes.post('/tasks', saveTask);
routes.put('/tasks/:id', updateTask);
routes.patch('/tasks/:id', finishedTask);
routes.get('/tasks/:id', getTask);
routes.delete('/tasks/:id', removeTask);

export default routes;