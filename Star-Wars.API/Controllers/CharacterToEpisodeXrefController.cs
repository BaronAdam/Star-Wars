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
    public class CharacterToEpisodeXrefController : ControllerBase
    {
        private readonly StarWarsDbContext _context;

        public CharacterToEpisodeXrefController(StarWarsDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDataByCharacterId(int id)
        {
            var characterToEpisodeXrefs = await _context.CharacterToEpisodeXrefs
                .Where(d => d.CharacterId == id)
                .ToListAsync();

            var basicDataList = characterToEpisodeXrefs.Select(data => new CharacterToEpisodeXrefViewModel
            {
                Id = data.Id,
                CharacterId = data.CharacterId,
                EpisodeId = data.EpisodeId
            });

            return Ok(basicDataList);
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateCharacterToEpisodeXref([FromBody] CreateCharacterToEpisodeXref data)
        {
            var characterToEpisodeXref = new CharacterToEpisodeXref
            {
                CharacterId = data.CharacterId,
                EpisodeId = data.EpisodeId
            };

            await _context.AddAsync(characterToEpisodeXref);
            await _context.SaveChangesAsync();

            return Created(characterToEpisodeXref.Id.ToString(), new FriendViewModel
            {
                Id = characterToEpisodeXref.Id,
                CharacterId = characterToEpisodeXref.CharacterId,
                FriendId = characterToEpisodeXref.EpisodeId
            });
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCharacterToEpisodeXref(int id, [FromBody] EditCharacterToEpisodeXref data)
        {
            var characterToEpisodeXref = await _context.CharacterToEpisodeXrefs.FirstOrDefaultAsync(x => x.Id == id);

            if (characterToEpisodeXref != null)
            {
                characterToEpisodeXref.CharacterId = data.CharacterId;
                characterToEpisodeXref.EpisodeId = data.EpisodeId;
                await _context.SaveChangesAsync();

                return Ok(characterToEpisodeXref.Id);
            }

            return NotFound();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharacterToEpisodeXref(int id)
        {
            var characterToEpisodeXref = await _context.CharacterToEpisodeXrefs
                .FirstOrDefaultAsync(x => x.Id == id);

            if (characterToEpisodeXref != null)
            {
                _context.CharacterToEpisodeXrefs.Remove(characterToEpisodeXref);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}