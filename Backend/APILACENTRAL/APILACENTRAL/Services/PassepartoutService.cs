using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Models.ModelsLaCentral;
using Microsoft.EntityFrameworkCore;

namespace APILACENTRAL.Services
{
    public class PassepartoutService
    {
        private readonly LaCentralContext _laCentralContext;
        private readonly MaterialService _materialService;
        public PassepartoutService(LaCentralContext lacentralContext, MaterialService materialService)
        {
            _laCentralContext = lacentralContext;
            _materialService = materialService;
        }

        public async Task<IEnumerable<SPassepartoutDTO>> getPassepartouts()
        {
            var list = await _laCentralContext.Tblpassepartouts
          .Join(
      _laCentralContext.Tblmaterials,
      passe => passe.FKIdMaterial,
      material => material.PkIdMaterial,
      (passe, material) => new SPassepartoutDTO
      {
          PkIdPassepartout = passe.PkIdPassepartout,
          NombreMaterial = material.NombreMaterial,
          CodigoPassepartout = passe.CodigoPassepartout,

          ColorPassepartout = passe.ColorPassepartout

      })
      .ToListAsync();

            return list;
        }
    

        public async Task<Tblpassepartout?> getPassepartout(int id)
        {
            return await _laCentralContext.Tblpassepartouts.FindAsync(id);
        }

        public async Task<Tblpassepartout> addPassepartout(PassepartoutDTO passepartout)
        {
            var newPassepartout = new Tblpassepartout();
            newPassepartout.FKIdMaterial = passepartout.FKIdMaterial;
            newPassepartout.CodigoPassepartout = passepartout.CodigoPassepartout;
        
            newPassepartout.ColorPassepartout = passepartout.ColorPassepartout;
            _laCentralContext.Tblpassepartouts.Add(newPassepartout);
            await _laCentralContext.SaveChangesAsync();
            return newPassepartout;
        }

        public async Task updatePassepartout(int id, PassepartoutDTO passepartout)
        {
            var PassepartoutFound = await getPassepartout(id);
            var materialFound = await findMaterial(id);
            if (PassepartoutFound is not null && materialFound)
            {
                PassepartoutFound.FKIdMaterial = passepartout.FKIdMaterial;
                PassepartoutFound.CodigoPassepartout = passepartout.CodigoPassepartout;
               
                PassepartoutFound.ColorPassepartout = passepartout.ColorPassepartout;
                await _laCentralContext.SaveChangesAsync();
            }

        }

        public async Task deletePassepartout(int id)
        {
            var passepartoutFound = await getPassepartout(id);
            var materialFound = await findMaterial(id);
            if (passepartoutFound is not null && materialFound)
            {
                _laCentralContext.Tblpassepartouts.Remove(passepartoutFound);
                await _laCentralContext.SaveChangesAsync();
            }
        }

        public async Task<bool> findMaterial(int id)
        {
            var materialFound = await _materialService.getMaterial(id);
            if (materialFound is not null)
            {
                return true;
            }

            return false;
        }

    }
}
