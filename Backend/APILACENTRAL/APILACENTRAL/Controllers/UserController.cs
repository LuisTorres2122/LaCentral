
using Microsoft.AspNetCore.Mvc;
using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Servicios;
using APILACENTRAL.Models.Tokens;



using APILACENTRAL.Services;


namespace APILACENTRAL.Controllers
{
    [Route("User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAutorizationService _autorizationService;
        private readonly UserService _userService;

        public UserController(IAutorizationService autorizationService, UserService userService)
        {
            _autorizationService = autorizationService;
            _userService = userService;
        }

        //[Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tblusuario>>> getUsers()
        {
           var users =  await _userService.getUsers();
            if (users is null)
            {
                return NotFound(new {message = "Table is empty"});
            }

            return Ok(users);
        }


        [HttpPost]
        [Route("Autenticar")]
        public async Task<IActionResult> autenticate( AutorizationRequest autorizacion)
        {
            var resultado_autorizacion = await _autorizationService.DevolverToken(autorizacion);
            if (resultado_autorizacion is null)
            {
                return Unauthorized(new { message = "the account doesn't exist" });
            }
            else if (resultado_autorizacion.Resultado == false) 
            {
                return BadRequest(new { message = resultado_autorizacion.Msg });
            } 
            else 
            {
                return Ok(resultado_autorizacion);
            }
        }

        

        //[Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblusuario>> getUser(int id)
        {
            var user = await _userService.getUser(id);

            if (user is null)
            {
                return userNotFound(id);
            }

            return Ok(user);
        }

        //[Authorize]
        [HttpPost]
        public async Task<ActionResult> postUser(Tblusuario user)
        {
            var existingUsre = await _userService.findUser(user);

            if (existingUsre)
            {
                var createdUser = await _userService.addUser(user);
                return CreatedAtAction("GetUser", new { id = createdUser.PkIdUsuario }, createdUser);
            }
            else
            {
                return BadRequest(new { message = $"User {user.EmailUsuario} already exist" });
            }
           
        }

        //[Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> putUser(int id, Tblusuario user)
        {
            if(id != user.PkIdUsuario)
            {
                return BadRequest(new { message = $"Id = {id} doesn't match with body id = {user.PkIdUsuario} " });
            }

            var userToUpdate = await _userService.getUser(id);

            if(userToUpdate is not null)
            {
                await _userService.updateUser(id, user);
                return Ok(userToUpdate);
            }
            
                return userNotFound(id);
            
        }

        //[Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteUser(int id)
        {
            var user = await _userService.getUser(id);
            if(user is not null)
            {
                await _userService.deleteUser(id);
                return Ok(new {message = $"User with id = {id} has been deleted"});
            }
            return userNotFound(id);
        }


        private NotFoundObjectResult userNotFound(int id)
        {
            return NotFound(new { message = $"User  with Id =  {id} doesn't exist" });
        }

       

    }
}
