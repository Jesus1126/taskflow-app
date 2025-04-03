using System;
using System.ComponentModel.DataAnnotations;

namespace TaskFlowAPI.Models
{
    public class JournalEntry
    {
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public string? Content { get; set; }

        public double HoursStudied { get; set; }
    }
}