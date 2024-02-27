using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoDBContext _TodoDbContext;
        public TodoController(TodoDBContext todoDBContext)
        {
            _TodoDbContext = todoDBContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllTodos()
        {
            var todos = await _TodoDbContext.Todos.Where(x => x.isDeleted == false)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();
            return Ok(todos);
        }

        [HttpGet]
        [Route("get-deleted-todos")]
        public async Task<IActionResult> GetDeletedTodos()
        {
            var todos = await _TodoDbContext.Todos
                .Where(x => x.isDeleted == true)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();
            return Ok(todos);
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo(Todo todo)
        {
            todo.Id = Guid.NewGuid();
            todo.CreatedDate = DateTime.Now;
            _TodoDbContext.Todos.Add(todo);
            await _TodoDbContext.SaveChangesAsync();
            return Ok(todo);
        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] Guid id, Todo todoUpdateRequest)
        {
            var todo = await _TodoDbContext.Todos.FindAsync(id);
            if (todo == null)
                return NotFound();
            todo.isCompleted = todoUpdateRequest.isCompleted;
            todo.Description = todoUpdateRequest.Description;
            todo.CompletedDate = DateTime.Now;
            await _TodoDbContext.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] Guid id)
        {
            var todo = await _TodoDbContext.Todos.FindAsync(id);
            if (todo == null)
                return NotFound();
            todo.isDeleted = true;
            todo.DeleteDate = DateTime.Now;
            await _TodoDbContext.SaveChangesAsync();
            return Ok(todo);
        }
        [HttpPut]
        [Route("undo-deleted-todo/{id:Guid}")]
        public async Task<IActionResult> UndoDeletedTodo([FromRoute] Guid id, Todo undoDeletedodoRequest)
        {
            var todo = await _TodoDbContext.Todos.FindAsync(id);
            if (todo == null)
                return NotFound();

            todo.DeleteDate = null;
            todo.isDeleted = false;

            await _TodoDbContext.SaveChangesAsync();
            return Ok(todo);
        }
    }
}
