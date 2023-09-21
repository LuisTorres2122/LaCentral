using APILACENTRAL.Models.ModelsLaCentral;
using Microsoft.EntityFrameworkCore;

namespace APILACENTRAL.Services
{
    public class ClientService
    {
        private readonly LaCentralContext _laCentralContext;

        public ClientService(LaCentralContext laCentralContext)
        {
            _laCentralContext = laCentralContext;
        }

        public async Task<IEnumerable<Tblcliente>> getClients()
        {
            return await _laCentralContext.Tblclientes.ToListAsync();
        }

        public async Task<Tblcliente?> getClient(int id)
        {
            return await _laCentralContext.Tblclientes.FindAsync(id);
        }

        public async Task<Tblcliente> addClient(Tblcliente client)
        {
            _laCentralContext.Tblclientes.Add(client);
            await _laCentralContext.SaveChangesAsync();
            return client;
        }

        public async Task updateClient(int id, Tblcliente client)
        {
            var newClient = await getClient(id);

            if (newClient is not null)
            {
                newClient.NombreCliente = client.NombreCliente;
                newClient.EmailCliente = client.EmailCliente;
                newClient.TelefonoCliente = client.TelefonoCliente;
                newClient.DireccionCliente = client.DireccionCliente;
                await _laCentralContext.SaveChangesAsync();
            }

        }

        public async Task deleteClient(int id)
        {
            var newClient = await getClient(id);
            if (newClient is not null)
            {
                _laCentralContext.Tblclientes.Remove(newClient);
                await _laCentralContext.SaveChangesAsync();
            }
        }
    }
}
