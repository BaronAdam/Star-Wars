using Microsoft.EntityFrameworkCore;

namespace Star_Wars.Infrastructure.Persistence
{
    public class StarWarsDbContext : DbContext
    {
        public StarWarsDbContext(DbContextOptions<StarWarsDbContext> options) : base(options)
        {
            
        }
    }
}