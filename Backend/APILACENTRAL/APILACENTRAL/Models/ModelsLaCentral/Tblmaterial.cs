using System;
using System.Collections.Generic;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblmaterial
{
    public int PkIdMaterial { get; set; }

    public string? NombreMaterial { get; set; }

    public virtual ICollection<Tbldetalleservicio> Tbldetalleservicios { get; set; } = new List<Tbldetalleservicio>();

    public virtual ICollection<Tblfilete> Tblfiletes { get; set; } = new List<Tblfilete>();

    public virtual ICollection<Tblmarco> Tblmarcos { get; set; } = new List<Tblmarco>();

    public virtual ICollection<Tblpassepartout> Tblpassepartouts { get; set; } = new List<Tblpassepartout>();

    public virtual ICollection<Tblvidrio> Tblvidrios { get; set; } = new List<Tblvidrio>();
}
