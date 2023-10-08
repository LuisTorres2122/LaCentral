using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APILACENTRAL.Controllers
{
    [Route("Frame")]
    [ApiController]
    public class FrameController:ControllerBase
    {
        private readonly FrameService _frameService;
        private readonly MaterialService _materialService;

        public FrameController(FrameService frameService, MaterialService materialService)
        {
            _frameService = frameService;
            _materialService = materialService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SFrameDTO>>> getFrames()
        {
            var frame = await _frameService.getFrames();

            if (frame is not null)
            {
                return Ok(frame);
            }
            return BadRequest(new { message = "table is empty" });
        }

       [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblmarco>> getFrame(int id)
        {
            var passepartout = await _frameService.getFrame(id);

            if (passepartout is not null)
            {
                return Ok(passepartout);
            }
            return materialNotFound(id);

        }

       [Authorize]
        [HttpPost]
        public async Task<IActionResult> postFrame(FrameDTO frame)
        {
            string validMaterial = await validateMaterial(frame.FKIdMaterial);

            if (validMaterial == "valid")
            {
                var createdGlass = await _frameService.addFrame(frame);
                return Ok(createdGlass);
            }
            return materialNotFound(frame.FKIdMaterial);

        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> putFrame(int id, FrameDTO frame)
        {
            var existingMaterial = await _frameService.getFrame(id);
            string validMaterial = await validateMaterial(frame.FKIdMaterial);
            if (validMaterial == "valid")
            {
                if (id != frame.PkIdMarco)
                {
                    return BadRequest(new { message = $"Id = {id} doesn't match with body id = {frame.PkIdMarco} " });
                }
                if (existingMaterial is not null)
                {
                    await _frameService.updateFrame(id, frame);
                    return Ok(frame);
                }
                return PassepartoutNotFound(frame.FKIdMaterial);
            }
            return materialNotFound(id);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteFrame(int id)
        {
            var existingMaterial = await _frameService.getFrame(id);
            if (existingMaterial is not null)
            {
                await _frameService.deleteFrame(id);
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
            var result = await _frameService.findMaterial(id);
            string state = "valid";
            if (!result)
            {
                state = $"the material with id {id} doesn't exists ";
            }
            return state;

        }


    }
}
