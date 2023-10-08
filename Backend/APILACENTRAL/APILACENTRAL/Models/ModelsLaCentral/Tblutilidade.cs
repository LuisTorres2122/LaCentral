using System;
using System.Collections.Generic;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblutilidade
{
    public int PkUtilidad { get; set; }

    public string NombreUtilidad { get; set; } = null!;

    public decimal? ValorUtilidad { get; set; }
}
