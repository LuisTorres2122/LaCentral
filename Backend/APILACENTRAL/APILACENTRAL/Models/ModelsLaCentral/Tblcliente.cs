using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblcliente
{
    public int PkIdCliente { get; set; }

    public string NombreCliente { get; set; } = null!;

    public string? EmailCliente { get; set; }

    public int? TelefonoCliente { get; set; }

    public string? DireccionCliente { get; set; }
    [JsonIgnore]
    public virtual ICollection<Tblencabezadopedido> Tblencabezadopedidos { get; set; } = new List<Tblencabezadopedido>();
}
