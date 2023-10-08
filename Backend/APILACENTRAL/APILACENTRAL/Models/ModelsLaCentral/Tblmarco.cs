using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblmarco
{
    public int PkIdMarco { get; set; }

    public int FKIdMaterial { get; set; }

    public string CodigoMarco { get; set; } = null!;

    public decimal PrecioMarco { get; set; }

    [JsonIgnore]
    public virtual Tblmaterial FKIdMaterialNavigation { get; set; } = null!;
}
