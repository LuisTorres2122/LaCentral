namespace APILACENTRAL.Models.DTO_s
{
    public class OrderDTO
    {
        public int idPedido { get; set; }

        public int idCliente { get; set; }

        public string Nombre { get; set; } = null!;

        public DateOnly Fecha { get; set; }

        public decimal? Descuento { get; set; }

        public decimal Total { get; set; }

        public decimal Abono { get; set; }

        public bool Estatus { get; set; }

    }
}
