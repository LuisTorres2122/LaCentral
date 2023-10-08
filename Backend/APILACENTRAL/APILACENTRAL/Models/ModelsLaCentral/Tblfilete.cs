using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblfilete
{
    public int PkIdFilete { get; set; }

    public int FKIdMaterial { get; set; }

    public string TipoFilete { get; set; } = null!;

    public decimal PrecioFilete { get; set; }

    [JsonIgnore]
    public virtual Tblmaterial FKIdMaterialNavigation { get; set; } = null!;
}
