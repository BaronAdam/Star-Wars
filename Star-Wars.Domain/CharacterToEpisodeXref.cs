namespace Star_Wars.Domain
{
    public class CharacterToEpisodeXref
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public int EpisodeId { get; set; }
        
        public virtual Character Character { get; set; }
        public virtual Episode Episode { get; set; }
    }
}