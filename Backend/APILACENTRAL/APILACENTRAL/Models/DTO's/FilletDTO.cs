using System.ComponentModel.DataAnnotations;

namespace APILACENTRAL.Models.DTO_s
{
    public class FilletDTO
    {
        public int PkIdFilete { get; set; }

        public int FKIdMaterial { get; set; }
        [MaxLength(15, ErrorMessage = "the filete is longer than 15c")]
        public string TipoFilete { get; set; } = null!;

        public decimal PrecioFilete { get; set; }
    }
    public class SFilletDTO
    {
        public int PkIdFilete { get; set; }
        public string NombreMaterial { get; set; }
        public string TipoFilete { get; set; } = null!;

        public decimal PrecioFilete { get; set; }
    }
}
