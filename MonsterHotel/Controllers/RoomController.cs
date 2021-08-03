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
    public class RoomController : ControllerBase
    {
        private readonly IRoomRepository _roomRepository;
        public RoomController(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_roomRepository.GetAll());
        }
    }
}
