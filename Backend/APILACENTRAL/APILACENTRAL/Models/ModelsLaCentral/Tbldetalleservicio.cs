using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tbldetalleservicio
{
    public int FkIdDetallePedido { get; set; }

    public int Linea { get; set; }

    public int FkIdMaterial { get; set; }

    public string? NombreMaterial { get; set; }

    public decimal? PrecioMaterial { get; set; }

    public string? ColorMaterial { get; set; }

    [JsonIgnore]
    public virtual Tblmaterial FkIdMaterialNavigation { get; set; } = null!;
}
