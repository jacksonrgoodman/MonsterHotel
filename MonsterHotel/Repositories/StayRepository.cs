using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MonsterHotel.Models;
using MonsterHotel.Utils;

namespace MonsterHotel.Repositories
{
    public class StayRepository : BaseRepository, IStayRepository
    {
        public StayRepository(IConfiguration configuration) : base(configuration) { }

        public List<Stay> GetAll()
        {
            using (var conn = Connection)
            {

                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT
                        s.Id,
                        s.GuestId,
                        g.DisplayName AS Guest,
                        s.HandlerId,
                        h.DisplayName AS Handler,
                        r.Floor AS FloorNumber,
                        r.Name AS Room,
                        s.RoomId,
                        s.CheckInTime,
                        s.CheckOutTime,
                        s.IsCheckedIn,
                        s.IsActive
                    FROM Stay s
                    JOIN UserProfile g ON s.GuestId = g.Id
                    JOIN UserProfile h ON s.HandlerId = h.Id
                    JOIN Rooms r ON s.RoomId = r.Id
                    WHERE s.IsActive = 1
                    ORDER BY s.CheckInTime;
                    ";

                    var reader = cmd.ExecuteReader();

                    var stays = new List<Stay>();
                    while (reader.Read())
                    {
                        stays.Add(new Stay()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            GuestId = DbUtils.GetInt(reader, "GuestId"),
                            Guest = new Guest()
                            {
                                Id = DbUtils.GetInt(reader, "GuestId"),
                                DisplayName = DbUtils.GetString(reader, "Guest")
                            },
                            HandlerId = DbUtils.GetInt(reader, "HandlerId"),
                            Handler = new Handler()
                            {
                                Id = DbUtils.GetInt(reader, "HandlerId"),
                                DisplayName = DbUtils.GetString(reader, "Handler")
                            },
                            RoomId = DbUtils.GetInt(reader, "RoomId"),
                            Room = new Rooms()
                            {
                                Id = DbUtils.GetInt(reader, "RoomId"),
                                Floor = DbUtils.GetInt(reader, "FloorNumber"),
                                Name = DbUtils.GetString(reader, "Room")
                            }
                        });
                    }
                    reader.Close();

                    return stays;
                }
            }
        }
        public List<Stay> GetAllDeactivated()
        {
            using (var conn = Connection)
            {

                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT
                        s.Id,
                        s.GuestId,
                        g.DisplayName AS Guest,
                        s.HandlerId,
                        h.DisplayName AS Handler,
                        r.Floor AS FloorNumber,
                        r.Name AS Room,
                        s.RoomId,
                        s.CheckInTime,
                        s.CheckOutTime,
                        s.IsCheckedIn,
                        s.IsActive
                    FROM Stay s
                    JOIN UserProfile g ON s.GuestId = g.Id
                    JOIN UserProfile h ON s.HandlerId = h.Id
                    JOIN Rooms r ON s.RoomId = r.Id
                    WHERE s.IsActive = 0
                    ORDER BY s.CheckInTime;
                    ";

                    var reader = cmd.ExecuteReader();

                    var stays = new List<Stay>();
                    while (reader.Read())
                    {
                        stays.Add(new Stay()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            GuestId = DbUtils.GetInt(reader, "GuestId"),
                            Guest = new Guest()
                            {
                                Id = DbUtils.GetInt(reader, "GuestId"),
                                DisplayName = DbUtils.GetString(reader, "Guest")
                            },
                            HandlerId = DbUtils.GetInt(reader, "HandlerId"),
                            Handler = new Handler()
                            {
                                Id = DbUtils.GetInt(reader, "HandlerId"),
                                DisplayName = DbUtils.GetString(reader, "Handler")
                            },
                            RoomId = DbUtils.GetInt(reader, "RoomId"),
                            Room = new Rooms()
                            {
                                Id = DbUtils.GetInt(reader, "RoomId"),
                                Floor = DbUtils.GetInt(reader, "FloorNumber"),
                                Name = DbUtils.GetString(reader, "Room")
                            }
                        });
                    }
                    reader.Close();

                    return stays;
                }
            }
        }

        public List<Stay> GetAllCheckedIn()
        {
            using (var conn = Connection)
            {

                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT
                        s.Id,
                        s.GuestId,
                        g.DisplayName AS Guest,
                        s.HandlerId,
                        h.DisplayName AS Handler,
                        r.Floor AS FloorNumber,
                        r.Name AS Room,
                        s.RoomId,
                        s.CheckInTime,
                        s.CheckOutTime,
                        s.IsCheckedIn,
                        s.IsActive
                    FROM Stay s
                    JOIN UserProfile g ON s.GuestId = g.Id
                    JOIN UserProfile h ON s.HandlerId = h.Id
                    JOIN Rooms r ON s.RoomId = r.Id
                    WHERE s.IsCheckedIn = 1
                    ORDER BY s.CheckInTime;
                    ";

                    var reader = cmd.ExecuteReader();

                    var stays = new List<Stay>();
                    while (reader.Read())
                    {
                        stays.Add(new Stay()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            GuestId = DbUtils.GetInt(reader, "GuestId"),
                            Guest = new Guest()
                            {
                                Id = DbUtils.GetInt(reader, "GuestId"),
                                DisplayName = DbUtils.GetString(reader, "Guest")
                            },
                            HandlerId = DbUtils.GetInt(reader, "HandlerId"),
                            Handler = new Handler()
                            {
                                Id = DbUtils.GetInt(reader, "HandlerId"),
                                DisplayName = DbUtils.GetString(reader, "Handler")
                            },
                            RoomId = DbUtils.GetInt(reader, "RoomId"),
                            Room = new Rooms()
                            {
                                Id = DbUtils.GetInt(reader, "RoomId"),
                                Floor = DbUtils.GetInt(reader, "FloorNumber"),
                                Name = DbUtils.GetString(reader, "Room")
                            }
                        });
                    }
                    reader.Close();

                    return stays;
                }
            }
        }

        public Stay GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                        s.Id,
                        s.GuestId,
                        g.DisplayName AS Guest,
                        s.HandlerId,
                        h.DisplayName AS Handler,
                        r.Floor AS FloorNumber,
                        r.Name AS Room,
                        s.RoomId,
                        s.CheckInTime,
                        s.CheckOutTime,
                        s.IsCheckedIn,
                        s.IsActive
                    FROM Stay s
                    JOIN UserProfile g ON s.GuestId = g.Id
                    JOIN UserProfile h ON s.HandlerId = h.Id
                    JOIN Rooms r ON s.RoomId = r.Id
                    WHERE s.Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Stay stay = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        stay = new Stay()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            GuestId = DbUtils.GetInt(reader, "GuestId"),
                            Guest = new Guest()
                            {
                                Id = DbUtils.GetInt(reader, "GuestId"),
                                DisplayName = DbUtils.GetString(reader, "Guest")
                            },
                            HandlerId = DbUtils.GetInt(reader, "HandlerId"),
                            Handler = new Handler()
                            {
                                Id = DbUtils.GetInt(reader, "HandlerId"),
                                DisplayName = DbUtils.GetString(reader, "Handler")
                            },
                            RoomId = DbUtils.GetInt(reader, "RoomId"),
                            Room = new Rooms()
                            {
                                Id = DbUtils.GetInt(reader, "RoomId"),
                                Floor = DbUtils.GetInt(reader, "FloorNumber"),
                                Name = DbUtils.GetString(reader, "Room")
                            }
                        };
                    }
                    reader.Close();

                    return stay;
                }
            }
        }
        public Stay GetByGuestId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                        s.Id,
                        s.GuestId,
                        g.DisplayName AS Guest,
                        s.HandlerId,
                        h.DisplayName AS Handler,
                        r.Floor AS FloorNumber,
                        r.Name AS Room,
                        s.RoomId,
                        s.CheckInTime,
                        s.CheckOutTime,
                        s.IsCheckedIn,
                        s.IsActive
                    FROM Stay s
                    JOIN UserProfile g ON s.GuestId = g.Id
                    JOIN UserProfile h ON s.HandlerId = h.Id
                    JOIN Rooms r ON s.RoomId = r.Id
                    WHERE s.GuestId = @id AND s.IsCheckedIn = 1
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Stay stay = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        stay = new Stay()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            GuestId = DbUtils.GetInt(reader, "GuestId"),
                            Guest = new Guest()
                            {
                                Id = DbUtils.GetInt(reader, "GuestId"),
                                DisplayName = DbUtils.GetString(reader, "Guest")
                            },
                            HandlerId = DbUtils.GetInt(reader, "HandlerId"),
                            Handler = new Handler()
                            {
                                Id = DbUtils.GetInt(reader, "HandlerId"),
                                DisplayName = DbUtils.GetString(reader, "Handler")
                            },
                            RoomId = DbUtils.GetInt(reader, "RoomId"),
                            Room = new Rooms()
                            {
                                Id = DbUtils.GetInt(reader, "RoomId"),
                                Floor = DbUtils.GetInt(reader, "FloorNumber"),
                                Name = DbUtils.GetString(reader, "Room")
                            }
                        };
                    }
                    reader.Close();

                    return stay;
                }
            }
        }
        public List<Stay> GetByHandlerId(int id)
        {
            using (var conn = Connection)
            {

                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT
                        s.Id,
                        s.GuestId,
                        g.DisplayName AS Guest,
                        s.HandlerId,
                        h.DisplayName AS Handler,
                        r.Floor AS FloorNumber,
                        r.Name AS Room,
                        s.RoomId,
                        s.CheckInTime,
                        s.CheckOutTime,
                        s.IsCheckedIn,
                        s.IsActive
                    FROM Stay s
                    JOIN UserProfile g ON s.GuestId = g.Id
                    JOIN UserProfile h ON s.HandlerId = h.Id
                    JOIN Rooms r ON s.RoomId = r.Id
                    WHERE s.HandlerId = @id AND s.IsActive = 1
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var stays = new List<Stay>();
                    while (reader.Read())
                    {
                        stays.Add(new Stay()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            GuestId = DbUtils.GetInt(reader, "GuestId"),
                            Guest = new Guest()
                            {
                                Id = DbUtils.GetInt(reader, "GuestId"),
                                DisplayName = DbUtils.GetString(reader, "Guest")
                            },
                            HandlerId = DbUtils.GetInt(reader, "HandlerId"),
                            Handler = new Handler()
                            {
                                Id = DbUtils.GetInt(reader, "HandlerId"),
                                DisplayName = DbUtils.GetString(reader, "Handler")
                            },
                            RoomId = DbUtils.GetInt(reader, "RoomId"),
                            Room = new Rooms()
                            {
                                Id = DbUtils.GetInt(reader, "RoomId"),
                                Floor = DbUtils.GetInt(reader, "FloorNumber"),
                                Name = DbUtils.GetString(reader, "Room")
                            }
                        });
                    }
                    reader.Close();

                    return stays;
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
                    cmd.CommandText = @"UPDATE Stay SET IsActive=@IsActive WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@IsActive", 1);
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
                    cmd.CommandText = @"UPDATE Stay SET IsActive=@IsActive WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@IsActive", 0);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Add(Stay stay)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Stay(
                                                    GuestId, 
                                                    HandlerId, 
                                                    RoomId, 
                                                    CheckInTime,
                                                    CheckOutTime,
                                                    IsCheckedIn, 
                                                    IsActive,
                                                    IsApproved)
                                                    OUTPUT INSERTED.ID
                                                    VALUES(@guestId, @handlerId, 
                                                            @roomId, @checkInTime, @checkOutTime,
                                                            @isCheckedIn, @isActive 
                                                            ;";
                    DbUtils.AddParameter(cmd, "@guestId", stay.GuestId);
                    DbUtils.AddParameter(cmd, "@handlerId", stay.HandlerId);
                    DbUtils.AddParameter(cmd, "@roomId", stay.RoomId);
                    DbUtils.AddParameter(cmd, "@checkInTime", stay.CheckInTime);
                    DbUtils.AddParameter(cmd, "@checkOutTime", stay.CheckOutTime);
                    DbUtils.AddParameter(cmd, "@isCheckedIn", stay.IsCheckedIn);
                    DbUtils.AddParameter(cmd, "@isActive", stay.IsActive);
                    

                    stay.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void CheckIn(Stay stay)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Stay SET IsCheckedIn=@IsCheckedIn, CheckInTime=@CheckInTime WHERE Id=@Id";
                    DbUtils.AddParameter(cmd, "@IsCheckedIn", 1);
                    DbUtils.AddParameter(cmd, "@CheckInTime", stay.CheckInTime);
                    cmd.Parameters.AddWithValue("@Id", stay.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void CheckOut(Stay stay)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Stay SET IsCheckedIn=@IsCheckedIn, CheckInTime=@CheckInTime WHERE Id=@Id";
                    DbUtils.AddParameter(cmd, "@IsCheckedIn", 0);
                    DbUtils.AddParameter(cmd, "@CheckOutTime", stay.CheckOutTime);
                    cmd.Parameters.AddWithValue("@Id", stay.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        //? WOW
    }
}
