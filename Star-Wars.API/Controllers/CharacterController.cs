using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Star_Wars.API.BindingModels;
using Star_Wars.API.Helpers;
using Star_Wars.API.ViewModels;
using Star_Wars.Domain;
using Star_Wars.Infrastructure.Persistence;

namespace Star_Wars.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly StarWarsDbContext _context;
        
        public CharacterController(StarWarsDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetCharacters()
        {
            var characters = await _context.Characters.ToListAsync();

            if (characters != null)
            {
                var basicCharacterDataList = characters.Select(character => new CharacterViewModel
                {
                    Id = character.Id,
                    Name = character.Name

                }).ToList();

                return Ok(basicCharacterDataList);
            }

            return NotFound();
        }
        
        [HttpGet]
        public async Task<IActionResult> GetCharactersPaginated([FromQuery]CharacterParams characterParams)
        {
            var characters = _context.Characters;

            var pagedCharacters =
                await PagedList<Character>.CreateAsync(characters, characterParams.PageNumber,
                    characterParams.PageSize);
            
            if (pagedCharacters != null)
            {
                var basicCharacterDataList = pagedCharacters.Select(character => new CharacterViewModel 
                {
                    Id = character.Id, 
                    Name = character.Name
                        
                }).ToList();
                
                Response.AddPagination(pagedCharacters.CurrentPage, pagedCharacters.PageSize,
                    pagedCharacters.TotalCount, pagedCharacters.TotalPages);
                
                return Ok(basicCharacterDataList);
            }

            return NotFound();
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCharacter(int id)
        {
            var character = await _context.Characters.FirstOrDefaultAsync(x => x.Id == id);

            if (character != null)
            {
                return Ok(new CharacterViewModel
                {
                    Id = character.Id,
                    Name = character.Name
                });
            }

            return NotFound();
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateCharacter([FromBody] CreateCharacter data)
        {
            var character = new Character
            {
                Name = data.Name
            };
            
            await _context.AddAsync(character);
            await _context.SaveChangesAsync();

            return Created(character.Id.ToString(), new CharacterViewModel
            {
                Id = character.Id,
                Name = character.Name
            });
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCharacter(int id, [FromBody] EditCharacter data)
        {
            var character = await _context.Characters.FirstOrDefaultAsync(x => x.Id == id);
            
            if (character != null)
            {
                character.Name = data.Name;
                await _context.SaveChangesAsync();
                
                return Ok(character.Name);
            }

            return NotFound();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharacter(int id)
        {
            var character = await _context.Characters.FirstOrDefaultAsync(x => x.Id == id);
            
            if (character != null)
            {
                _context.Characters.Remove(character);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }

    }
}