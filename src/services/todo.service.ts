import { db } from '../db';
import { todos } from '../db/schema';
import { eq } from 'drizzle-orm';
import { Todo } from '../types/todo';

export class TodoService {
  async createTodo(title: string, description?: string): Promise<Todo> {
    const [todo] = await db.insert(todos)
      .values({
        title,
        description,
      })
      .returning();
      
    return todo as Todo;
  }

  async getAllTodos(): Promise<Todo[]> {
    return (await db.select().from(todos).orderBy(todos.createdAt)) as Todo[];
  }

  async getTodoById(id: string): Promise<Todo | undefined> {
    const [todo] = await db.select()
      .from(todos)
      .where(eq(todos.id, id));
    return todo as Todo;
  }

  async updateTodo(id: string, data: Partial<Todo>): Promise<Todo | undefined> {
    const [todo] = await db.update(todos)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, id))
      .returning();
    return todo as Todo;
  }

  async deleteTodo(id: string): Promise<Todo | undefined> {
    const [todo] = await db.delete(todos)
      .where(eq(todos.id, id))
      .returning();
    return todo as Todo;
  }
} 