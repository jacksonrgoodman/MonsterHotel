using MonsterHotel.Models;
using System.Collections.Generic;

namespace MonsterHotel.Repositories
{
    public interface IStayRepository
    {
        List<Stay> GetAll();
        Stay GetById(int id);
        Stay GetByRoomId(int id);
        Stay GetByGuestId(int id);
        void Add(Stay stay);
        void CheckIn(int id);
        void CheckOut(int id);
        void Activate(int id);
        void Deactivate(int id);
        List<Stay> GetAllDeactivated();
        List<Stay> GetByHandlerId(int id);
        List<Stay> GetAllCheckedIn();
    }
}