using System.ComponentModel.DataAnnotations;

namespace Star_Wars.API.BindingModels
{
    public class CreateFriend
    {
        [Required]
        public int CharacterId { get; set; }
        [Required]
        public int FriendId { get; set; }
    }
}