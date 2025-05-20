import { Request, Response } from 'express';
import { TodoService } from '../services/todo.service';

const todoService = new TodoService();

export const todoController = {
  // Create a new todo
  create: async (req: Request, res: Response) => {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    try {
      const todo = await todoService.createTodo(title, description);
      res.status(201).json(todo);
    } catch (error) {
      console.error('Create todo error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get all todos
  getAll: async (req: Request, res: Response) => {
    try {
      const allTodos = await todoService.getAllTodos();
      res.json(allTodos);
    } catch (error) {
      console.error('Get todos error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get a single todo
  getOne: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const todo = await todoService.getTodoById(parseInt(id));

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      res.json(todo);
    } catch (error) {
      console.error('Get todo error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update a todo
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
      const todo = await todoService.updateTodo(parseInt(id), {
        title,
        description,
        completed,
      });

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      res.json(todo);
    } catch (error) {
      console.error('Update todo error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const todo = await todoService.deleteTodo(parseInt(id));

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error('Delete todo error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}; 