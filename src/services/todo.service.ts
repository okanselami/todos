import { db } from '../db';
import { todos } from '../db/schema';
import { eq, inArray } from 'drizzle-orm';
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

  async getTodoById(id: number): Promise<Todo | undefined> {
    const [todo] = await db.select()
      .from(todos)
      .where(eq(todos.id, id));
    return todo as Todo;
  }

  async updateTodo(id: number, data: Partial<Todo>): Promise<Todo | undefined> {
    const [todo] = await db.update(todos)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, id))
      .returning();
    return todo as Todo;
  }

  async deleteTodo(id: number): Promise<Todo | undefined> {
    const [todo] = await db.delete(todos)
      .where(eq(todos.id, id))
      .returning();
    return todo as Todo;
  }

  async createBatch(todoList: { title: string; description?: string }[]): Promise<Todo[]> {
    const [createdTodos] = await db.insert(todos)
      .values(todoList)
      .returning();
      
    return createdTodos as Todo[];
  }

  async updateBatch(updates: { id: number; data: Partial<Todo> }[]): Promise<Todo[]> {
    const updatedTodos: Todo[] = [];
    
    for (const update of updates) {
      const [todo] = await db.update(todos)
        .set({
          ...update.data,
          updatedAt: new Date(),
        })
        .where(eq(todos.id, update.id))
        .returning();
      
      if (todo) {
        updatedTodos.push(todo as Todo);
      }
    }
    
    return updatedTodos;
  }

  async deleteBatch(ids: number[]): Promise<Todo[]> {
    const [deletedTodos] = await db.delete(todos)
      .where(inArray(todos.id, ids))
      .returning();
      
    return deletedTodos as Todo[];
  }
} 