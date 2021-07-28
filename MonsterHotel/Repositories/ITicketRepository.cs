using MonsterHotel.Models;
using System.Collections.Generic;

namespace MonsterHotel.Repositories
{
    public interface ITicketRepository
    {
        List<Ticket> GetAll();
    }
}