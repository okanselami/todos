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

  // Delete a todo
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
  },

  // Create multiple todos
  createBatch: async (req: Request, res: Response) => {
    const { todos } = req.body;

    if (!Array.isArray(todos) || todos.length === 0) {
      return res.status(400).json({ error: 'Todos array is required' });
    }

    try {
      const createdTodos = await todoService.createBatch(todos);
      res.status(201).json(createdTodos);
    } catch (error) {
      console.error('Create batch todos error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update multiple todos
  updateBatch: async (req: Request, res: Response) => {
    const { updates } = req.body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ error: 'Updates array is required' });
    }

    try {
      const updatedTodos = await todoService.updateBatch(updates);
      res.json(updatedTodos);
    } catch (error) {
      console.error('Update batch todos error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete multiple todos
  deleteBatch: async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Ids array is required' });
    }

    try {
      const deletedTodos = await todoService.deleteBatch(ids);
      res.json({ 
        message: 'Todos deleted successfully',
        deletedCount: deletedTodos.length
      });
    } catch (error) {
      console.error('Delete batch todos error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}; 