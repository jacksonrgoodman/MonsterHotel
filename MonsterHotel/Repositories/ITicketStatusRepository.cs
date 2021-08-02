using MonsterHotel.Models;
using System.Collections.Generic;

namespace MonsterHotel.Repositories
{
    public interface ITicketStatusRepository
    {
        List<TicketStatus> GetAll();
    }
}