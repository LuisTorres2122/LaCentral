using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace APILACENTRAL.Models.ModelsLaCentral;

public partial class Tblmaterial
{
    public int PkIdMaterial { get; set; }

    public string? NombreMaterial { get; set; }
    [JsonIgnore]
    public virtual ICollection<Tbldetalleservicio> Tbldetalleservicios { get; set; } = new List<Tbldetalleservicio>();
    [JsonIgnore]
    public virtual ICollection<Tblfilete> Tblfiletes { get; set; } = new List<Tblfilete>();
    [JsonIgnore]
    public virtual ICollection<Tblmarco> Tblmarcos { get; set; } = new List<Tblmarco>();
    [JsonIgnore]
    public virtual ICollection<Tblpassepartout> Tblpassepartouts { get; set; } = new List<Tblpassepartout>();
    [JsonIgnore]
    public virtual ICollection<Tblvidrio> Tblvidrios { get; set; } = new List<Tblvidrio>();
}
