using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MonsterHotel.Models;
using MonsterHotel.Utils;

namespace MonsterHotel.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT up.Id, Up.FireBaseId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.DateCreated, up.ImageLocation, up.IsActive, up.IsCheckedIn, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                            WHERE up.IsActive = 1
                            ORDER BY up.DisplayName
            ";

                    var reader = cmd.ExecuteReader();

                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfiles.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        });
                    }

                    reader.Close();

                    return userProfiles;
                }
            }
        }

        public List<UserProfile> GetAllGuests()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT up.Id, Up.FireBaseId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.DateCreated, up.ImageLocation, up.IsActive, up.IsCheckedIn, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                            WHERE up.UserTypeId = 2 AND up.IsActive = 1
                            ORDER BY up.DisplayName
            ";

                    var reader = cmd.ExecuteReader();

                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfiles.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        });
                    }

                    reader.Close();

                    return userProfiles;
                }
            }
        }

        public List<UserProfile> GetAllDeactivated()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT up.Id, Up.FireBaseId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.DateCreated, up.ImageLocation, up.IsActive, up.IsCheckedIn, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                            WHERE up.IsActive = 0
                            ORDER BY up.DisplayName
            ";

                    var reader = cmd.ExecuteReader();

                    var videos = new List<UserProfile>();
                    while (reader.Read())
                    {
                        videos.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        });
                    }

                    reader.Close();

                    return videos;
                }
            }
        }

        public List<UserProfile> GetAllCheckedIn()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT up.Id, Up.FireBaseId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.DateCreated, up.ImageLocation, up.IsActive, up.IsCheckedIn, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                            WHERE up.IsCheckedIn = 1
                            ORDER BY up.DisplayName
            ";

                    var reader = cmd.ExecuteReader();

                    var videos = new List<UserProfile>();
                    while (reader.Read())
                    {
                        videos.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        });
                    }

                    reader.Close();

                    return videos;
                }
            }
        }

        public List<UserProfile> GetAllCheckedOut()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT up.Id, Up.FireBaseId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.DateCreated, up.ImageLocation, up.IsActive, up.IsCheckedIn, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                            WHERE up.IsCheckedIn = 0
                            ORDER BY up.DisplayName
            ";

                    var reader = cmd.ExecuteReader();

                    var videos = new List<UserProfile>();
                    while (reader.Read())
                    {
                        videos.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        });
                    }

                    reader.Close();

                    return videos;
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FireBaseId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.DateCreated, up.ImageLocation, up.IsActive, up.IsCheckedIn, up.UserTypeId,
                               up.IsActive, up.IsCheckedIn,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE up.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }
        public UserProfile GetByFireBaseId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FireBaseId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.DateCreated, up.ImageLocation, up.IsActive, up.IsCheckedIn, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE FireBaseId = @FireBaseId";

                    DbUtils.AddParameter(cmd, "@FireBaseId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            IsCheckedIn = DbUtils.GetBool(reader, "IsCheckedIn"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FireBaseId, FirstName, LastName, DisplayName, 
                                                                 Email, DateCreated, ImageLocation, up.IsActive, up.IsCheckedIn, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FireBaseId, @FirstName, @LastName, @DisplayName, 
                                                @Email, @DateCreated, @ImageLocation, @IsActive, @IsCheckedIn, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FireBaseId", userProfile.FireBaseId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@IsActive", userProfile.IsActive);
                    DbUtils.AddParameter(cmd, "@IsCheckedIn", userProfile.IsCheckedIn);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = @"UPDATE UserProfile SET IsActive=@IsActive WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@IsActive", 1);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void CheckIn(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile SET IsCheckedIn=@IsCheckedIn WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@IsCheckedIn", 1);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void CheckOut(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile SET IsCheckedIn=@IsCheckedIn WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@IsCheckedIn", 0);
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
                    cmd.CommandText = @"UPDATE UserProfile SET IsActive=@IsActive WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@IsActive", 0);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void MakeAdmin(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile SET UserTypeId=@UserTypeId WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@UserTypeId", 1);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void MakeGuest(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile SET UserTypeId=@UserTypeId WHERE Id=@Id";
                    cmd.Parameters.AddWithValue("@UserTypeId", 2);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        /*
        public UserProfile GetByFireBaseId(string firebaseUserId)
        {
            return _context.UserProfile
                       .Include(up => up.UserType) 
                       .FirstOrDefault(up => up.FireBaseId == firebaseUserId);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
        */
    }
}
