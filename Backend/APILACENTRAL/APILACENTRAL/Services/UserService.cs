
using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Utilities;

using Microsoft.EntityFrameworkCore;

namespace APILACENTRAL.Services
{
    public class UserService
    {
      private readonly LaCentralContext _laCentralContext;
        static HashClass encoding = new HashClass();

        public UserService(LaCentralContext laCentralContext)
        {
            _laCentralContext = laCentralContext;
        }


        public async Task<Tblusuario> addUser(Tblusuario user)
        {
            Tblusuario tblusuario = new Tblusuario();
            tblusuario.EmailUsuario = user.EmailUsuario;
            tblusuario.PkIdUsuario = user.PkIdUsuario;
            tblusuario.PasswordUsuario = encoding.SetHash(user.PasswordUsuario);
            _laCentralContext.Tblusuarios.Add(tblusuario);
            await _laCentralContext.SaveChangesAsync();
            return tblusuario;
        }

        public async Task<bool> findUser(Tblusuario user)
        {
            bool access = false;
            var existingUser = await _laCentralContext.Tblusuarios.Where(x => x.EmailUsuario == user.EmailUsuario).ToListAsync();
            if(existingUser.Count == 0)
            {
                access = true;
            }

            return access;
        }

        


        public async Task<IEnumerable<Tblusuario>> getUsers()
        {
            var users = await _laCentralContext.Tblusuarios.ToListAsync();

            foreach (var user in users)
            {
                user.PasswordUsuario = encoding.GetHash(user.PasswordUsuario);
            }

            return users;
        }

        public async Task<Tblusuario?> getUser(int id)
        {
            return await _laCentralContext.Tblusuarios.FindAsync(id);
            
           
        }

        public async Task updateUser(int id, Tblusuario user)
        {
            var existingUser = await getUser(id);
            if (existingUser is not null)
            {
                existingUser.EmailUsuario = user.EmailUsuario;
                existingUser.PasswordUsuario = encoding.SetHash(user.PasswordUsuario);
                existingUser.PkIdUsuario = user.PkIdUsuario;
                await _laCentralContext.SaveChangesAsync();
            }

        }

        public async Task deleteUser(int id)
        {
            
            var existingUser = await getUser(id);
            if (existingUser != null)
            {
                _laCentralContext.Tblusuarios.Remove(existingUser);
                await _laCentralContext.SaveChangesAsync();
            }

        }

      
        
    }
}
