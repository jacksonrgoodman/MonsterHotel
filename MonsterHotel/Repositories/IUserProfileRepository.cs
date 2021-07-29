using MonsterHotel.Models;
using System.Collections.Generic;

namespace MonsterHotel.Repositories
{
    public interface IUserProfileRepository
    {
        void Activate(int id);
        void CheckIn(int id);
        void CheckOut(int id);
        void Add(UserProfile userProfile);
        void Deactivate(int id);
        List<UserProfile> GetAll();
        List<UserProfile> GetAllGuests();
        List<UserProfile> GetAllCheckedIn();
        List<UserProfile> GetAllCheckedOut();
        List<UserProfile> GetAllDeactivated();
        UserProfile GetByFireBaseId(string firebaseUserId);
        UserProfile GetById(int id);
        void MakeAdmin(int id);
        void MakeGuest(int id);
    }
}