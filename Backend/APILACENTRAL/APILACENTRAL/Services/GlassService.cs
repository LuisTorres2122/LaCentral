using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Models.ModelsLaCentral;
using Microsoft.EntityFrameworkCore;

namespace APILACENTRAL.Services
{
    public class GlassService
    {
        private readonly LaCentralContext _laCentralContext;
        private readonly MaterialService _materialService;
        public GlassService(LaCentralContext lacentralContext, MaterialService materialService)
        {
            _laCentralContext = lacentralContext;
            _materialService = materialService;
        }

        public async Task<IEnumerable<Tblvidrio>> getGlasses()
        {
            return await _laCentralContext.Tblvidrios.ToListAsync();
        }

        public async Task<Tblvidrio?> getGlass(int id)
        {
            return await _laCentralContext.Tblvidrios.FindAsync(id);
        }

        public async Task<Tblvidrio> addGlass(GlassDTO glass)
        {
            var newGlass = new Tblvidrio();
            newGlass.FKIdMaterial = glass.FKIdMaterial;
            newGlass.TipoVidrio = glass.TipoVidrio;
            newGlass.PrecioVidrio = glass.PrecioVidrio;
            _laCentralContext.Tblvidrios.Add(newGlass);
            await _laCentralContext.SaveChangesAsync();
            return newGlass;
        }

        public async Task updateGlasss(int id, GlassDTO glass)
        {
            var glassFound = await getGlass(id);
            var materialFound = await findMaterial(id);
            if (glassFound is not null && materialFound)
            {
                glassFound.TipoVidrio = glass.TipoVidrio;
                glassFound.PrecioVidrio = glass.PrecioVidrio;
                glassFound.FKIdMaterial = glass.FKIdMaterial;
                await _laCentralContext.SaveChangesAsync();
            }

        }

        public async Task deleteGlass(int id)
        {
            var glassFound = await getGlass(id);
            var materialFound = await findMaterial(id);
            if (glassFound is not null && materialFound)
            {
                _laCentralContext.Tblvidrios.Remove(glassFound);
                await _laCentralContext.SaveChangesAsync();
            }
        }

        public async Task<bool> findMaterial(int id)
        {
            var materialFound = await _materialService.getMaterial(id);
            if(materialFound is not null)
            {
                return true;
            }

            return false;
        }
    }
}
