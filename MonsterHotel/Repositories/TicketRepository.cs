using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MonsterHotel.Models;
using MonsterHotel.Utils;

namespace MonsterHotel.Repositories
{
    public class TicketRepository : BaseRepository, ITicketRepository
    {
        public TicketRepository(IConfiguration configuration) : base(configuration) { }

        public List<Ticket> GetAll()
        {
            using (var conn = Connection)
            {

                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT 
	                    t.Id,
	                    t.TicketTypeId,
	                    tt.Name AS TicketType,
	                    t.Title,
	                    t.Description,
	                    t.ImageUrl,
	                    t.CreateDateTime,
	                    t.UserProfileId AS GuestId,
	                    up.DisplayName AS Guest,
	                    t.TicketStatusId,
	                    ts.Name AS TicketStatus,
	                    t.IsActive
                    FROM Ticket t
                    JOIN TicketType tt ON t.TicketTypeId = tt.Id
                    JOIN TicketStatus ts ON t.TicketStatusId = ts.Id
                    JOIN UserProfile up ON t.UserProfileId = up.Id
                    WHERE up.IsActive = 0
                    ORDER BY t.CreateDateTime
                    ";

                    var reader = cmd.ExecuteReader();

                    var tickets = new List<Ticket>();
                    while (reader.Read())
                    {
                        tickets.Add(new Ticket()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "GuestId"),
                            Guest = new Guest()
                            {
                                Id = DbUtils.GetInt(reader, "GuestId"),
                                DisplayName = DbUtils.GetString(reader, "Guest")
                            },
                            TicketTypeId = DbUtils.GetInt(reader, "TicketTypeId"),
                            TicketType = new TicketType()
                            {
                                Id = DbUtils.GetInt(reader, "TicketTypeId"),
                                Name = DbUtils.GetString(reader, "TicketType")
                            },
                            TicketStatusId = DbUtils.GetInt(reader, "TicketStatusId"),
                            TicketStatus = new TicketStatus()
                            {
                                Id = DbUtils.GetInt(reader, "TicketStatusId"),
                                Name = DbUtils.GetString(reader, "TicketStatus")
                            }
                        });
                    }
                    reader.Close();

                    return tickets;
                }
            }
        }
    }
}
