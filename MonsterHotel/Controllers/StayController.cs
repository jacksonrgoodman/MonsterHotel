using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonsterHotel.Models;
using MonsterHotel.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace MonsterHotel.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StayController : ControllerBase
    {
        private readonly IStayRepository _stayRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public StayController(IStayRepository stayRepository, IUserProfileRepository userProfileRepository)
        {
            _stayRepository = stayRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_stayRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var stay = _stayRepository.GetById(id);
            if (stay == null)
            {
                return NotFound();
            }
            return Ok(stay);
        }
        [HttpGet("Room/{id}")]
        public IActionResult GetByRoomId(int id)
        {
            var currentUser = GetCurrentUserProfile();
            var stay = _stayRepository.GetByRoomId(id);
            if (stay == null)
            {
                return NotFound();
            }
            return Ok(stay);
        }
        [HttpGet("Guest/{id}")]
        public IActionResult GetByUser(int id)
        {
            var stay = _stayRepository.GetByGuestId(id);
            if (stay == null)
            {
                return NotFound();
            }
            return Ok(stay);
        }
        [HttpGet("Handler/{id}")]
        public IActionResult GetByAdmin(int id)
        {
            var stay = _stayRepository.GetByHandlerId(id);
            if (stay == null)
            {
                return NotFound();
            }
            return Ok(stay);
        }
        [HttpGet("Deactivated")]
        public IActionResult GetAllDeactivated()
        {
            return Ok(_stayRepository.GetAllDeactivated());
        }
        [HttpGet("CurrentStays")]
        public IActionResult GetAllCheckedIn()
        {
            return Ok(_stayRepository.GetAllCheckedIn());
        }
        [HttpDelete("Delete/{id}")]
        public IActionResult Deactivate(int id)
        {
            _stayRepository.Deactivate(id);
            return NoContent();
        }
        [HttpPut("Activate/{id}")]
        public IActionResult Activate(int id)
        {
            _stayRepository.Activate(id);
            return NoContent();
        }
        [HttpPost]
        public IActionResult Add(Stay stay)
        {
            var currentUser = GetCurrentUserProfile();
            //if (currentUser.UserType.Name != "admin")
            //{
            //    return Unauthorized();
            //}
            //stay.CheckInTime = DateTime.Now;
            //stay.PublishDateTime = DateTime.Now;
            stay.HandlerId = currentUser.Id;
            //stay.IsActive = true;
            _stayRepository.Add(stay);
            return CreatedAtAction(nameof(Get), new { id = stay.Id }, stay);
        }
        [HttpPut("CheckIn/{id}")]
        public IActionResult CheckIn(int id)
        {
            //var currentUser = GetCurrentUserProfile();
            //if (currentUser.UserType.Name != "guest")
            //{
            //    return Unauthorized();
            //}
            //stay.CheckInTime = DateTime.Now;
            ////stay.PublishDateTime = DateTime.Now;
            //stay.GuestId = currentUser.Id;
            //stay.IsCheckedIn = true;
            _stayRepository.CheckIn(id);
            return NoContent();
        }
        [HttpPut("CheckOut/{id}")]
        public IActionResult CheckOut(int id)
        {
            var currentUser = GetCurrentUserProfile();
            //if (currentUser.UserType.Name != "guest")
            //{
            //    return Unauthorized();
            //}
            //stay.CheckOutTime = DateTime.Now;
            //stay.PublishDateTime = DateTime.Now;
            //stay.GuestId = currentUser.Id;
            //stay.IsActive = false;
            //stay.IsCheckedIn = false;
            _stayRepository.CheckOut(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFireBaseId(firebaseUserId);
        }
    }
}
