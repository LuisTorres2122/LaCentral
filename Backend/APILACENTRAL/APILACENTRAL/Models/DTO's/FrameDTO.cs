namespace APILACENTRAL.Models.DTO_s
{
    public class FrameDTO
    {
        public int PkIdMarco { get; set; }

        public int FKIdMaterial { get; set; }

        public int CodigoMarco { get; set; }

        public decimal PrecioMarco { get; set; }
    }
    public class SFrameDTO
    {
        public int PkIdMarco { get; set; }

        public string NombreMaterial { get; set; }

        public int CodigoMarco { get; set; }

        public decimal PrecioMarco { get; set; }
    }
}
