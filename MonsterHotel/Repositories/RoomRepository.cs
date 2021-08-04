using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MonsterHotel.Models;
using MonsterHotel.Utils;

namespace MonsterHotel.Repositories
{
    public class RoomRepository : BaseRepository, IRoomRepository
    {
        public RoomRepository(IConfiguration configuration) : base(configuration) { }
        public List<Rooms> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT 
Id,
[Floor],
[Name]
FROM Rooms;
            ";

                    var reader = cmd.ExecuteReader();

                    var ticketTypes = new List<Rooms>();
                    while (reader.Read())
                    {
                        ticketTypes.Add(new Rooms()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Floor = DbUtils.GetInt(reader, "Floor"),
                            Name = DbUtils.GetString(reader, "Name")

                        });
                    }

                    reader.Close();

                    return ticketTypes;
                }
            }
        }
    }
}
