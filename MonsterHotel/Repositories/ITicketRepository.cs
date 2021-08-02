using MonsterHotel.Models;
using System.Collections.Generic;

namespace MonsterHotel.Repositories
{
    public interface ITicketRepository
    {
        void Activate(int id);
        void Add(Ticket ticket);
        void Close(int id);
        void Open(int id);
        void Deactivate(int id);
        List<Ticket> GetAll();
        List<Ticket> GetAllIssueTickets();
        List<Ticket> GetAllDeactivated();
        void IssueTicket(int id);
    }
}