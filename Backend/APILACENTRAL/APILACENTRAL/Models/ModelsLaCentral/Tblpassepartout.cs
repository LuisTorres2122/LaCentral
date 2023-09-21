﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblpassepartout
{
    public int PkIdPassepartout { get; set; }

    public int FKIdMaterial { get; set; }

    public int CodigoPassepartout { get; set; }
    [MaxLength(25, ErrorMessage = "the home is longer than 25c")]
    public string? CasaPassepartout { get; set; }
    [MaxLength(15, ErrorMessage = "the color is longer than 15c")]
    public string ColorPassepartout { get; set; } = null!;
    [JsonIgnore]
    public virtual Tblmaterial FKIdMaterialNavigation { get; set; } = null!;
}
