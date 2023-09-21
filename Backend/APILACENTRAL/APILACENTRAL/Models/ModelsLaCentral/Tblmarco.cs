using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblmarco
{
    public int PkIdMarco { get; set; }

    public int FKIdMaterial { get; set; }

    public int CodigoMarco { get; set; }

    public decimal PrecioMarco { get; set; }
    [JsonIgnore]
    public virtual Tblmaterial FKIdMaterialNavigation { get; set; } = null!;
}
