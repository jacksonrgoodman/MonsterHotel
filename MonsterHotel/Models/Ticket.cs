using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonsterHotel.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public int TicketTypeId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public DateTime CreateDateTime { get; set; }
        public int UserProfileId { get; set; }
        public int TicketStatusId { get; set; }
        public TicketType TicketType { get; set; }
        public TicketStatus TicketStatus { get; set; }
        public Guest Guest { get; set; }
        public UserProfile UserProfile { get; set; }
        public bool IsActive { get; set; }
        
    }
}
