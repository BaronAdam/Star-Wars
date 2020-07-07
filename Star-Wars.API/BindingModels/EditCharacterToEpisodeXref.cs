using System.ComponentModel.DataAnnotations;

namespace Star_Wars.API.BindingModels
{
    public class EditCharacterToEpisodeXref
    {
        [Required]
        public int CharacterId { get; set; }
        [Required]
        public int EpisodeId { get; set; }
    }
}