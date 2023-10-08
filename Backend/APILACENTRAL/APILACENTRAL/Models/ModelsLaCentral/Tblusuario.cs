using System;
using System.Collections.Generic;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblusuario
{
    public int PkIdUsuario { get; set; }

    public string EmailUsuario { get; set; } = null!;

    public string PasswordUsuario { get; set; } = null!;
}
