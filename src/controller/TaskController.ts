import { getRepository } from 'typeorm' //importa getRepository
import { Tasks } from '../entity/Tasks' //importa entidade Task
import { Request, Response } from 'express' //importa os métodos http do express

//criar método de buscar tasks
export const getTasks = async (request: Request, response: Response) =>{
    const tasks = await getRepository(Tasks).find()
    return response.json(tasks)
};

//cria método que busca somente um dado com parâmetro
export const getTask = async (request: Request,response: Response) =>{
    const { id } = request.params
    const task = await getRepository(Tasks).findOne(id)
    return response.json(task)
};

//cria método pra salvar task
export const saveTask = async (request: Request, response: Response) =>{
    const task = await getRepository(Tasks).save(request.body)
    response.json(task)
};

//cria método para atualizar tarefa
export const updateTask = async (request: Request, response: Response) =>{
    const { id } = request.params
    const task = await getRepository(Tasks).update(id, request.body)

    if(task.affected == 1){
        const tasksUpdate = await getRepository(Tasks).findOne(id)
        return response.json(tasksUpdate)
    }
    return response.status(404).json({message: "Task Not Found"})
};


//cria método para finalizar task
export const finishedTask = async (request: Request, response: Response) =>{
    const { id } = request.params

    const task = await getRepository(Tasks).update(id, {
        finished: true
    })

    if(task.affected == 1){
        const tasksUpdate = await getRepository(Tasks).findOne(id)
        return response.json({message:"task finished successfully"})
    }
    return response.status(404).json({message: "Task Not Found"})
    
}


//metodo para deletar task

export const removeTask = async (request: Request, response: Response) =>{
    const { id } = request.params

    const task = await getRepository(Tasks).delete(id)

    if(task.affected == 1){
        const tasksUpdate = await getRepository(Tasks).findOne(id)
        return response.json({message:"task remove successfully"})
    }
    return response.status(404).json({message: "Task Not Found"})
    
}
