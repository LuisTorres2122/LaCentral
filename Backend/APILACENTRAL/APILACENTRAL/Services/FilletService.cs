using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Models.ModelsLaCentral;
using Microsoft.EntityFrameworkCore;

namespace APILACENTRAL.Services
{
    public class FilletService
    {
        private readonly LaCentralContext _laCentralContext;
        private readonly MaterialService _materialService;
        public FilletService(LaCentralContext lacentralContext, MaterialService materialService)
        {
            _laCentralContext = lacentralContext;
            _materialService = materialService;
        }

        public async Task<IEnumerable<SFilletDTO>> getFillets()
        {
            var vidriosConNombreMaterial = await _laCentralContext.Tblfiletes
            .Join(
        _laCentralContext.Tblmaterials,
        fillet => fillet.FKIdMaterial,
        material => material.PkIdMaterial,
        (fillet, material) => new SFilletDTO
        {
            PkIdFilete = fillet.PkIdFilete,
            NombreMaterial = material.NombreMaterial,
            TipoFilete = fillet.TipoFilete,
            PrecioFilete = fillet.PrecioFilete

        })
        .ToListAsync();

            return vidriosConNombreMaterial;

        }



        public async Task<Tblfilete?> getFillet(int id)
        {
            return await _laCentralContext.Tblfiletes.FindAsync(id);
        }

        public async Task<Tblfilete> addFillet(FilletDTO fillet)
        {
            var newfillet = new Tblfilete();
            newfillet.FKIdMaterial = fillet.FKIdMaterial;
            newfillet.TipoFilete = fillet.TipoFilete;
            newfillet.PrecioFilete = fillet.PrecioFilete;
            _laCentralContext.Tblfiletes.Add(newfillet);
            await _laCentralContext.SaveChangesAsync();
            return newfillet;
        }

        public async Task updateFillet(int id, FilletDTO fillet)
        {
            var filletFound = await getFillet(id);
            if (filletFound is not null)
            {
                filletFound.TipoFilete = fillet.TipoFilete;
                filletFound.PrecioFilete = fillet.PrecioFilete;
                filletFound.FKIdMaterial = fillet.FKIdMaterial;
                await _laCentralContext.SaveChangesAsync();
            }

        }

        public async Task deleteFillet(int id)
        {
            var filletFound = await getFillet(id);

            if (filletFound is not null)
            {
                _laCentralContext.Tblfiletes.Remove(filletFound);
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
