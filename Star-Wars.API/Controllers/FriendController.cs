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
    public class FriendController : ControllerBase
    {
        private readonly StarWarsDbContext _context;

        public FriendController(StarWarsDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFriendsByCharacterId(int id)
        {
            var friends = await _context.Friends
                .Where(f => f.CharacterId == id)
                .ToListAsync();
            
            var basicFriendDataList = friends.Select(friend => new FriendViewModel
            {
                Id = friend.Id,
                CharacterId = friend.CharacterId,
                FriendId = friend.FriendId
            });

            return Ok(basicFriendDataList);
        }

        [HttpPost]
        public async Task<IActionResult> CreateFriend([FromBody] CreateFriend data)
        {
            var friend = new Friend
            {
                CharacterId = data.CharacterId,
                FriendId = data.FriendId
            };

            await _context.AddAsync(friend);
            await _context.SaveChangesAsync();

            return Created(friend.Id.ToString(), new FriendViewModel
            {
                Id = friend.Id,
                CharacterId = friend.CharacterId,
                FriendId = friend.FriendId
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditFriend(int id, [FromBody] EditFriend data)
        {
            var friend = await _context.Friends.FirstOrDefaultAsync(x => x.Id == id);

            if (friend != null)
            {
                friend.CharacterId = data.CharacterId;
                friend.FriendId = data.FriendId;
                await _context.SaveChangesAsync();

                return Ok(friend.Id);
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFriend(int id)
        {
            var friend = await _context.Friends.FirstOrDefaultAsync(x => x.Id == id);

            if (friend != null)
            {
                _context.Friends.Remove(friend);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            return NotFound();
        }
    }
}