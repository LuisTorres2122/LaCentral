using System;
using System.Collections.Generic;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblobra
{
    public int PkIdObra { get; set; }

    public string? TituloObra { get; set; }

    public string? AutorObra { get; set; }

    public string? TecnicaObra { get; set; }

    public string? MedidaObra { get; set; }

    public decimal? PrecioObra { get; set; }

    public byte[]? UrlObra { get; set; }

    public DateOnly FechaPublicacionObra { get; set; }

    public bool PosicionObra { get; set; }

    public int ImportanciaObra { get; set; }
}
