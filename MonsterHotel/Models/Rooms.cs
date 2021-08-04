using System.ComponentModel.DataAnnotations;

namespace MonsterHotel.Models
{
    public class Rooms
    {
        public int Id { get; set; }
        public int Floor { get; set; }

        public string Name { get; set; }
        public string FullName
        {
            get
            {
                return $"{Floor}{Name}";
            }
        }

    }
}