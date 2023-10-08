using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblvidrio
{
    public int PkIdVidrio { get; set; }

    public int FKIdMaterial { get; set; }

    public string TipoVidrio { get; set; } = null!;

    public decimal PrecioVidrio { get; set; }

    [JsonIgnore]
    public virtual Tblmaterial FKIdMaterialNavigation { get; set; } = null!;
}
