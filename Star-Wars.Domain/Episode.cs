using System.Collections.Generic;

namespace Star_Wars.Domain
{
    public class Episode
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public virtual List<CharacterToEpisodeXref> CharacterToEpisode { get; set; } = 
            new List<CharacterToEpisodeXref>();
    }
}