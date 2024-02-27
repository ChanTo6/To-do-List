using Microsoft.EntityFrameworkCore;
using TodoApp.API.Models;

namespace TodoApp.API.Data
{
    public class TodoDBContext : DbContext
    {
        public TodoDBContext(DbContextOptions options) : base(options) { }
        public DbSet<Todo> Todos { get; set; }


    }
}
