using APILACENTRAL.Models.ModelsLaCentral;
using Microsoft.EntityFrameworkCore;

namespace APILACENTRAL.Services
{
    public class UtilitityService
    {
        private readonly LaCentralContext _laCentralContext;

        public UtilitityService(LaCentralContext laCentralContext)
        {
            _laCentralContext = laCentralContext;
        }

        public async Task<IEnumerable<Tblutilidade>> getUtilities()
        {
            return await _laCentralContext.Tblutilidades.ToListAsync();
        }

       public async Task<Tblutilidade?> getUtility(int id)
       {
            return await _laCentralContext.Tblutilidades.FindAsync(id);
       }

        

        public async Task updateUtility(int id, Tblutilidade utility)
        {
            
            var existingUtility = await getUtility(id);
            if(existingUtility is not null)
            {
                existingUtility.NombreUtilidad = utility.NombreUtilidad;
                existingUtility.ValorUtilidad = utility.ValorUtilidad;
                await _laCentralContext.SaveChangesAsync();
            }
        }

       
    }
}
