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
                    WHERE t.IsActive = 1
                    AND t.TicketStatusId != 3
                    ORDER BY t.CreateDateTime
                    ";

                    var reader = cmd.ExecuteReader();

                    var tickets = new List<Ticket>();
                    while (reader.Read())
                    {
                        tickets.Add(new Ticket()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
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
        public List<Ticket> GetAllIssueTickets()
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
                    WHERE t.TicketStatusId = 3
                    ORDER BY t.CreateDateTime
                    ";

                    var reader = cmd.ExecuteReader();

                    var tickets = new List<Ticket>();
                    while (reader.Read())
                    {
                        tickets.Add(new Ticket()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
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
        public List<Ticket> GetAllDeactivated()
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
                    WHERE t.IsActive = 0
                    ORDER BY t.CreateDateTime
            ";

                    var reader = cmd.ExecuteReader();

                    var videos = new List<Ticket>();
                    while (reader.Read())
                    {
                        videos.Add(new Ticket()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
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

                    return videos;
                }
            }
        }
        public List<Ticket> GetAllActiveByUserId(int id)
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
                    WHERE t.UserProfileId = @id 
                    AND t.IsActive = 1
                    ORDER BY t.CreateDateTime
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var tickets = new List<Ticket>();
                    while (reader.Read())
                    {
                        tickets.Add(new Ticket()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
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
        public List<Ticket> GetAllDeactivatedByUserId(int id)
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
                    WHERE t.UserProfileId = @id 
                    AND t.IsActive = 0
                    ORDER BY t.CreateDateTime
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var tickets = new List<Ticket>();
                    while (reader.Read())
                    {
                        tickets.Add(new Ticket()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
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
        public Ticket GetById(int id)
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
                    WHERE t.Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Ticket ticket = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        ticket = new Ticket()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
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
                        };
                    }
                    reader.Close();

                    return ticket;
                }
            }
        }
        public void Add(Ticket ticket)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO Ticket(
                                                    TicketTypeId, 
                                                    Title, 
                                                    Description,
                                                    ImageUrl,
                                                    CreateDateTime,
                                                    UserProfileId,
                                                    TicketStatusId, 
                                                    IsActive
                                                    )
                                                    OUTPUT INSERTED.ID
                                                    VALUES(@ticketTypeId, @title, 
                                                            @description, @imageUrl, @createDateTime, @userProfileId,
                                                            @ticketStatusId, @isActive) 
                                                            ;";
                    DbUtils.AddParameter(cmd, "@ticketTypeId", ticket.TicketTypeId);
                    DbUtils.AddParameter(cmd, "@title", ticket.Title);
                    DbUtils.AddParameter(cmd, "@description", ticket.Description);
                    DbUtils.AddParameter(cmd, "@imageUrl", ticket.ImageUrl);
                    DbUtils.AddParameter(cmd, "@createDateTime", ticket.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@userProfileId", ticket.UserProfileId);
                    DbUtils.AddParameter(cmd, "@ticketStatusId", ticket.TicketStatusId);
                    DbUtils.AddParameter(cmd, "@isActive", ticket.IsActive);


                    ticket.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Activate(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Ticket SET IsActive=@IsActive WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@IsActive", 1);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void IssueTicket(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Ticket SET TicketStatusId=@TicketStatusId WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@TicketStatusId", 3);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Open(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Ticket SET TicketStatusId=@TicketStatusId WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@TicketStatusId", 1);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Close(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Ticket SET TicketStatusId=@TicketStatusId WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@TicketStatusId", 5);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Deactivate(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Ticket SET IsActive=@IsActive WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@IsActive", 0);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
