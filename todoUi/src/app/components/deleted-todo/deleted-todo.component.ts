import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-deleted-todo',
  templateUrl: './deleted-todo.component.html',
  styleUrl: './deleted-todo.component.css'
})
export class DeletedTodoComponent implements OnInit {
  todos :Todo[]=[];

  constructor(private todoService :TodoService){}

  ngOnInit(): void {
 this.getAllDeleteTodos();
  }
  getAllDeleteTodos(){
    this.todoService.getAlldeletedTodos()
    .subscribe({
      next: (res)=>{
        this.todos=res;
      }
    })
  }
  undoDeleteTodo(id:string, todo:Todo){
    this.todoService.undoDeleteTodo(id, todo).subscribe({
      next :(res)=>{
        this.getAllDeleteTodos();
      }
    })
  }
}
