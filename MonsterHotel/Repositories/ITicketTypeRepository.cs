﻿using MonsterHotel.Models;
using System.Collections.Generic;

namespace MonsterHotel.Repositories
{
    public interface ITicketTypeRepository
    {
        List<TicketType> GetAll();
    }
}