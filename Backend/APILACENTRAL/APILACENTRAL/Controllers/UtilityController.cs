using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Bcpg;

namespace APILACENTRAL.Controllers
{
    [Route("Utility")]
    [ApiController]
    public class UtilityController: ControllerBase
    {
        private readonly UtilitityService _utilityService;

        public UtilityController(UtilitityService utilityService) { _utilityService =  utilityService; }

       // [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tblutilidade>>> getUtilities()
        {
            var utility =  await _utilityService.getUtilities();
            if(utility is null)
            {
                return NotFound(new { message = "Table is empty" });
            }

            return Ok(utility);
        }

        //[Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblutilidade>> getUtility(int id)
        {
            var utility =  await _utilityService.getUtility(id);
            if(utility is  null)
            {
                return utilityNotFound(id);
            }
            return Ok(utility);
        }

       // [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> putUtility(int id, Tblutilidade utility)
        {
            

            var existingUtility = await _utilityService.getUtility(id);
            if(existingUtility is not null)
            {
                await _utilityService.updateUtility(id, utility);
                return Ok(new { message = "Utility updated", utility });
            }

                

            return utilityNotFound(id);


        }
        private NotFoundObjectResult utilityNotFound(int id)
        {
            return NotFound(new { message = $"Utility  with Id =  {id} doesn't exist" });
        }
    }
}
