using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APILACENTRAL.Controllers
{
    [Route("Passepartout")]
    [ApiController]
    public class PassepartoutController:ControllerBase
    {
        private readonly PassepartoutService _passepartoutService;
        private readonly MaterialService _materialService;

        public PassepartoutController(PassepartoutService passepartoutService, MaterialService materialService)
        {
            _passepartoutService = passepartoutService;
            _materialService = materialService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SPassepartoutDTO>>> getPassepartouts()
        {
            var passepartout = await _passepartoutService.getPassepartouts();

            if (passepartout is not null)
            {
                return Ok(passepartout);
            }
            return BadRequest(new { message = "table is empty" });
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblpassepartout>> getPassepartout(int id)
        {
            var passepartout = await _passepartoutService.getPassepartout(id);

            if (passepartout is not null)
            {
                return Ok(passepartout);
            }
            return materialNotFound(id);

        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> postPassepartout(PassepartoutDTO passepartout)
        {
            string validMaterial = await validateMaterial(passepartout.FKIdMaterial);

            if (validMaterial == "valid")
            {
                var createdGlass = await _passepartoutService.addPassepartout(passepartout);
                return Ok(createdGlass);
            }
            return materialNotFound(passepartout.FKIdMaterial);

        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> putPassepartout(int id, PassepartoutDTO passepartout)
        {
            var existingMaterial = await _passepartoutService.getPassepartout(id);
            string validMaterial = await validateMaterial(passepartout.FKIdMaterial);
            if(validMaterial == "valid")
            {
                if (id != passepartout.PkIdPassepartout)
                {
                    return BadRequest(new { message = $"Id = {id} doesn't match with body id = {passepartout.PkIdPassepartout} " });
                }
                if (existingMaterial is not null)
                {
                    await _passepartoutService.updatePassepartout(id, passepartout);
                    return Ok(passepartout);
                }
                return PassepartoutNotFound(passepartout.FKIdMaterial);
            }
            return materialNotFound(id);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> deletePassepartout(int id)
        {
            var existingMaterial = await _passepartoutService.getPassepartout(id);
            if (existingMaterial is not null)
            {
                await _passepartoutService.deletePassepartout(id);
                return Ok(existingMaterial);
            }
            return materialNotFound(id);
        }

        [Authorize]
        [HttpGet]
        [Route("material")]
        public async Task<ActionResult<IEnumerable<Tblmaterial>>> getMaterials()
        {
            var result = await _materialService.getMaterials();

            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest(new { message = "table is empty" });

        }

        private NotFoundObjectResult materialNotFound(int id)
        {
            return NotFound(new { message = $"Material  with Id =  {id} doesn't exist" });
        }
        private NotFoundObjectResult PassepartoutNotFound(int id)
        {
            return NotFound(new { message = $"passepartout  with Id =  {id} doesn't exist" });
        }

        private async Task<string> validateMaterial(int id)
        {
            var result = await _passepartoutService.findMaterial(id);
            string state = "valid";
            if (!result)
            {
                state = $"the material with id {id} doesn't exists ";
            }
            return state;

        }

    }
}
