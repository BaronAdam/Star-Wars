using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Star_Wars.Domain
{
    public class Friend
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public int FriendId { get; set; }
    }
}