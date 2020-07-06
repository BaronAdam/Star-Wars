using System.Collections.Generic;

namespace Star_Wars.Domain
{
    public class Character
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public virtual List<Friend> Friend { get; set; } = new List<Friend>();
        public virtual List<CharacterToEpisodeXref> CharacterToEpisode { get; set; } = 
            new List<CharacterToEpisodeXref>();
    }
}