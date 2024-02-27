import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService 
{
  baseAPi: string = "https://localhost:7037";
  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseAPi + '/api/todo');
  }

  addTodoService(newTodo: Todo): Observable<Todo> {
    newTodo.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Todo>(this.baseAPi + '/api/todo', newTodo);
  }
  updateTodo(id:string, todo:Todo):Observable<Todo>{
    return this.http.put<Todo>(this.baseAPi + '/api/todo/'+ id, todo);
  }
  deleteTodo(id:string): Observable<Todo>{
    return this.http.delete<Todo>(this.baseAPi + '/api/todo/' +id);
  }
  getAlldeletedTodos() :Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseAPi +'/api/todo/get-deleted-todos/');
  }
  undoDeleteTodo(id:string, todo:Todo):Observable<Todo>{
    return this.http.put<Todo>(this.baseAPi +'/api/todo/undo-deleted-todo/' +id,todo);
  }
  updateTodo1(id: string, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.baseAPi + '/api/todo/' + id, todo);
  }
}
