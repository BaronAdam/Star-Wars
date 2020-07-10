using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Star_Wars.API.BindingModels;
using Star_Wars.API.ViewModels;
using Star_Wars.Domain;
using Star_Wars.Infrastructure.Persistence;

namespace Star_Wars.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EpisodeController : ControllerBase
    {
        private readonly StarWarsDbContext _context;

        public EpisodeController(StarWarsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetEpisodes()
        {
            var episodes = await _context.Episodes.ToListAsync();

            if (episodes != null)
            {
                var basicEpisodeDataList = episodes.Select(episode => new EpisodeViewModel
                {
                    Id = episode.Id,
                    Name = episode.Name
                });

                return Ok(basicEpisodeDataList);
            }

            return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEpisode(int id)
        {
            var episode = await _context.Episodes.FirstOrDefaultAsync(x => x.Id == id);

            if (episode != null)
            {
                return Ok(new EpisodeViewModel
                {
                    Id = episode.Id,
                    Name = episode.Name
                });
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CreateEpisode([FromBody] CreateEpisode data)
        {
            var episode = new Episode()
            {
                Name = data.Name
            };

            await _context.AddAsync(episode);
            await _context.SaveChangesAsync();

            return Created(episode.Id.ToString(), new EpisodeViewModel
            {
                Id = episode.Id,
                Name = episode.Name
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEpisode(int id, [FromBody] EditEpisode data)
        {
            var episode = await _context.Episodes.FirstOrDefaultAsync(x => x.Id == id);

            if (episode != null)
            {
                episode.Name = data.Name;
                await _context.SaveChangesAsync();

                return Ok(episode.Name);
            }

            return NotFound();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEpisode(int id)
        {
            var episode = await _context.Episodes.FirstOrDefaultAsync(x => x.Id == id);
            
            if (episode != null)
            {
                _context.Episodes.Remove(episode);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}