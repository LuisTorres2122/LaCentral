using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace APILACENTRAL.Controllers
{
    [Route("Material")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly MaterialService _materialService;

        public MaterialController(MaterialService materialService)
        {
            _materialService = materialService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tblmaterial>>> getMaterials()
        {
            var materials = await _materialService.getMaterials();

            if (materials is not null)
            {
                return Ok(materials);
            }
            return BadRequest(new { message = "table is empty" });
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblmaterial>> getMaterial(int id)
        {
            var material = await _materialService.getMaterial(id);

            if(material is not null)
            {
                return Ok(material);
            }
            return materialNotFound(id);

        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> postMaterial(Tblmaterial material)
        {
            var createdMaterial =  await _materialService.addMaterial(material);
            return Ok(createdMaterial);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> putMaterial(int id, Tblmaterial material)
        {
            var existingMaterial = await _materialService.getMaterial(id);
            if(id != material.PkIdMaterial) 
            {
                return BadRequest(new { message = $"Id = {id} doesn't match with body id = {material.PkIdMaterial} " });
            }
            if(existingMaterial is not null)
            {
                await _materialService.updateMaterial(id, material);
                return Ok(material);
            }
            return materialNotFound(id);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteMaterial(int id)
        {
            var existingMaterial = await _materialService.getMaterial(id);
            if(existingMaterial is not null)
            {
                await _materialService.deleteMaterial(id);
                return Ok(existingMaterial);
            }
            return materialNotFound(id);
        }

        private NotFoundObjectResult materialNotFound(int id)
        {
            return NotFound(new { message = $"Material  with Id =  {id} doesn't exist" });
        }
    }
}
