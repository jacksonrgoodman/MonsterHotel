using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MonsterHotel.Models;
using MonsterHotel.Repositories;

namespace MonsterHotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }
        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.DateCreated = DateTime.Now;
            userProfile.UserTypeId = UserType.GUEST_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId),
                new { firebaseUserId = userProfile.FireBaseId },
                userProfile);
        }
        [HttpGet("CheckedIn")]
        public IActionResult GetAllCheckedIn()
        {
            return Ok(_userProfileRepository.GetAllCheckedIn());
        }
        [HttpGet("CheckedOut")]
        public IActionResult GetAllCheckedOut()
        {
            return Ok(_userProfileRepository.GetAllCheckedOut());
        }
        [HttpGet("Deactivated")]
        public IActionResult GetAllDeactivated()
        {
            return Ok(_userProfileRepository.GetAllDeactivated());
        }

        [HttpGet("Guests")]
        public IActionResult GetAllGuests()
        {
            return Ok(_userProfileRepository.GetAllGuests());
        }
        [HttpGet("GetCurrentUser")]
        public IActionResult GetCurrentUser()
        {
            var currentUserProfile = GetCurrentUserProfile();
            return Ok(currentUserProfile);
        }
        [HttpGet("GetCurrentUserType")]
        public IActionResult GetCurrentUserType()
        {
            var currentUserProfile = GetCurrentUserProfile();
            var currentUserTypeName = currentUserProfile.UserType.Name;
            return Ok(currentUserProfile.UserType);
        }


        [HttpGet("GetFireBase/{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFireBaseId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpPut("CheckIn/{id}")]
        public IActionResult CheckIn(int id)
        {
            _userProfileRepository.CheckIn(id);
            return NoContent();
        }
        [HttpPut("CheckOut/{id}")]
        public IActionResult CheckOut(int id)
        {
            _userProfileRepository.CheckOut(id);
            return NoContent();
        }
        [HttpDelete("Delete/{id}")]
        public IActionResult Deactivate(int id)
        {
            _userProfileRepository.Deactivate(id);
            return NoContent();
        }
        [HttpPut("Activate/{id}")]
        public IActionResult Activate(int id)
        {
            _userProfileRepository.Activate(id);
            return NoContent();
        }

        [HttpPut("MakeAdmin/{id}")]
        public IActionResult MakeAdmin(int id)
        {
            _userProfileRepository.MakeAdmin(id);
            return NoContent();
        }
        [HttpPut("MakeGuest/{id}")]
        public IActionResult MakeAuthor(int id)
        {
            _userProfileRepository.MakeGuest(id);
            return NoContent();
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFireBaseId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var fireBaseId = User?.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (fireBaseId != null)
            {
                return _userProfileRepository.GetByFireBaseId(fireBaseId);
            }
            else
            {
                return null;
            }
        }

        //[HttpPost]
        //public IActionResult Register(UserProfile userProfile)
        //{
        //    // All newly registered users start out as a "user" user type (i.e. they are not admins)
        //    userProfile.UserTypeId = UserType.USER_TYPE_ID;
        //    _userProfileRepository.Add(userProfile);
        //    return CreatedAtAction(
        //        nameof(GetByFireBaseId), new { firebaseUserId = userProfile.FireBaseId }, userProfile);
        //}
    }
}
