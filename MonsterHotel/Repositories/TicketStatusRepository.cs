using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MonsterHotel.Models;
using MonsterHotel.Utils;

namespace MonsterHotel.Repositories
{
    public class TicketStatusRepository : BaseRepository, ITicketStatusRepository
    {
        public TicketStatusRepository(IConfiguration configuration) : base(configuration) { }
        public List<TicketStatus> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT 
Id,
[Name]
FROM TicketStatus;
            ";

                    var reader = cmd.ExecuteReader();

                    var ticketStatus = new List<TicketStatus>();
                    while (reader.Read())
                    {
                        ticketStatus.Add(new TicketStatus()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),

                            Name = DbUtils.GetString(reader, "Name")

                        });
                    }

                    reader.Close();

                    return ticketStatus;
                }
            }
        }
    }
}
