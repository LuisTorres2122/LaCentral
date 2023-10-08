using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblpassepartout
{
    public int PkIdPassepartout { get; set; }

    public int FKIdMaterial { get; set; }

    public string CodigoPassepartout { get; set; } = null!;

    public string ColorPassepartout { get; set; } = null!;

    [JsonIgnore]
    public virtual Tblmaterial FKIdMaterialNavigation { get; set; } = null!;
}
