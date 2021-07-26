IF db_id('MonsterHotel') IS NULL
  CREATE DATABASE MonsterHotel
GO

USE [MonsterHotel]
GO


DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [Ticket];
DROP TABLE IF EXISTS [TicketType];
DROP TABLE IF EXISTS [TicketStatus];
DROP TABLE IF EXISTS [Rooms];
DROP TABLE IF EXISTS [Stay];
GO 

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY,
  [FireBaseId] NVARCHAR(28) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [ImageLocation] nvarchar(255),
  [UserTypeId] integer NOT NULL,
  [DateCreated] datetime NOT NULL,
  [IsCheckedIn] BIT NOT NULL DEFAULT 0,
  [IsActive] BIT NOT NULL DEFAULT 1,
)
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY,
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Ticket] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY,
  [TicketTypeId] integer NOT NULL,
  [Title] nvarchar(50) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255),
  [CreateDateTime] datetime NOT NULL,
  [UserProfileId] integer NOT NULL,
  [TicketStatusId] integer NOT NULL,
  [IsActive] BIT NOT NULL DEFAULT 0,
)
GO

CREATE TABLE [TicketType] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY,
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [TicketStatus] (
  [Id] INTEGER PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Rooms] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY,
  [Floor] integer NOT NULL,
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Stay] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY,
  [GuestId] integer NOT NULL,
  [HandlerId] integer NOT NULL,
  [RoomId] integer NOT NULL,
  [CheckInTime] datetime NOT NULL,
  [CheckOutTime] datetime NOT NULL,
  [IsCheckedIn] BIT NOT NULL DEFAULT 0,
  [IsActive] BIT NOT NULL DEFAULT 1,
)
GO

ALTER TABLE [Stay] ADD FOREIGN KEY ([RoomId]) REFERENCES [Rooms] ([Id])
GO

ALTER TABLE [Stay] ADD FOREIGN KEY ([GuestId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Stay] ADD FOREIGN KEY ([HandlerId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [Ticket] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Ticket] ADD FOREIGN KEY ([TicketStatusId]) REFERENCES [TicketStatus] ([Id])
GO

ALTER TABLE [Ticket] ADD FOREIGN KEY ([TicketTypeId]) REFERENCES [TicketType] ([Id])
GO
