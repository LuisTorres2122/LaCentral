namespace APILACENTRAL.Models.DTO_s
{
    public class ServiceDetailsDTO
    {
        public int idDetallePedido { get; set; }

        public int Linea { get; set; }

        public int idMaterial { get; set; }

        public string? Nombre { get; set; }

        public decimal? Precio { get; set; }

        public string? Color { get; set; }
    }
}
