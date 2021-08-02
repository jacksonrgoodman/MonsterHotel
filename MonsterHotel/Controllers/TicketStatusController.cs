using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonsterHotel.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonsterHotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketTypeController : ControllerBase
    {
        private readonly ITicketTypeRepository _ticketTypeRepository;
        public TicketTypeController(ITicketTypeRepository ticketTypeRepository)
        {
            _ticketTypeRepository = ticketTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ticketTypeRepository.GetAll());
        }
    }
}
