namespace Star_Wars.API.ViewModels
{
    public class CharacterToEpisodeXrefViewModel
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public int EpisodeId { get; set; }
    }
}