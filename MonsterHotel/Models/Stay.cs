using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonsterHotel.Models
{
    public class Stay
    {
        public int Id { get; set; }
        public int GuestId { get; set; }
        public int HandlerId { get; set; }
        public int RoomId { get; set; }
        public DateTime CheckInTime { get; set; }
        public DateTime CheckOutTime { get; set; }
        public bool IsCheckedIn { get; set; }
        public bool IsActive { get; set; }
    }
}
