using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APILACENTRAL.Controllers
{
    [Route("Fillet")]
    [ApiController]
    public class FilletController:ControllerBase
    {
        private readonly FilletService _filletService;
        private readonly MaterialService _materialService;

        public FilletController(FilletService filletService, MaterialService materialService)
        {
            _filletService = filletService;
            _materialService = materialService;
        }

        // [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SFilletDTO>>> getFillets()
        {
            var fillets = await _filletService.getFillets();

            if (fillets is not null)
            {
                return Ok(fillets);
            }
            return BadRequest(new { message = "table is empty" });
        }


    //    [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblvidrio>> getFillet(int id)
        {
            var glass = await _filletService.getFillet(id);

            if (glass is not null)
            {
                return Ok(glass);
            }
            return materialNotFound(id);

        }

      //  [Authorize]
        [HttpPost]
        public async Task<IActionResult> postGlass(FilletDTO fillet)
        {
            string validMaterial = await validateMaterial(fillet.FKIdMaterial);

            if (validMaterial == "valid")
            {
                var createdfillet = await _filletService.addFillet(fillet);
                return Ok(createdfillet);
            }
            return materialNotFound(fillet.FKIdMaterial);

        }

      //  [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> putGlass(int id, FilletDTO fillet)
        {
            var existingMaterial = await _filletService.getFillet(id);
            string validMaterial = await validateMaterial(fillet.FKIdMaterial);
            if (validMaterial == "valid")
            {
                if (id != fillet.PkIdFilete)
                {
                    return BadRequest(new { message = $"Id = {id} doesn't match with body id = {fillet.PkIdFilete} " });
                }
                if (existingMaterial is not null)
                {
                    await _filletService.updateFillet(id, fillet);
                    return Ok(fillet);
                }
                return FilletNotFound(id);
            }
            return materialNotFound(fillet.FKIdMaterial);

        }

       // [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteGlass(int id)
        {
            var existingMaterial = await _filletService.getFillet(id);
            if (existingMaterial is not null)
            {
                await _filletService.deleteFillet(id);
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

        private NotFoundObjectResult FilletNotFound(int id)
        {
            return NotFound(new { message = $"Fillet  with Id =  {id} doesn't exist" });
        }

        private async Task<string> validateMaterial(int id)
        {
            var result = await _filletService.findMaterial(id);
            string state = "valid";
            if (!result)
            {
                state = $"the material with id {id} doesn't exists ";
            }
            return state;

        }

    }
}
