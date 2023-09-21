
using APILACENTRAL.Models.ModelsLaCentral;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APILACENTRAL.Services
{
    public class UserService
    {
      private readonly LaCentralContext _laCentralContext;

        public UserService(LaCentralContext laCentralContext)
        {
            _laCentralContext = laCentralContext;
        }

       
        public async Task<Tblusuario> addUser(Tblusuario user)
        {
            _laCentralContext.Tblusuarios.Add(user);
            await _laCentralContext.SaveChangesAsync();
            return user;
        }

       

        public async Task<IEnumerable<Tblusuario>> getUsers()
        {
            return await _laCentralContext.Tblusuarios.ToListAsync();
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
                existingUser.PasswordUsuario = user.PasswordUsuario;
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
