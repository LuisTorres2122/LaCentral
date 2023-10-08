namespace APILACENTRAL.Models.DTO_s
{
    public class OrderDetailsDTO
    {
        public int idDetallePedido { get; set; }

        public int idPedido { get; set; }

        public string Descripcion { get; set; } = null!;

        public decimal Precio { get; set; }
    }
}
