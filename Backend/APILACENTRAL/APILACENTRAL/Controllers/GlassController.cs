using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APILACENTRAL.Controllers
{
    [Route("Glass")]
    [ApiController]
    public class GlassController:ControllerBase
    {
        private readonly GlassService _glassService;
        private readonly MaterialService _materialService;

        public GlassController(GlassService glassService, MaterialService materialService)
        {
            _glassService = glassService;
            _materialService = materialService;
        }

        //[Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SGlassDTO>>> getGlasses()
        {
            var glasses = await _glassService.getGlasses();

            if (glasses is not null)
            {
                return Ok(glasses);
            }
            return BadRequest(new { message = "table is empty" });
        }

        //[Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblvidrio>> getGlass(int id)
        {
            var glass = await _glassService.getGlass(id);

            if (glass is not null)
            {
                return Ok(glass);
            }
            return materialNotFound(id);

        }

       // [Authorize]
        [HttpPost]
        public async Task<IActionResult> postGlass(GlassDTO glass)
        {
            string validMaterial = await validateMaterial(glass.FKIdMaterial);

            if(validMaterial == "valid")
            {
                var createdGlass = await _glassService.addGlass(glass);
                return Ok(createdGlass);
            }
            return materialNotFound(glass.FKIdMaterial);
            
        }

       // [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> putGlass(int id, GlassDTO glass)
        {
            var existingMaterial = await _glassService.getGlass(id);
            string validMaterial = await validateMaterial(glass.FKIdMaterial);
            if(validMaterial == "valid")
            {
                if (id != glass.PkIdVidrio)
                {
                    return BadRequest(new { message = $"Id = {id} doesn't match with body id = {glass.PkIdVidrio} " });
                }
                if (existingMaterial is not null)
                {
                    await _glassService.updateGlasss(id, glass);
                    return Ok(glass);
                }
                return GlassNotFound(id);
            }
            return materialNotFound(glass.FKIdMaterial);

        }

       // [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteGlass(int id)
        {
            var existingMaterial = await _glassService.getGlass(id);
            if (existingMaterial is not null)
            {
                await _glassService.deleteGlass(id);
                return Ok(existingMaterial);
            }
            return materialNotFound(id);
        }

        //[Authorize]
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

        private NotFoundObjectResult GlassNotFound(int id)
        {
            return NotFound(new { message = $"Glass  with Id =  {id} doesn't exist" });
        }

        private async Task<string> validateMaterial(int id)
        {
            var result = await _glassService.findMaterial(id) ;
            string state = "valid";
            if (!result)
            {
                state = $"the material with id {id} doesn't exists ";
            }
            return state;

        }
    }
}
