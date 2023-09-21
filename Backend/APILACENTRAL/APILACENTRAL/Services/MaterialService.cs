using APILACENTRAL.Models.ModelsLaCentral;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APILACENTRAL.Services
{
  
    public class MaterialService
    {
        private readonly LaCentralContext _laCentralContext;

        public MaterialService(LaCentralContext laCentralContext)
        {
            _laCentralContext = laCentralContext;
        }

        public async Task<IEnumerable<Tblmaterial>> getMaterials()
        {
            return await _laCentralContext.Tblmaterials.ToListAsync();
        }

        public async Task<Tblmaterial?> getMaterial(int id)
        {
            return await _laCentralContext.Tblmaterials.FindAsync(id);
        }

        public async Task<Tblmaterial> addMaterial(Tblmaterial material)
        {
            _laCentralContext.Tblmaterials.Add(material);
            await _laCentralContext.SaveChangesAsync();
            return material;
        }

        public async Task updateMaterial (int id, Tblmaterial material)
        {
            var materialFound = await getMaterial(id);

            if(materialFound is not null)
            {
                materialFound.NombreMaterial = material.NombreMaterial;
                await _laCentralContext.SaveChangesAsync();
            }

        }

        public async Task deleteMaterial (int id)
        {
            var materialFound = await getMaterial(id);
            if(materialFound is not null)
            {
                _laCentralContext.Tblmaterials.Remove(materialFound);
                await _laCentralContext.SaveChangesAsync();
            }
        }
    }
}
