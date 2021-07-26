USE [MonsterHotel];
GO

set identity_insert [UserType] on
insert into [UserType] ([Id], [Name]) VALUES (1, 'Admin'), (2, 'Guest');
set identity_insert [UserType] off

set identity_insert [Ticket] on
insert into [Ticket] ([Id], [TicketTypeId],[Title], [Description], [ImageUrl], [CreateDateTime], [UserProfileId], [TicketStatusId], [IsActive]) 
VALUES ( 1, 1, 'Need Help','I Need a blood bag!', '', '2020-04-12', 2, 1, 0),
 ( 2, 3, 'Sink','There is a leak in my sink!', '', '2020-04-12', 3, 1, 0),
 ( 3, 4, 'Atmosphere Issue','Where is the tunes?', '', '2020-04-12', 3, 1, 0)
 ;
set identity_insert [Ticket] off

set identity_insert [TicketType] on
insert into [TicketType] ([Id], [Name]) VALUES (1, 'Food'), (2, 'Bill'), (3, 'Maintenance'), (4, 'Concierge'), (5, 'Parking'), (6, 'Security');
set identity_insert [TicketType] off

set identity_insert [TicketStatus] on
insert into [TicketStatus] ([Id], [Name]) 
values (1, 'Open'), (2, 'Claimed'), (3, 'Issue'), (4, 'Waiting'), (5, 'Closed');
set identity_insert [TicketStatus] off

set identity_insert [Rooms] on
insert into [Rooms] ([Id], [Floor],[Name])
values (1, 1, 'A'), (2, 1, 'B'), (3, 1, 'C'), (4, 1, 'D'),
 (5, 2, 'A'), (6, 2, 'B'), (7, 2, 'C'), (8, 2, 'D'),
 (9, 3, 'A'), (10, 3, 'B'), (11, 3, 'C'), (12, 3, 'D'),
 (13, 4, 'A'), (14, 4, 'B'), (15, 4, 'C'), (16, 4, 'D')
;
set identity_insert [Rooms] off

set identity_insert [Stay] on
insert into [Stay] ([Id], [GuestId], [HandlerId], [RoomId], [CheckInTime], [CheckOutTime], [IsCheckedIn], [IsActive]) 
VALUES ( 1, 2, 1, 11, '2020-08-06', '', 1, 0),
( 2, 3, 1, 8, '2020-08-07', '', 1, 0),
( 3, 4, 1, 6, '2020-08-03', '', 1, 0)
;
set identity_insert [Stay] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, DateCreated, ImageLocation, UserTypeId, FireBaseId, IsCheckedIn, IsActive) values (1, 'Foo', 'Foo', 'Barington', 'foo@bar.com', '2020-04-23', 'https://robohash.org/numquamutut.png?size=150x150&set=set2', 1, '3qmM15UvKRW1p7EoEpphpp8dRLs1', 0, 0);
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, DateCreated, ImageLocation, UserTypeId, FireBaseId, IsCheckedIn, IsActive) values (2, 'vlad_impaler', 'Vlad', 'Impaler', 'rvlad_impaler48@vampire.com.brx', '2020-04-23', 'https://robohash.org/numquamutut.png?size=150x150&set=set2', 2, 'qp2yqgdlVJNJPzMoomHRZpUpXnV2', 1, 0);
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, DateCreated, ImageLocation, UserTypeId, FireBaseId, IsCheckedIn, IsActive) values (3, 'Post-Modern', 'Frank', 'Stein', 'prometheus@timesonline.co.ukx', '2020-04-20', 'https://robohash.org/nisiautemet.png?size=150x150&set=set2', 2, 'wzpGclgNgaUjmBuZdnhoYpYt5yb2', 1, 0);
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, DateCreated, ImageLocation, UserTypeId, FireBaseId, IsCheckedIn, IsActive) values (4, 'cairoCruise', 'Cleo', 'Patra', 'cairocruise2@ow.lyx', '2020-01-13', 'https://robohash.org/molestiaemagnamet.png?size=150x150&set=set2', 2, 'SnJxLe4IFjQVxpn3q4llLGOnk572', 1, 0);
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, DateCreated, ImageLocation, UserTypeId, FireBaseId, IsCheckedIn, IsActive) values (5, '_webby', 'Webby', 'Spyder', 'web@monster.hotel.brx', '2020-04-23', 'https://robohash.org/numquamutut.png?size=150x150&set=set2', 1, 'NklbCZTB0vXGeL1hIZFVKZsurHj2', 0, 0);
set identity_insert [UserProfile] off
