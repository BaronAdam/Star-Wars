using Microsoft.EntityFrameworkCore;
using Star_Wars.Domain;

namespace Star_Wars.Infrastructure.Persistence
{
    public class StarWarsDbContext : DbContext
    {
        public StarWarsDbContext(DbContextOptions<StarWarsDbContext> options) : base(options) { }
        
        public virtual DbSet<Character> Characters { get; set; }
        public virtual DbSet<Episode> Episodes { get; set; }
        public virtual DbSet<CharacterToEpisodeXref> CharacterToEpisodeXrefs { get; set; }
        public virtual DbSet<Friend> Friends { get; set; }
    }
}