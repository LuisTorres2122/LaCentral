
using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APILACENTRAL.Controllers
{
    [Route("Client")]
    [ApiController]
    public class ClientController:ControllerBase
    {
        private readonly ClientService _clientService;

        public ClientController(ClientService clientService)
        {
            _clientService = clientService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tblcliente>>> getClients()
        {
            var clients = await _clientService.getClients();

            if (clients is not null)
            {
                return Ok(clients);
            }
            return BadRequest(new { message = "table is empty" });
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblcliente>> getClient(int id)
        {
            var client = await _clientService.getClient(id);

            if (client is not null)
            {
                return Ok(client);
            }
            return clientNotFound(id);

        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> postClient(Tblcliente client)
        {
            var cretedClient = await _clientService.addClient(client);
            return Ok(cretedClient);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> putClient(int id, Tblcliente client)
        {
            var existingClient = await _clientService.getClient(id);
            if (id != client.PkIdCliente)
            {
                return BadRequest(new { message = $"Id = {id} doesn't match with body id = {client.PkIdCliente} " });
            }
            if (existingClient is not null)
            {
                await _clientService.updateClient(id, client);
                return Ok(client);
            }
            return clientNotFound(id);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteClient(int id)
        {
            var existingClient = await _clientService.getClient(id);
            if (existingClient is not null)
            {
                await _clientService.deleteClient(id);
                return Ok(existingClient);
            }
            return clientNotFound(id);
        }

        private NotFoundObjectResult clientNotFound(int id)
        {
            return NotFound(new { message = $"Client  with Id =  {id} doesn't exist" });
        }
    }
}
