using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Models.ModelsLaCentral;
using Microsoft.EntityFrameworkCore;

namespace APILACENTRAL.Services
{
    public class FrameService
    {
        private readonly LaCentralContext _laCentralContext;
        private readonly MaterialService _materialService;
        public FrameService(LaCentralContext lacentralContext, MaterialService materialService)
        {
            _laCentralContext = lacentralContext;
            _materialService = materialService;
        }

        public async Task<IEnumerable<SFrameDTO>> getFrames()
        {
            var vidriosConNombreMaterial = await _laCentralContext.Tblmarcos
          .Join(
      _laCentralContext.Tblmaterials,
      frame => frame.FKIdMaterial,
      material => material.PkIdMaterial,
      (frame, material) => new SFrameDTO
      {
          PkIdMarco = frame.PkIdMarco,
          NombreMaterial = material.NombreMaterial,
          CodigoMarco = frame.CodigoMarco,
          PrecioMarco = frame.PrecioMarco

      })
      .ToListAsync();

            return vidriosConNombreMaterial;
        }

        public async Task<Tblmarco?> getFrame(int id)
        {
            return await _laCentralContext.Tblmarcos.FindAsync(id);
        }

        public async Task<Tblmarco> addFrame(FrameDTO frame)
        {
            var newFrame = new Tblmarco();
            newFrame.FKIdMaterial = frame.FKIdMaterial;
            newFrame.CodigoMarco = frame.CodigoMarco;
            newFrame.PrecioMarco = frame.PrecioMarco;
            _laCentralContext.Tblmarcos.Add(newFrame);
            await _laCentralContext.SaveChangesAsync();
            return newFrame;
        }

        public async Task updateFrame(int id, FrameDTO frame)
        {
            var frameFound = await getFrame(id);
            
            if (frameFound is not null )
            {
                frameFound.FKIdMaterial = frame.FKIdMaterial;
                frameFound.CodigoMarco = frame.CodigoMarco;
                frameFound.PrecioMarco = frame.PrecioMarco;
                await _laCentralContext.SaveChangesAsync();
            }

        }

        public async Task deleteFrame(int id)
        {
            var frameFound = await getFrame(id);
            
            if (frameFound is not null )
            {
                _laCentralContext.Tblmarcos.Remove(frameFound);
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
