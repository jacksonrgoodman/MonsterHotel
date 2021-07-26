IF db_id('MonsterHotel') IS NULL
  CREATE DATABASE MonsterHotel
GO

USE [MonsterHotel]
GO


DROP TABLE IF EXISTS [UserProfile]; --!
DROP TABLE IF EXISTS [UserType]; --*
DROP TABLE IF EXISTS [Ticket]; --*
DROP TABLE IF EXISTS [TicketType]; --*
DROP TABLE IF EXISTS [TicketStatus]; --*
DROP TABLE IF EXISTS [Rooms]; --*
DROP TABLE IF EXISTS [Stay]; --*
GO 
CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY,
  [FireBaseId] nvarchar(255),
  [DisplayName] nvarchar(255),
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [Email] nvarchar(255),
  [ImageLocation] nvarchar(255),
  [UserTypeId] int,
  [DateCreated] datetime,
  [IsCheckedIn] bool,
  [IsActive] bool
)
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [Ticket] (
  [Id] int PRIMARY KEY,
  [TicketTypeId] int,
  [Title] nvarchar(255),
  [Description] VARCHAR,
  [ImageUrl] nvarchar(255),
  [CreateDateTime] datetime,
  [UserProfileId] int,
  [TicketStatusId] int,
  [IsActive] bool
)
GO

CREATE TABLE [TicketType] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [TicketStatus] (
  [Id] INTEGER PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Message] VARCHAR
)
GO

CREATE TABLE [Rooms] (
  [Id] int PRIMARY KEY,
  [Floor] int,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [Stay] (
  [Id] int PRIMARY KEY,
  [GuestId] int,
  [HandlerId] int,
  [RoomId] int,
  [CheckInTime] datetime,
  [CheckOutTime] datetime,
  [IsCheckedIn] bool,
  [IsActive] bool
)
GO

ALTER TABLE [Rooms] ADD FOREIGN KEY ([Id]) REFERENCES [Stay] ([RoomId])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([Id]) REFERENCES [Stay] ([GuestId])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([Id]) REFERENCES [Stay] ([HandlerId])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([Id]) REFERENCES [Ticket] ([UserProfileId])
GO

ALTER TABLE [TicketStatus] ADD FOREIGN KEY ([Id]) REFERENCES [Ticket] ([TicketStatusId])
GO

ALTER TABLE [Ticket] ADD FOREIGN KEY ([TicketTypeId]) REFERENCES [TicketType] ([Id])
GO
