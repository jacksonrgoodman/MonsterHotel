using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MonsterHotel.Models;
using MonsterHotel.Utils;

namespace MonsterHotel.Repositories
{
    public class TicketTypeRepository : BaseRepository, ITicketTypeRepository
    {
        public TicketTypeRepository(IConfiguration configuration) : base(configuration) { }
        public List<TicketType> GetAll()
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
FROM TicketType;
            ";

                    var reader = cmd.ExecuteReader();

                    var ticketTypes = new List<TicketType>();
                    while (reader.Read())
                    {
                        ticketTypes.Add(new TicketType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),

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
