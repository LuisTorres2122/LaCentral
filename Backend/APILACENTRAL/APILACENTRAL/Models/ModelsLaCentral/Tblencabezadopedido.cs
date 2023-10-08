using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblencabezadopedido
{
    public int PkIdPedido { get; set; }

    public int FkIdCliente { get; set; }

    public string NombreCliente { get; set; } = null!;

    public DateOnly FechaPedido { get; set; }

    public decimal? DescuentoPedido { get; set; }

    public decimal TotalPedido { get; set; }

    public decimal AbonoPedido { get; set; }

    public bool EstatusPedido { get; set; }

    [JsonIgnore]
    public virtual Tblcliente FkIdClienteNavigation { get; set; } = null!;

    public virtual ICollection<Tbldetallepedido> Tbldetallepedidos { get; set; } = new List<Tbldetallepedido>();
}
