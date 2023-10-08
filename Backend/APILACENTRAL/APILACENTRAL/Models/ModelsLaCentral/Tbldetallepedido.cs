using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tbldetallepedido
{
    public int PkIdDetallePedido { get; set; }

    public int FkIdPedido { get; set; }

    public string DescripcionServicio { get; set; } = null!;

    public decimal PrecioPedido { get; set; }

    [JsonIgnore]
    public virtual Tblencabezadopedido FkIdPedidoNavigation { get; set; } = null!;
}
