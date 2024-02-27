namespace TodoApp.API.Models
{
    public class Todo
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool isCompleted { get; set; }
        public DateTime CompletedDate { get; set; }
        public bool isDeleted { get; set; }
        public DateTime? DeleteDate { get; set; }
    }

}
