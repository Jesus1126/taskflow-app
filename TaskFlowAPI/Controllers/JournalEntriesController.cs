using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskFlowAPI.Data;
using TaskFlowAPI.Models;

namespace TaskFlowAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JournalEntriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JournalEntriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JournalEntry>>> GetEntries()
        {
            return await _context.JournalEntries.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<JournalEntry>> PostEntry(JournalEntry entry)
        {
            _context.JournalEntries.Add(entry);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEntries), new { id = entry.Id }, entry);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntry(int id, JournalEntry updatedEntry)
        {
            if (id != updatedEntry.Id)
                return BadRequest();

            var existingEntry = await _context.JournalEntries.FindAsync(id);
            if (existingEntry == null)
                return NotFound();

            existingEntry.Content = updatedEntry.Content;
            existingEntry.HoursStudied = updatedEntry.HoursStudied;
            existingEntry.Date = updatedEntry.Date;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntry(int id)
        {
            var entry = await _context.JournalEntries.FindAsync(id);
            if (entry == null)
                return NotFound();

            _context.JournalEntries.Remove(entry);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}