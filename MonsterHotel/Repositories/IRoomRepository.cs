using MonsterHotel.Models;
using System.Collections.Generic;

namespace MonsterHotel.Repositories
{
    public interface IRoomRepository
    {
        List<Rooms> GetAll();
    }
}