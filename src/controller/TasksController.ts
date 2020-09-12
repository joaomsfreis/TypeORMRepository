import { getRepository } from "typeorm";
import { Tasks } from "../entity/Tasks";
import { Request, Response } from "express";

export const getTasks = async (request: Request, response: Response) => {
    const tasks = await getRepository(Tasks).find();
    return response.json(tasks);
}

export const getTask = async (request: Request, response: Response) => {
    const { id } = request.params;
    const task = await getRepository(Tasks).findOne(id);
    return response.json(task);
}

export const saveTask = async (request: Request, response: Response) => {
    const task = await getRepository(Tasks).save(request.body);
    return response.json(task);
}

export const updateTask = async (request: Request, respose: Response) => {
    const { id } = request.params;

    const task = await getRepository(Tasks).update(id, request.body);

    if(task.affected === 1) {
        const taksUpdated = await getRepository(Tasks).findOne(id);
        return respose.json(taksUpdated);
    }

    return respose.status(404).json({ message: 'Task not found' });
}

export const finishedTask = async (request: Request, respose: Response) => {
    const { id } = request.params;

    const task = await getRepository(Tasks).update(id, {
        finished: true
    });

    if(task.affected === 1) {
        const taksUpdated = await getRepository(Tasks).findOne(id);
        return respose.json({ message: 'Task finished!' });
    }

    return respose.status(404).json({ message: 'Task not found' });
}

export const removeTask = async (request: Request, respose: Response) => {
    const { id } = request.params;

    const task = await getRepository(Tasks).delete(id);

    if(task.affected === 1) {
        const taksUpdated = await getRepository(Tasks).findOne(id);
        return respose.json({ message: 'Task removed!' });
    }

    return respose.status(404).json({ message: 'Task not found' });
}

