using System.ComponentModel.DataAnnotations;

namespace APILACENTRAL.Models.DTO_s
{
    public class GlassDTO
    {
        public int PkIdVidrio { get; set; }

        public int FKIdMaterial { get; set; }
        [MaxLength(15, ErrorMessage = "the type is longer than 15c")]
        public string TipoVidrio { get; set; } = null!;

        public decimal PrecioVidrio { get; set; }
    }
}
