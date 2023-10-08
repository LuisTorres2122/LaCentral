using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Models.ModelsLaCentral;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace APILACENTRAL.Services
{
    public class PieceService
    {
        private readonly LaCentralContext _laCentralContext;

        public PieceService(LaCentralContext lacentralContext)
        {
            _laCentralContext = lacentralContext;

        }

        public async Task<IEnumerable<Tblobra>> getPieces()
        {


            return await _laCentralContext.Tblobras.ToListAsync();

        }

        public async Task<IEnumerable<Tblobra>> getPiecesImportant()
        {


            return await _laCentralContext.Tblobras.OrderByDescending(x => x.ImportanciaObra)
                .ToListAsync();

        }



        public async Task<Tblobra?> getPiece(int id)
        {
            return await _laCentralContext.Tblobras.FindAsync(id);
        }

        public async Task<Tblobra> addPiece(Tblobra piece)
        { 
            _laCentralContext.Tblobras.Add(piece);
            await _laCentralContext.SaveChangesAsync();
            return piece;
        }

        public async Task updatePiece(int id, Tblobra piece)
        {
            var pieceFound = await getPiece(id);
            if (pieceFound is not null)
            {
                pieceFound.PrecioObra = piece.PrecioObra;
                pieceFound.AutorObra = piece.AutorObra;
                pieceFound.UrlObra = piece.UrlObra; 
                pieceFound.FechaPublicacionObra = piece.FechaPublicacionObra;
                pieceFound.TecnicaObra = piece.TecnicaObra;
                pieceFound.ImportanciaObra = piece.ImportanciaObra;
                pieceFound.MedidaObra = piece.MedidaObra;
                pieceFound.TituloObra =   piece.TituloObra;
                pieceFound.PosicionObra = piece.PosicionObra;
                await _laCentralContext.SaveChangesAsync();
            }

        }

        public async Task deletepiece(int id)
        {
            var pieceFound = await getPiece(id);

            if (pieceFound is not null)
            {
                _laCentralContext.Tblobras.Remove(pieceFound);
                await _laCentralContext.SaveChangesAsync();
            }
        }

      
    }
}
