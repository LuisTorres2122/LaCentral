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

        public async Task<IEnumerable<Tblmarco>> getFrames()
        {
            return await _laCentralContext.Tblmarcos.ToListAsync();
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
            var materialFound = await findMaterial(id);
            if (frameFound is not null && materialFound)
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
            var materialFound = await findMaterial(id);
            if (frameFound is not null && materialFound)
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
