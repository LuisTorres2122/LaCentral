using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace APILACENTRAL.Controllers
{
   
    [Route("Obra")]
    [ApiController]
    public class PieceController:ControllerBase
    {
        private readonly PieceService _pieceService;

        public PieceController(PieceService pieceService)
        {
            _pieceService = pieceService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tblobra>>> getPieces()
        {
            var pieces = await _pieceService.getPieces();

            if (pieces is not null)
            {
                return Ok(pieces);
            }
            return BadRequest(new { message = "table is empty" });
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblobra>> getPiece(int id)
        {
            var piece = await _pieceService.getPiece(id);

            if (piece is not null)
            {
                return Ok(piece);
            }
            return pieceNotFound(id);

        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> postClient(Tblobra piece)
        {
            var cretedPiece = await _pieceService.addPiece(piece);
            return Ok(cretedPiece);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> putClient(int id, Tblobra piece)
        {
            var existingpiece = await _pieceService.getPiece(id);
            if (id != piece.PkIdObra)
            {
                return BadRequest(new { message = $"Id = {id} doesn't match with body id = {piece.PkIdObra} " });
            }
            if (existingpiece is not null)
            {
                await _pieceService.updatePiece(id, piece);
                return Ok(piece);
            }
            return pieceNotFound(id);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteClient(int id)
        {
            var existingPiece = await _pieceService.getPiece(id);
            if (existingPiece is not null)
            {
                await _pieceService.deletepiece(id);
                return Ok(existingPiece);
            }
            return pieceNotFound(id);
        }

        private NotFoundObjectResult pieceNotFound(int id)
        {
            return NotFound(new { message = $"Piece  with Id =  {id} doesn't exist" });
        }


    }
}
