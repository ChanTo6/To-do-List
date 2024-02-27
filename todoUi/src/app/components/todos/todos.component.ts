import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  newTodoForm!: FormGroup;
  newTodo: Todo = {
    id: '',
    description: '',
    createdDate: new Date(),
    isCompleted: false,
    completedDate: new Date(),
    deletedDate: new Date(),
    isDeleted: false,
    editing: false,
    tempDescription: ''
  };

  showDescriptionErrorMessage: boolean = false;
  showTempDescriptionErrorMessage: boolean = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getAllTodosComponent();
  }

  getAllTodosComponent() {
    this.todoService.getAllTodos()
      .subscribe({
        next: (todo) => {
          this.todos = todo;
        }
      });
  }

  enableEditing(todo: Todo) {
    todo.editing = true;
    todo.tempDescription = todo.description;
  }

  saveChanges(todo: Todo) {
    if (todo.tempDescription.trim() === '') {
      this.showTempDescriptionErrorMessage = true;
      return;
    }
    todo.editing = false;
    todo.description = todo.tempDescription;
    this.todoService.updateTodo(todo.id, todo).subscribe({
      next: (response) => {
        this.getAllTodosComponent();
      },
      error: (error) => {
        console.error('Error updating todo:', error);
      }
    });
    this.showTempDescriptionErrorMessage = false; 
  }

  cancelEditing(todo: Todo) {
    todo.editing = false;
    todo.tempDescription = '';
    this.showTempDescriptionErrorMessage = false; 
  }

  addTodo() {
    if (this.newTodo.description.trim() === '') {
      this.showDescriptionErrorMessage = true;
      return;
    }
    this.todoService.addTodoService(this.newTodo)
      .subscribe({
        next: (todo) => {
          this.getAllTodosComponent();
          this.newTodo.createdDate = new Date();
          this.newTodo.isCompleted = false;
          this.newTodo.description = '';
        },
        error: (error) => {
          console.error('Error adding todo:', error);
        }
      });
    this.showDescriptionErrorMessage = false; 
  }

  onCompletedChange(id: string, todo: Todo) {
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(id, todo).subscribe({
      next: (response) => {
        this.getAllTodosComponent();
      }
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe({
      next: (response) => {
        this.getAllTodosComponent();
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
      }
    });
  }
}
