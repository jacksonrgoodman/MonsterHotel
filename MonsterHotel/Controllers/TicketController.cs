using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonsterHotel.Repositories;
using MonsterHotel.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace MonsterHotel.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public TicketController(ITicketRepository ticketRepository, IUserProfileRepository userProfileRepository)
        {
            _ticketRepository = ticketRepository;
            _userProfileRepository = userProfileRepository;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ticketRepository.GetAll());
        }
        [HttpGet("AllActiveByUserId/{id}")]
        public IActionResult GetAllActiveByUserId(int id)
        {
            return Ok(_ticketRepository.GetAllActiveByUserId(id));
        }
        [HttpGet("AllDeactivatedByUserId/{id}")]
        public IActionResult GetAllDeactivatedByUserId(int id)
        {
            return Ok(_ticketRepository.GetAllDeactivatedByUserId(id));
        }
        [HttpGet("Issues")]
        public IActionResult GetAllIssueTickets()
        {
            return Ok(_ticketRepository.GetAllIssueTickets());
        }
        [HttpGet("Deactivated")]
        public IActionResult GetAllDeactivated()
        {
            return Ok(_ticketRepository.GetAllDeactivated());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var stay = _ticketRepository.GetById(id);
            if (stay == null)
            {
                return NotFound();
            }
            return Ok(stay);
        }
        [HttpPut("Activate/{id}")]
        public IActionResult Activate(int id)
        {
            _ticketRepository.Activate(id);
            return NoContent();
        }
        [HttpPut("Open/{id}")]
        public IActionResult Open(int id)
        {
            _ticketRepository.Open(id);
            return NoContent();
        }
        [HttpPut("IssueTicket/{id}")]
        public IActionResult IssueTicket(int id)
        {
            _ticketRepository.IssueTicket(id);
            return NoContent();
        }
        [HttpPut("Close/{id}")]
        public IActionResult Close(int id)
        {
            _ticketRepository.Close(id);
            return NoContent();
        }
        [HttpPost]
        public IActionResult Add(Ticket ticket)
        {
            var currentUser = GetCurrentUserProfile();
            //if (currentUser.UserType.Name != "guest")
            //{
            //    return Unauthorized();
            //}

            ticket.CreateDateTime = DateTime.Now;
            ticket.UserProfileId = currentUser.Id;
            ticket.TicketStatusId = 1;
            ticket.IsActive = true;
            _ticketRepository.Add(ticket);
            return CreatedAtAction(nameof(Get), new { id = ticket.Id }, ticket);
        }
        [HttpDelete("Delete/{id}")]
        public IActionResult Deactivate(int id)
        {
            _ticketRepository.Deactivate(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User?.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (firebaseUserId != null)
            {
                return _userProfileRepository.GetByFireBaseId(firebaseUserId);
            }
            else
            {
                return null;
            }
        }
    }
}
